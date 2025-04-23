using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Persistence;

public class AppDbContext(DbContextOptions options) : IdentityDbContext<User>(options)
{
    public required DbSet<Activity> Activities { get; set; }
    public required DbSet<ActivityOrganizer> ActivityOrganizers { get; set; }
    public required DbSet<Attendee> Attendees { get; set; }
    public required DbSet<Attendance> Attendances { get; set; }
    public required DbSet<RecurrenceActivity> Recurrences { get; set; }
    public required DbSet<Room> Rooms { get; set; }
    public required DbSet<LaundryBooking> LaundryBookings { get; set; }

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

        builder.Entity<Activity>() //per si un cas not sure if necessary al afegir la dependencia d'abaix 
            .HasMany(a => a.Recurrences)
            .WithOne(r => r.Activity)
            .HasForeignKey(r => r.ActivityId);

        builder.Entity<Attendance>()
            .HasOne(a => a.Attendee)
            .WithMany()
            .HasForeignKey(a => a.AttendeeId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<Activity>()
            .HasOne(a => a.FirstDate)
            .WithOne()
            .HasForeignKey<Activity>(a => a.FirstDateId)
            .OnDelete(DeleteBehavior.Restrict); //?: nss si es el format correcte

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
