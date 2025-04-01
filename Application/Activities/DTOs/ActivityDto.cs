using Application.Profiles.DTOs;

namespace Application.Activities.DTOs;

public class ActivityDto
{
    public required string Id { get; set; }
    public required string Title { get; set; }
    public required string Description { get; set; }
    public bool IsCancelled { get; set; }
    public required string Room { get; set; }
    public required int MaxParticipants { get; set; }
    public required int AllowedMissedDays { get; set; }
    public UserProfile Creator { get; set; } = null!;
    public ICollection<UserProfile> Organizers { get; set; } = [];
    public required int NumberAttendees { get; set; }
    public required int NumberWaiting { get; set; }

    //Time info
    public DateOnly DateStart { get; set; }
    public DateOnly DateEnd { get; set; }
    public TimeOnly TimeStart { get; set; }
    public TimeOnly TimeEnd { get; set; }
}
