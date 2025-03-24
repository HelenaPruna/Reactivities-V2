using System.Text.Json.Serialization;

namespace Domain;

public class Attendance
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public int HasAttended { get; set; } = 0;
    public DateTime Date => new(Recur.Date, Recur.TimeStart);

    //nav properties
    public string? AttendeeId { get; set; }
    public string? RecurId { get; set; }

    [JsonIgnore]
    public Attendee Attendee { get; set; } = null!;

    [JsonIgnore]
    public RecurrenceActivity Recur { get; set; } = null!;

}
