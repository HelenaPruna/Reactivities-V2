using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

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

    }
}
