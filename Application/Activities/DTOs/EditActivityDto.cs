using System;

namespace Application.Activities.DTOs;

public class EditActivityDto : BaseActivityDto
{
    public string Id { get; set; } = "";
    public bool IsCancelled { get; set; } = false; 
}
