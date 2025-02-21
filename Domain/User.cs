using System;
using Microsoft.AspNetCore.Identity;

namespace Domain;

public class User : IdentityUser
{
    public string? DisplayName { get; set; }

    //nav parameters
    public ICollection<Activity> ActivitiesCreated { get; set; } = [];
    public ICollection<ActivityOrganizer> ActivitiesOrganized { get; set; } = [];

}
