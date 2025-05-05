namespace Domain;

public class Request
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public int State { get; set; } = 0; // 0: pending, 1: aprovat, 2: denegat
    public required int Type { get; set; } //0: abonar x diners, 1: sol·licitud de comprar x material, 2: sala, 3: altres
    public required string Message { get; set; }
    public string? RequestedById { get; set; }
    public User RequestedBy { get; set; } = null!;
    public DateTime DateCreated { get; set; }
    public string? ActivityId { get; set; }
    public Activity Activity { get; set; } = null!;
    public string? ApprovedById { get; set; }
    public User? ApprovedBy { get; set; }
    public DateTime? DateApproved { get; set; }
}
