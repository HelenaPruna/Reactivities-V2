namespace Application.Activities.DTOs;

public class AttendeeAttendanceDto
{
    public required string Id { get; set; }
    public required string Identifier { get; set; }

    // Nullable if no attendance record exists for the given date.
    public int? HasAttended { get; set; }
}
