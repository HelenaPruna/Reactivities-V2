namespace Application.Laundry.DTOs;

public class EditBookingDto
{
    public required string Id { get; set; } 
    public required string Name { get; set; }
    public required DateTime Start { get; set; }
}
