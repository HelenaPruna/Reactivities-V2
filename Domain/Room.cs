namespace Domain;

public class Room
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public required string Name { get; set; }
    public required int NumberFloor { get; set; }
    public required int Capacity { get; set; }

    //nav parameters
    public ICollection<RecurrenceActivity> Recurrences { get; set; } = [];
}
