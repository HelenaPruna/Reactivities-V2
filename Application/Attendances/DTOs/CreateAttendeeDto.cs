namespace Application.Attendances.DTOs;

public class CreateAttendeeDto
{
    public required string Identifier { get; set; }
    public string? Comments { get; set; }
}
