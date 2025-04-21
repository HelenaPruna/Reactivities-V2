using Application.Core;

namespace Application.Activities.Queries;

public class ActivityParams : PaginationParams<string>
{
    public string? Filter { get; set; }
    public DateOnly StartDate { get; set; } = DateOnly.FromDateTime(DateTime.UtcNow);
    public string? SearchTerm { get; set; }
    public bool IncludeCancelled { get; set; } = false;
}
