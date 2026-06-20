using Microsoft.EntityFrameworkCore;
using Backend.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<Backend.Data.AppDbContext>(options =>
    options.UseSqlite("Data Source=app.db"));

builder.Services.AddOpenApi();
builder.Services.AddScoped<Backend.Services.IAuthService, Backend.Services.AuthService>();
builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy => policy
            .WithOrigins("http://localhost:5173")
            .AllowAnyMethod()
            .AllowAnyHeader());
});

var app = builder.Build();
app.UseCors("AllowReactApp");

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();

    if (!db.Users.Any(u => u.Role == Backend.Models.UserRole.Admin))
    {
        var adminAccount = new Backend.Models.User
        {
            Id = Guid.NewGuid(),
            Email = "admin@project.com",
            Username = "Chủ Hệ Thống",
            Role = Backend.Models.UserRole.Admin,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin@123456"),
            CreatedAt = DateTime.UtcNow
        };

        db.Users.Add(adminAccount);
        db.SaveChanges();

        Console.WriteLine("Đã khởi tạo tài khoản Admin mặc định: admin@project.com / Admin@123456");
    }
}
app.MapControllers();
app.Run();

