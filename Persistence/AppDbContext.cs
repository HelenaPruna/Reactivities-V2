using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Persistence;

public class AppDbContext(DbContextOptions options) : IdentityDbContext<User>(options)
{
    public required DbSet<Activity> Activities { get; set; }
    public required DbSet<ActivityOrganizer> ActivityOrganizers { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<ActivityOrganizer>(x => x.HasKey(a => new { a.ActivityId, a.UserId }));

        builder.Entity<ActivityOrganizer>()
            .HasOne(x => x.User)
            .WithMany(x => x.ActivitiesOrganized)
            .HasForeignKey(x => x.UserId);

        builder.Entity<ActivityOrganizer>()
            .HasOne(x => x.Activity)
            .WithMany(x => x.Organizers)
            .HasForeignKey(x => x.ActivityId);

        var dateTimeConverter = new ValueConverter<DateTime, DateTime>(
            v => v.ToUniversalTime(),
            v => DateTime.SpecifyKind(v, DateTimeKind.Utc)
        );

        foreach (var entityType in builder.Model.GetEntityTypes())
        {
            foreach (var property in entityType.GetProperties())
            {
                if (property.ClrType == typeof(DateTime))
                {
                    property.SetValueConverter(dateTimeConverter);
                }
            }
        }
    }
}
