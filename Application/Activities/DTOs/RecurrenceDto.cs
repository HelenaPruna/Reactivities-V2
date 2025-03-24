namespace Application.Activities.DTOs;

public class RecurrenceDto
{
    public required DateOnly Date { get; set; }
    public required TimeOnly TimeStart { get; set; }
    public required TimeOnly TimeEnd { get; set; }
}
