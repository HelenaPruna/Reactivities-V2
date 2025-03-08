using System.Text.Json.Serialization;

namespace Domain;

public class Attendance
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public required DateOnly Date { get; set; }
    public int HasAttended { get; set; } = 0; 

    //nav properties
    public string? AttendeeId { get; set; }

    [JsonIgnore]
    public Attendee Attendee { get; set; } = null!;
}
