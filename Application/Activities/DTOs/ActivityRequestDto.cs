using Application.Profiles.DTOs;

namespace Application.Activities.DTOs;

public class ActivityRequestDto
{
    public required string Id { get; set; }
    public required int State { get; set; }
    public required int Type { get; set; }
    public required string Message { get; set; }
    public required UserProfile RequestedBy { get; set; }
    public DateTime DateCreated { get; set; }
    public UserProfile? ApprovedBy { get; set; }
    public DateTime? DateApproved { get; set; }
}
