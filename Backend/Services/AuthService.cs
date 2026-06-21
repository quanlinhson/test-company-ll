using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Backend.Data;
using Backend.DTOs;
using Backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace Backend.Services
{
    public class AuthService : IAuthService
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _config;

        public AuthService(AppDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        public async Task<bool> RegisterAsync(string email, string password)
        {
            if (await _context.Users.AnyAsync(u => u.Email == email))
                return false;

            var newUser = new User
            {
                Email = email,
                Role = UserRole.User,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(password),
                CreatedAt = DateTime.UtcNow
            };

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            // --- Log registration event (for demo purposes, we print to console)
            Console.WriteLine($"New user registered: {newUser.Email} - Password: {password}");

            return true;
        }

        public async Task<AuthResponse?> LoginAsync(LoginRequest request)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);

            if (user == null) return null;

            if (user.LockoutEnd.HasValue && user.LockoutEnd.Value > DateTime.UtcNow)
            {
                throw new Exception($"Tài khoản đã bị khóa. Vui lòng thử lại sau {user.LockoutEnd.Value.ToLocalTime():HH:mm}.");
            }

            if (!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            {
                user.FailedLoginAttempts++;

                if (user.FailedLoginAttempts >= 5)
                {
                    user.LockoutEnd = DateTime.UtcNow.AddMinutes(15);

                    var activeTokens = await _context.RefreshTokens
                        .Where(rt => rt.UserId == user.Id && !rt.IsRevoked)
                        .ToListAsync();

                    foreach (var rt in activeTokens)
                    {
                        rt.IsRevoked = true;
                    }
                }

                await _context.SaveChangesAsync();
                return null;
            }
            user.FailedLoginAttempts = 0;
            user.LockoutEnd = null;
            user.LastLoginAt = DateTime.UtcNow;

            // --- Create ACCESS TOKEN
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_config["Jwt:Key"]!);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.Role, user.Role.ToString())
                }),
                Expires = DateTime.UtcNow.AddMinutes(10),
                Issuer = _config["Jwt:Issuer"],
                Audience = _config["Jwt:Audience"],
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var jwtString = tokenHandler.WriteToken(token);

            var refreshTokenString = Guid.NewGuid().ToString("N");
            var newRefreshToken = new RefreshToken
            {
                UserId = user.Id,
                Token = refreshTokenString,
                JwtID = Guid.NewGuid().ToString(),
                CreatedAt = DateTime.UtcNow,
                ExpiryDate = DateTime.UtcNow.AddDays(7),
                IsRevoked = false
            };

            _context.RefreshTokens.Add(newRefreshToken);
            await _context.SaveChangesAsync();

            // --- Log login event (for demo purposes, we print to console)
            Console.WriteLine($"User {user.Email} logged in at {DateTime.Now:yyyy-MM-dd HH:mm:ss}");

            return new AuthResponse
            {
                Token = jwtString,
                RefreshToken = refreshTokenString,
                User = new UserDto
                {
                    Id = user.Id,
                    Email = user.Email,
                    Username = user.Username,
                    Role = user.Role.ToString()
                }
            };
        }
        public async Task<AuthResponse?> RefreshTokenAsync(string refreshToken)
        {
            var storedToken = await _context.RefreshTokens.FirstOrDefaultAsync(t => t.Token == refreshToken);

            if (storedToken == null || storedToken.IsRevoked || storedToken.ExpiryDate < DateTime.UtcNow)
                return null;

            var user = await _context.Users.FindAsync(storedToken.UserId);
            if (user == null) return null;

            storedToken.IsRevoked = true;

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_config["Jwt:Key"]!);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Role, user.Role.ToString())
        }),
                Expires = DateTime.UtcNow.AddMinutes(15),
                Issuer = _config["Jwt:Issuer"],
                Audience = _config["Jwt:Audience"],
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var jwtString = tokenHandler.WriteToken(token);

            var newRefreshTokenString = Guid.NewGuid().ToString("N");
            _context.RefreshTokens.Add(new RefreshToken
            {
                UserId = user.Id,
                Token = newRefreshTokenString,
                JwtID = Guid.NewGuid().ToString(),
                CreatedAt = DateTime.UtcNow,
                ExpiryDate = DateTime.UtcNow.AddDays(7),
                IsRevoked = false
            });

            await _context.SaveChangesAsync();

            return new AuthResponse
            {
                Token = jwtString,
                RefreshToken = newRefreshTokenString,
                User = new UserDto { Id = user.Id, Email = user.Email, Username = user.Username, Role = user.Role.ToString() }
            };
        }
    }
}