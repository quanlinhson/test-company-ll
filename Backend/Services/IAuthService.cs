using Backend.DTOs;

namespace Backend.Services
{
    public interface IAuthService
    {
        Task<AuthResponse?> LoginAsync(LoginRequest request);

        Task<bool> RegisterAsync(string email, string password);
    }
}