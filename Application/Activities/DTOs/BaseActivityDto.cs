namespace Application.Activities.DTOs;

public class BaseActivityDto
{
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public int MaxParticipants { get; set; }
    public int AllowedMissedDays { get; set; }
    public DateOnly DateStart { get; set; }
    public DateOnly DateEnd { get; set; }
    public TimeOnly TimeStart { get; set; }
    public TimeOnly TimeEnd { get; set; }
    public int Interval { get; set; } = 1;
}
