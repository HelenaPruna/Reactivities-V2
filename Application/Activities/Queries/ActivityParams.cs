using Application.Core;

namespace Application.Activities.Queries;

public class ActivityParams : PaginationParams<DateOnly?>
{
    public string? Filter { get; set; }
    public DateOnly StartDate { get; set; } = DateOnly.FromDateTime(DateTime.UtcNow);
}
