var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

using (var scope = app.Services.CreateScope())
{
    // var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    // db.Database.EnsureCreated();

    // // Kiểm tra xem hệ thống đã có tài khoản Admin nào chưa
    // if (!db.Users.Any(u => u.Role == Backend.Models.UserRole.Admin))
    // {
    //     // Tạo một tài khoản Admin mặc định
    //     var adminAccount = new Backend.Models.User
    //     {
    //         Id = Guid.NewGuid(),
    //         Email = "admin@project.com",
    //         Username = "Chủ Hệ Thống",
    //         Role = Backend.Models.UserRole.Admin,
    //         // Password = BCrypt.Net.BCrypt.HashPassword("Admin@123"),
    //         CreateAt = DateTime.UtcNow
    //     };

    //     db.Users.Add(adminAccount);
    //     db.SaveChanges();

    //     Console.WriteLine("🚀 Đã khởi tạo tài khoản Admin mặc định: admin@project.com / Admin@123");
    // }
}

app.Run();

