using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class RefreshToken
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public string Token { get; set; } = string.Empty;

        public string JwtID { get; set; } = string.Empty;

        public DateTime CreateAt { get; set; } = DateTime.UtcNow;

        public DateTime ExpiryDate { get; set; }

        public bool IsRevoked { get; set; } = false;

        [ForeignKey("User")]
        public Guid UserId { get; set; } = Guid.Empty;
    }
}