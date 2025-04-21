using Application.Rooms.DTOs;

namespace Application.Activities.DTOs;

public class OneTimeDto
{
    public required string Id { get; set; }
    public required DateOnly Date { get; set; }
    public required TimeOnly TimeStart { get; set; }
    public required TimeOnly TimeEnd { get; set; }
    public DateTime ComposedTime => new(Date, TimeStart);
    public ActivityRoomDto Room { get; set; } = null!;
}
