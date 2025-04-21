namespace Application.Core;

public class PagedList<T>
{
    public List<T> Items { get; set; } = [];
    public string? NextCursor { get; set; }
}
