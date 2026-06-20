using Backend.DTOs;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")] // API: POST /api/auth/register
        public async Task<IActionResult> Register(LoginRequest request)
        {
            var success = await _authService.RegisterAsync(request.Email, request.Password);
            if (!success)
                return BadRequest("Email này đã được sử dụng!");

            return Ok("Đăng ký thành công!");
        }

        [HttpPost("login")] // API: POST /api/auth/login
        public async Task<IActionResult> Login(LoginRequest request)
        {
            try
            {
                var response = await _authService.LoginAsync(request);
                if (response == null)
                    return Unauthorized("Email hoặc mật khẩu không chính xác!");
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpPost("refresh-token")] // API: POST /api/auth/refresh-token
        public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenRequest request)
        {
            var response = await _authService.RefreshTokenAsync(request.Token);

            if (response == null)
                return Unauthorized("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");

            return Ok(response);
        }
    }
}