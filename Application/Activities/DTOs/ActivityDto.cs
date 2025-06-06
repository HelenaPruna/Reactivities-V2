using Application.Profiles.DTOs;
using Application.Rooms.DTOs;

namespace Application.Activities.DTOs;

public class ActivityDto
{
    public required string Id { get; set; }
    public required string Title { get; set; }
    public bool IsCancelled { get; set; }
    public required int MaxParticipants { get; set; }
    public required int AllowedMissedDays { get; set; }
    public UserProfile Creator { get; set; } = null!;
    public bool IsOrganizing { get; set; }
    public required int NumberAttendees { get; set; }
    public required int NumberWaiting { get; set; }
    public ActivityRoomDto Room { get; set; } = null!;

    //Time info
    public DateOnly DateStart { get; set; }
    public DateOnly DateEnd { get; set; }
    public TimeOnly TimeStart { get; set; }
    public TimeOnly TimeEnd { get; set; }
}
