namespace Domain;

public class Activity
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public required string Title { get; set; }
    public required string Description { get; set; }
    public required string Category { get; set; }
    public bool IsCancelled { get; set; }
    public required string Room { get; set; }
    public required int MaxParticipants { get; set; }
    public required int AllowedMissedDays { get; set; }

    //nav parameters
    public required string CreatorId { get; set; }
    public User Creator { get; set; } = null!;
    public ICollection<ActivityOrganizer> Organizers { get; set; } = [];
    public ICollection<Attendee> Attendees { get; set; } = [];
    public string? FirstDateId { get; set; }
    public RecurrenceActivity FirstDate { get; set; } = null!;
    public ICollection<RecurrenceActivity> Recurrences { get; set; } = [];
}
