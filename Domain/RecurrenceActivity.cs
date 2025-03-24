using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace Domain;

[Index(nameof(Date))]
public class RecurrenceActivity
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public required DateOnly Date { get; set; }
    public required TimeOnly TimeStart { get; set; }
    public required TimeOnly TimeEnd { get; set; }
    public bool IsRecurrent { get; set; } = true; //activitat puntual extra, rollo una sessió especial 

    [JsonIgnore]
    public ICollection<Attendance> Attendances { get; set; } = [];
    [JsonIgnore]
    public string? ActivityId { get; set; }
    [JsonIgnore]
    public Activity Activity { get; set; } = null!;
}
