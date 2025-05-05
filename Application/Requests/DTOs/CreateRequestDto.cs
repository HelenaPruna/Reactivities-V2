namespace Application.Requests.DTOs;

public class CreateRequestDto
{
    public required int Type { get; set; }
    public required string Message { get; set; }
    public string? ActivityId { get; set; }
}
