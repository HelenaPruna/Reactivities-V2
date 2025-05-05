using Application.Profiles.DTOs;
using Application.Rooms.DTOs;

namespace Application.Activities.DTOs;

public class ActivityDetailsDto
{
    public required string Id { get; set; }
    public required string Title { get; set; }
    public required string Description { get; set; }
    public bool IsCancelled { get; set; }
    public required int MaxParticipants { get; set; }
    public required int AllowedMissedDays { get; set; }
    public UserProfile Creator { get; set; } = null!;
    public ICollection<UserProfile> Organizers { get; set; } = [];
    public required int NumberAttendees { get; set; }
    public ActivityRoomDto Room { get; set; } = null!;

    //Time info
    public DateOnly DateStart { get; set; }
    public DateOnly DateEnd { get; set; }
    public TimeOnly TimeStart { get; set; }
    public TimeOnly TimeEnd { get; set; }
    public ICollection<RecurrenceDto> Recurrences { get; set; } = [];
    public ICollection<OneTimeDto> OneTimeEvents { get; set; } = [];
    public ICollection<ActivityRequestDto> Requests { get; set; } = [];
}
