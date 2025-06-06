namespace Application.Attendances.DTOs;

public class AttendeeDto
{
    public required string Id { get; set; }
    public required string Identifier { get; set; }
    public string? Comments { get; set; }
    public int SkippedDays { get; set; }
    public bool IsWaiting { get; set; } 

}
