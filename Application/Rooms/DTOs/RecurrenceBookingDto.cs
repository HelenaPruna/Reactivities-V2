namespace Application.Rooms.DTOs;

public class RecurrenceBookingDto
{
    public string? Id { get; set; }
    public required DateOnly Date { get; set; }
    public required TimeOnly TimeStart { get; set; }
    public required TimeOnly TimeEnd { get; set; }
    public string? ActivityId { get; set; }
    public string? ActivityTitle { get; set; }
    public required int NumberAttendees { get; set; }
}
