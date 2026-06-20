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
            var response = await _authService.LoginAsync(request);
            if (response == null)
                return Unauthorized("Email hoặc mật khẩu không chính xác!");

            return Ok(response);
        }
    }
}