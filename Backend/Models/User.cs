using System;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public enum UserRole
    {
        Admin, User
    }
    public class User
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        [MaxLength(50)]
        public string Email { get; set; } = string.Empty;

        public string? Password { get; set; }

        [MaxLength(20)]
        public string? Username { get; set; }

        public UserRole Role { get; set; } = UserRole.User;

        public DateTime CreateAt { get; set; } = DateTime.UtcNow;

        public DateTime? LastLoginAt { get; set; }
    }
}