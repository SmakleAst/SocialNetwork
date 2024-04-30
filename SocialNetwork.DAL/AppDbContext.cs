using Microsoft.EntityFrameworkCore;
using SocialNetwork.Domain.Entity;

namespace SocialNetwork.DAL
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<UserEntity> Users { get; set; }
        public DbSet<MessageEntity> Messages { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //Юзеры
            modelBuilder.Entity<UserEntity>()
                .HasMany(a => a.Messages)
                .WithOne(a => a.FromUser)
                .HasForeignKey(c => c.FromUserId);

            modelBuilder.Entity<UserEntity>()
                .HasMany(a => a.Messages)
                .WithOne(a => a.ToUser)
                .HasForeignKey(c => c.ToUserId);

            //Сообщения
            modelBuilder.Entity<MessageEntity>()
                .HasOne(a => a.FromUser)
                .WithMany(a => a.Messages)
                .HasForeignKey(c => c.FromUserId);

            modelBuilder.Entity<MessageEntity>()
                .HasOne(a => a.ToUser)
                .WithMany(a => a.Messages)
                .HasForeignKey(c => c.ToUserId);
        }
    }
}
