namespace Application.Rooms.DTOs;

public class RoomDto
{
    public required string Id { get; set; }
    public required string Name { get; set; }
    public required int NumberFloor { get; set; }
    public required int Capacity { get; set; }
    public ICollection<RecurrenceBookingDto> Recurrences { get; set; } = [];
}
