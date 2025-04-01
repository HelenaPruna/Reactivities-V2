using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence;

public class DbInitializer
{
    public static async Task SeedData(AppDbContext context, UserManager<User> userManager)
    {
        Random rnd = new();
        var users = new List<User>
        {
            new() {Id = "User-1", DisplayName = "Maria Robles", UserName = "maria@test.com", Email = "maria@test.com"},
            new() {Id = "User-2", DisplayName = "Tatiana Prim", UserName = "tatiana@test.com", Email = "tatiana@test.com"},
            new() {Id = "User-3", DisplayName = "Roser Fabra", UserName = "roser@test.com", Email = "roser@test.com"}
        };

        if (!userManager.Users.Any())
        {
            foreach (var user in users)
            {
                await userManager.CreateAsync(user, "Pa$$w0rd");
            }
        }


        if (context.Activities.Any()) return;

        var activities = new List<Activity>
        {
            new() {
                Id = "activitat-1",
                Title = "Past Activity 1",
                Description = "Activity 2 months ago",
                Room = "London",
                CreatorId = users[0].Id,
                MaxParticipants = 10,
                AllowedMissedDays = 3,
                Organizers = [
                    new ActivityOrganizer
                    {
                        UserId = users[0].Id
                    }
                ],
                Recurrences = [
                    new RecurrenceActivity
                    {
                        Date = DateOnly.FromDateTime(DateTime.Now.AddMonths(-2)),
                        TimeStart = TimeOnly.FromDateTime(DateTime.Now),
                        TimeEnd = TimeOnly.FromDateTime(DateTime.Now.AddHours(2))
                    }
                ]

            },
            new() {
                Id = "activitat-2",
                Title = "Past Activity 2",
                Description = "Activity 1 month ago",
                Room = "Paris",
                CreatorId = users[0].Id,
                MaxParticipants = 10,
                AllowedMissedDays = 3,
                Organizers = [
                    new ActivityOrganizer
                    {
                        UserId = users[2].Id
                    }
                ],
                Recurrences = [
                    new RecurrenceActivity
                    {
                        Date = DateOnly.FromDateTime(DateTime.Now.AddMonths(-1)),
                        TimeStart = TimeOnly.FromDateTime(DateTime.Now),
                        TimeEnd = TimeOnly.FromDateTime(DateTime.Now.AddHours(2))
                    }
                ]
            },
            new() {
                Id = "activitat-3",
                Title = "Risoterapia",
                Description = "Activity 1 month in future",
                Room = "London",
                CreatorId = users[2].Id,
                MaxParticipants = 10,
                AllowedMissedDays = 3,
                Organizers = [
                    new ActivityOrganizer
                    {
                        UserId = users[rnd.Next(0,3)].Id
                    }
                ],
                Attendees = [
                    new Attendee
                    {
                        Id = "4",
                        Identifier = "Teresa Ortiz"
                    }
                ],
                Recurrences = [
                    new RecurrenceActivity
                    {
                        Date = DateOnly.FromDateTime(DateTime.Now.AddMonths(1)),
                        TimeStart = new TimeOnly(8, 30),
                        TimeEnd = new TimeOnly(10, 30)
                    },
                    new RecurrenceActivity
                    {
                        Date = DateOnly.FromDateTime(DateTime.Now.AddMonths(1).AddDays(7)),
                        TimeStart = new TimeOnly(8, 30),
                        TimeEnd = new TimeOnly(10, 30)
                    },
                    new RecurrenceActivity
                    {
                        Date = DateOnly.FromDateTime(DateTime.Now.AddMonths(1).AddDays(14)),
                        TimeStart = new TimeOnly(8, 30),
                        TimeEnd = new TimeOnly(10, 30)
                    },
                    new RecurrenceActivity
                    {
                        Date = DateOnly.FromDateTime(DateTime.Now.AddDays(7)),
                        TimeStart = new TimeOnly(12, 30),
                        TimeEnd = new TimeOnly(13, 30),
                        IsRecurrent = false
                    }
                ]

            },
            new() {
                Id = "activitat-4",
                Title = "Pintura 1",
                Description = "Activity 2 months in future",
                Room = "London",
                CreatorId = users[0].Id,
                MaxParticipants = 1,
                AllowedMissedDays = 3,
                Organizers = [
                    new ActivityOrganizer
                    {
                        UserId = users[0].Id
                    }
                ],
                Attendees = [
                    new Attendee
                    {
                        Id = "5",
                        Identifier = "Paula"
                    },
                    new Attendee
                    {
                        Id = "6",
                        Identifier = "Laura",
                        IsWaiting = true
                    }

                ],
                Recurrences = [
                    new RecurrenceActivity
                    {
                        Date = DateOnly.FromDateTime(DateTime.Now.AddMonths(2)),
                        TimeStart = new TimeOnly(10, 30),
                        TimeEnd = new TimeOnly(12, 30)
                    },
                    new RecurrenceActivity
                    {
                        Date = DateOnly.FromDateTime(DateTime.Now.AddMonths(2).AddDays(7)),
                        TimeStart = new TimeOnly(10, 30),
                        TimeEnd = new TimeOnly(12, 30)
                    },
                    new RecurrenceActivity
                    {
                        Date = DateOnly.FromDateTime(DateTime.Now.AddMonths(2).AddDays(14)),
                        TimeStart = new TimeOnly(10, 30),
                        TimeEnd = new TimeOnly(12, 30)
                    }
                ]
            },
            new()
            {
                Id = "activitat-5",
                Title = "Nutrició",
                Description = "Activity 3 months in future",
                Room = "London",
                CreatorId = users[1].Id,
                MaxParticipants = 10,
                AllowedMissedDays = 3,
                Organizers = [
                    new ActivityOrganizer
                    {
                        UserId = users[2].Id
                    }
                ],
                Attendees = [
                    new Attendee
                    {
                        Id = "7",
                        Identifier = "Roberta",
                        Comments = "Potato potato"
                    },
                    new Attendee
                    {
                        Id = "8",
                        Identifier = "Clara"
                    }

                ],
                Recurrences = [
                    new RecurrenceActivity
                    {
                        Date = DateOnly.FromDateTime(DateTime.Now.AddMonths(3)),
                        TimeStart = new TimeOnly(8, 30),
                        TimeEnd = new TimeOnly(10, 30)
                    },
                    new RecurrenceActivity
                    {
                        Date = DateOnly.FromDateTime(DateTime.Now.AddMonths(3).AddDays(7)),
                        TimeStart = new TimeOnly(8, 30),
                        TimeEnd = new TimeOnly(10, 30)
                    },
                    new RecurrenceActivity
                    {
                        Date = DateOnly.FromDateTime(DateTime.Now.AddMonths(3).AddDays(14)),
                        TimeStart = new TimeOnly(8, 30),
                        TimeEnd = new TimeOnly(10, 30)
                    }
                ]
            },
            new()
            {
                Id = "activitat-9",
                Title = "Future Activity 7",
                Description = "Activity 2 months ago",
                Room = "London",
                CreatorId = users[2].Id,
                MaxParticipants = 10,
                AllowedMissedDays = 3,
                Recurrences = [
                    new RecurrenceActivity
                    {
                        Date = DateOnly.FromDateTime(DateTime.Now.AddMonths(7)),
                        TimeStart = new TimeOnly(8, 30),
                        TimeEnd = new TimeOnly(10, 30)
                    },
                    new RecurrenceActivity
                    {
                        Date = DateOnly.FromDateTime(DateTime.Now.AddMonths(7).AddDays(7)),
                        TimeStart = new TimeOnly(8, 30),
                        TimeEnd = new TimeOnly(10, 30)
                    },
                    new RecurrenceActivity
                    {
                        Date = DateOnly.FromDateTime(DateTime.Now.AddMonths(7).AddDays(14)),
                        TimeStart = new TimeOnly(8, 30),
                        TimeEnd = new TimeOnly(10, 30)
                    }
                ]
            },
            new()
            {
                Title = "Cuina",
                Description = "Activity 8 months in future",
                Room = "London",
                CreatorId = users[rnd.Next(0,3)].Id,
                MaxParticipants = rnd.Next(6,25),
                AllowedMissedDays = rnd.Next(1,5),
                Organizers = [
                    new ActivityOrganizer
                    {
                        UserId = users[rnd.Next(0,3)].Id
                    }
                ],
                Attendees = [
                    new Attendee
                    {
                        Identifier = "Teresa Ortiz",
                        Comments = "Necessita x cosa"
                    },
                    new Attendee
                    {
                        Identifier = "Marisa"
                    }
                ],
                Recurrences = [
                    new RecurrenceActivity
                    {
                        Date = DateOnly.FromDateTime(DateTime.Now.AddMonths(8)),
                        TimeStart = TimeOnly.FromDateTime(DateTime.Now),
                        TimeEnd = TimeOnly.FromDateTime(DateTime.Now.AddHours(2))
                    },
                    new RecurrenceActivity
                    {
                        Date = DateOnly.FromDateTime(DateTime.Now.AddMonths(8).AddDays(7)),
                        TimeStart = TimeOnly.FromDateTime(DateTime.Now),
                        TimeEnd = TimeOnly.FromDateTime(DateTime.Now.AddHours(2))
                    },
                    new RecurrenceActivity
                    {
                        Date = DateOnly.FromDateTime(DateTime.Now.AddMonths(8).AddDays(14)),
                        TimeStart = TimeOnly.FromDateTime(DateTime.Now),
                        TimeEnd = TimeOnly.FromDateTime(DateTime.Now.AddHours(2))
                    }
                ]
            },
            new()
            {
                Title = "Pintura",
                Description = "Activity 8 months in future",
                Room = "London",
                CreatorId = users[rnd.Next(0,3)].Id,
                MaxParticipants = rnd.Next(6,25),
                AllowedMissedDays = rnd.Next(1,5),
                Organizers = [
                    new ActivityOrganizer
                    {
                        UserId = users[rnd.Next(0,3)].Id
                    }
                ],
                Attendees = [
                    new Attendee
                    {
                        Id = "3",
                        Identifier = "Antonia",
                        SkippedDays = 1
                    }
                ],
                Recurrences = [
                    new RecurrenceActivity
                    {
                        Date = DateOnly.FromDateTime(DateTime.Now.AddMonths(9)),
                        TimeStart = TimeOnly.FromDateTime(DateTime.Now),
                        TimeEnd = TimeOnly.FromDateTime(DateTime.Now.AddHours(2))
                    },
                    new RecurrenceActivity
                    {
                        Date = DateOnly.FromDateTime(DateTime.Now.AddMonths(9).AddDays(7)),
                        TimeStart = TimeOnly.FromDateTime(DateTime.Now),
                        TimeEnd = TimeOnly.FromDateTime(DateTime.Now.AddHours(2))
                    },
                    new RecurrenceActivity
                    {
                        Date = DateOnly.FromDateTime(DateTime.Now.AddMonths(9).AddDays(14)),
                        TimeStart = TimeOnly.FromDateTime(DateTime.Now),
                        TimeEnd = TimeOnly.FromDateTime(DateTime.Now.AddHours(2))
                    }
                ]
            },
            new()
            {
                Title = "Costura",
                Description = "Activity 8 months in future",
                Room = "London",
                CreatorId = users[rnd.Next(0,3)].Id,
                MaxParticipants = rnd.Next(6,25),
                AllowedMissedDays = rnd.Next(1,5),
                Organizers = [
                    new ActivityOrganizer
                    {
                        UserId = users[rnd.Next(0,3)].Id
                    }
                ],
                Recurrences = [
                    new RecurrenceActivity
                    {
                        Date = DateOnly.FromDateTime(DateTime.Now.AddMonths(8)),
                        TimeStart = TimeOnly.FromDateTime(DateTime.Now),
                        TimeEnd = TimeOnly.FromDateTime(DateTime.Now.AddHours(2))
                    },
                    new RecurrenceActivity
                    {
                        Date = DateOnly.FromDateTime(DateTime.Now.AddMonths(8).AddDays(7)),
                        TimeStart = TimeOnly.FromDateTime(DateTime.Now),
                        TimeEnd = TimeOnly.FromDateTime(DateTime.Now.AddHours(2))
                    },
                    new RecurrenceActivity
                    {
                        Date = DateOnly.FromDateTime(DateTime.Now.AddMonths(8).AddDays(14)),
                        TimeStart = TimeOnly.FromDateTime(DateTime.Now),
                        TimeEnd = TimeOnly.FromDateTime(DateTime.Now.AddHours(2))
                    }
                ]
            },
            new()
            {
                Title = "Yoga",
                Description = "Activity 8 months in future",
                Room = "London",
                CreatorId = users[rnd.Next(0,3)].Id,
                MaxParticipants = rnd.Next(6,25),
                AllowedMissedDays = rnd.Next(1,5),
                Organizers = [
                    new ActivityOrganizer
                    {
                        UserId = users[rnd.Next(0,3)].Id
                    }
                ],
                Recurrences = [
                    new RecurrenceActivity
                    {
                        Date = DateOnly.FromDateTime(DateTime.Now.AddMonths(2)),
                        TimeStart = TimeOnly.FromDateTime(DateTime.Now),
                        TimeEnd = TimeOnly.FromDateTime(DateTime.Now.AddHours(2))
                    }
                    ]
            },
            new()
            {
                Title = "Repàs",
                Description = "Activity 8 months in future",
                Room = "London",
                CreatorId = users[rnd.Next(0,3)].Id,
                MaxParticipants = rnd.Next(6,25),
                AllowedMissedDays = rnd.Next(1,5),
                Organizers = [
                    new ActivityOrganizer
                    {
                        UserId = users[rnd.Next(0,3)].Id
                    }
                ],
                Recurrences = [
                    new RecurrenceActivity
                    {
                        Date = DateOnly.FromDateTime(DateTime.Now.AddMonths(2)),
                        TimeStart = TimeOnly.FromDateTime(DateTime.Now),
                        TimeEnd = TimeOnly.FromDateTime(DateTime.Now.AddHours(2))
                    }
                    ]
            },
            new()
            {
                Title = "Reforç escolar",
                Description = "Activity 8 months in future",
                Room = "London",
                CreatorId = users[rnd.Next(0,3)].Id,
                MaxParticipants = rnd.Next(6,25),
                AllowedMissedDays = rnd.Next(1,5),
                Organizers = [
                    new ActivityOrganizer
                    {
                        UserId = users[rnd.Next(0,3)].Id
                    }
                ],
                Recurrences = [
                    new RecurrenceActivity
                    {
                        Date = DateOnly.FromDateTime(DateTime.Now.AddMonths(2)),
                        TimeStart = TimeOnly.FromDateTime(DateTime.Now),
                        TimeEnd = TimeOnly.FromDateTime(DateTime.Now.AddHours(2))
                    }
                    ]
            },
            new()
            {
                Title = "Crochet",
                Description = "Activity 8 months in future",
                Room = "London",
                CreatorId = users[rnd.Next(0,3)].Id,
                MaxParticipants = rnd.Next(6,25),
                AllowedMissedDays = rnd.Next(1,5),
                Organizers = [
                    new ActivityOrganizer
                    {
                        UserId = users[rnd.Next(0,3)].Id
                    }
                ],
                Recurrences = [
                    new RecurrenceActivity
                    {
                        Date = DateOnly.FromDateTime(DateTime.Now.AddMonths(2)),
                        TimeStart = TimeOnly.FromDateTime(DateTime.Now),
                        TimeEnd = TimeOnly.FromDateTime(DateTime.Now.AddHours(2))
                    }
                    ]
            },
            new()
            {
                Title = "Informàtica",
                Description = "Activity 8 months in future",
                Room = "London",
                CreatorId = users[rnd.Next(0,3)].Id,
                MaxParticipants = rnd.Next(6,25),
                AllowedMissedDays = rnd.Next(1,5),
                Organizers = [
                    new ActivityOrganizer
                    {
                        UserId = users[rnd.Next(0,3)].Id
                    }
                ],
                Recurrences = [
                    new RecurrenceActivity
                    {
                        Date = DateOnly.FromDateTime(DateTime.Now.AddMonths(2)),
                        TimeStart = TimeOnly.FromDateTime(DateTime.Now),
                        TimeEnd = TimeOnly.FromDateTime(DateTime.Now.AddHours(2))
                    }
                    ]
            },
            new()
            {
                Title = "Castellà",
                Description = "Activity 8 months in future",
                Room = "London",
                CreatorId = users[rnd.Next(0,3)].Id,
                MaxParticipants = rnd.Next(6,25),
                AllowedMissedDays = rnd.Next(1,5),
                Organizers = [
                    new ActivityOrganizer
                    {
                        UserId = users[rnd.Next(0,3)].Id
                    }
                ],
                Recurrences = [
                    new RecurrenceActivity
                    {
                        Date = DateOnly.FromDateTime(DateTime.Now.AddMonths(2)),
                        TimeStart = TimeOnly.FromDateTime(DateTime.Now),
                        TimeEnd = TimeOnly.FromDateTime(DateTime.Now.AddHours(2))
                    }
                    ]
            },
            new()
            {
                Title = "Català",
                Description = "Activity 8 months in future",
                Room = "London",
                CreatorId = users[rnd.Next(0,3)].Id,
                MaxParticipants = rnd.Next(6,25),
                AllowedMissedDays = rnd.Next(1,5),
                Organizers = [
                    new ActivityOrganizer
                    {
                        UserId = users[rnd.Next(0,3)].Id
                    }
                ],
                Recurrences = [
                    new RecurrenceActivity
                    {
                        Date = DateOnly.FromDateTime(DateTime.Now.AddMonths(2)),
                        TimeStart = TimeOnly.FromDateTime(DateTime.Now),
                        TimeEnd = TimeOnly.FromDateTime(DateTime.Now.AddHours(2))
                    }
                    ]
            }
        };

        context.Activities.AddRange(activities);
        await context.SaveChangesAsync();

        foreach (var activity in activities)
        {
            activity.FirstDateId = activity.Recurrences.First().Id;
        }
        await context.SaveChangesAsync();

        foreach (var activity in activities)
        {
            var attendees = activity.Attendees.Where(x => !x.IsWaiting);
            foreach (var recur in activity.Recurrences)
            {
                foreach (var att in attendees) if(!att.IsWaiting)
                {
                    var randomValue = rnd.Next(0, 3);
                    recur.Attendances.Add(new()
                    {
                        AttendeeId = att.Id,
                        HasAttended = randomValue
                    });
                    if (randomValue == 2) att.SkippedDays += 1;
                }
            }
        }
        await context.SaveChangesAsync();

    }
}