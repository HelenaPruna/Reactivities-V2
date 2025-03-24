using Application.Profiles.DTOs;
using Domain;

namespace Application.Activities.DTOs;

public class ActivityDetailsDto
{
    public required string Id { get; set; }
    public required string Title { get; set; }
    public required string Description { get; set; }
    public required string Category { get; set; }
    public bool IsCancelled { get; set; }
    public required string Room { get; set; }
    public required int MaxParticipants { get; set; }
    public required int AllowedMissedDays { get; set; }
    public UserProfile Creator { get; set; } = null!;
    public ICollection<UserProfile> Organizers { get; set; } = [];
    public ICollection<RecurrenceActivity> Recurrences { get; set; } = [];
}
