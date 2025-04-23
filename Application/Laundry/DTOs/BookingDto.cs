namespace Application.Laundry.DTOs;

public class BookingDto
{
    public required string Name { get; set; }
    public required DateTime Start { get; set; }
    public bool IsRecurrent { get; set; } = false;
}
