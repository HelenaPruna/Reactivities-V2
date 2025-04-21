using Microsoft.EntityFrameworkCore;

namespace Domain;

[Index(nameof(Date))]
[Index(nameof(RoomId), nameof(Date), nameof(TimeStart), nameof(TimeEnd))]
public class RecurrenceActivity
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public required DateOnly Date { get; set; }
    public required TimeOnly TimeStart { get; set; }
    public required TimeOnly TimeEnd { get; set; }
    public bool IsRecurrent { get; set; } = true; //activitat puntual extra, rollo una sessió especial 

    //Nav parameters
    public ICollection<Attendance> Attendances { get; set; } = [];
    public string? ActivityId { get; set; }
    public Activity Activity { get; set; } = null!;
    public string? RoomId { get; set; }
    public Room Room { get; set; } = null!;
}
