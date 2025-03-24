using System.Text.Json.Serialization;

namespace Domain;

public class Attendee
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public required string Identifier { get; set; }
    public string? Comments { get; set; }
    public bool IsWaiting { get; set; } 
    public int SkippedDays { get; set; } = 0;

    //nav properties
    public string? ActivityId { get; set; }

    [JsonIgnore]
    public Activity Activity { get; set; } = null!;
}
