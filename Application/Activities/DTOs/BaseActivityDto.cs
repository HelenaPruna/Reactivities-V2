using System;

namespace Application.Activities.DTOs;

public class BaseActivityDto
{
    public string Title { get; set; } = "";
    public DateTime Date { get; set; }
    public string Description { get; set; } = "";
    public string Category { get; set; } = "";
    public string Room { get; set; } = "";
    public int MaxParticipants { get; set; }
    public required int AllowedMissedDays { get; set; }

}
