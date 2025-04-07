namespace Application.Profiles.DTOs;

public class UserActivityDto
{
    public required string Id { get; set; }
    public required string Title { get; set; }
    public DateOnly DateStart { get; set; }
    public DateOnly? DateEnd { get; set; }
}
