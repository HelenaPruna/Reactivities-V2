using Microsoft.EntityFrameworkCore;

namespace Domain;

[Index(nameof(Start))]
public class LaundryBooking
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public required string Name { get; set; }
    public required DateTime Start { get; set; }
    public required DateTime End { get; set; }
}
