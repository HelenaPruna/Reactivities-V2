using System;

namespace Domain;

public class ActivityOrganizer
{
    public string? UserId { get; set; }
    public User User { get; set; } = null!;
    public string? ActivityId { get; set; }
    public Activity Activity { get; set; } = null!;
}
