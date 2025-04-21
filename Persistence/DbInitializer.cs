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
            new() {Id = "User-3", DisplayName = "Roser Fabra", UserName = "roser@test.com", Email = "roser@test.com"},
            new() {Id = "User-4", DisplayName = "Carla Perez", UserName = "carla@test.com", Email = "carla@test.com"},
            new() {Id = "User-5", DisplayName = "Cristina Pous", UserName = "cristina@test.com", Email = "cristina@test.com"},
            new() {Id = "User-6", DisplayName = "Ester Garcia", UserName = "ester@test.com", Email = "ester@test.com"},
            new() {Id = "User-7", DisplayName = "Helena Moreno", UserName = "helena@test.com", Email = "helena@test.com"}

        };

        if (!userManager.Users.Any())
        {
            foreach (var user in users)
            {
                await userManager.CreateAsync(user, "Pa$$w0rd");
            }
        }

        if (context.Rooms.Any()) return;
        var rooms = new List<Room>
        {
            new() { Id = "0",  Name = "Sala 01", NumberFloor = 0, Capacity = 40 },
            new() { Id = "1",  Name = "Sala 11", NumberFloor = 1, Capacity = 15 },
            new() { Id = "2",  Name = "Sala 12", NumberFloor = 1, Capacity = 10 },
            new() { Id = "3",  Name = "Sala 21", NumberFloor = 2, Capacity = 20 },
            new() { Id = "4",  Name = "Sala 22", NumberFloor = 2, Capacity = 18 },
            new() { Id = "5",  Name = "Sala 23", NumberFloor = 2, Capacity = 15 },
            new() { Id = "6",  Name = "Sala 24", NumberFloor = 2, Capacity = 5  },
            new() { Id = "7",  Name = "Sala 25", NumberFloor = 2, Capacity = 6  },
            new() { Id = "8",  Name = "Sala 31", NumberFloor = 3, Capacity = 5  },
            new() { Id = "9",  Name = "Sala 32", NumberFloor = 3, Capacity = 7  },
            new() { Id = "10", Name = "Sala 33", NumberFloor = 3, Capacity = 5  },
            new() { Id = "11", Name = "Sala 34", NumberFloor = 3, Capacity = 5  },
            new() { Id = "12", Name = "Sala 41", NumberFloor = 4, Capacity = 12 },
        };

        context.Rooms.AddRange(rooms);
        await context.SaveChangesAsync();

        if (context.Activities.Any()) return;

        var activities = new List<Activity>
        {
            new() {
                Title = "Activitat passada",
                Description = "Activitat anterior",
                CreatorId = users[0].Id,
                MaxParticipants = 10,
                AllowedMissedDays = 3,
                RoomId = rooms[1].Id,
                Organizers = [
                    new ActivityOrganizer
                    {
                        UserId = users[0].Id
                    }
                ],
                Recurrences = [
                    new RecurrenceActivity
                    {
                        Date = new DateOnly(2025, 4, 10),
                        TimeStart = new TimeOnly(10, 30),
                        TimeEnd = new TimeOnly(12, 30),
                        RoomId = rooms[1].Id
                    }
                ]

            },
            new()
            {
                Title = "Activitat cancel·lada",
                Description = "--",
                CreatorId = users[rnd.Next(0, 7)].Id,
                MaxParticipants = 30,
                IsCancelled = true,
                AllowedMissedDays = rnd.Next(1, 5),
                Organizers = [
                    new ActivityOrganizer
                    {
                        UserId = users[rnd.Next(0, 7)].Id
                    }
                ],
                Recurrences = [.. Enumerable
                    .Range(0, 5)
                    .Select(i => new RecurrenceActivity
                    {
                        Date = DateOnly.FromDateTime(new DateTime(2025, 04, 10).AddDays(i * 14)),
                        TimeStart = new TimeOnly(10, 00),
                        TimeEnd = new TimeOnly(12, 30)
                    })
                ]
            },
            new() {
                Title = "Escriptura",
                Description = "--",
                CreatorId = users[0].Id,
                MaxParticipants = 10,
                RoomId = rooms[2].Id,
                AllowedMissedDays = 3,
                Organizers = [
                    new ActivityOrganizer
                    {
                        UserId = users[2].Id
                    }
                ],
                Recurrences = [.. Enumerable
                    .Range(0, 10)
                    .Select(i => new RecurrenceActivity
                    {
                        Date = DateOnly.FromDateTime(new DateTime(2025, 04, 14).AddDays(i * 7)),
                        TimeStart = new TimeOnly(8, 30),
                        TimeEnd = new TimeOnly(10, 30),
                        RoomId = rooms[2].Id
                    })]
            },
            new () {
                Title = "Risoterapia",
                Description = "Activity 1 month in future",
                CreatorId = users[2].Id,
                MaxParticipants = 10,
                RoomId = rooms[2].Id,
                AllowedMissedDays = 3,
                Organizers = [
                    new ActivityOrganizer
                    {
                        UserId = users[rnd.Next(0, 7)].Id
                    }
                ],
                Attendees = [
                    new Attendee
                    {
                        Id = "4",
                        Identifier = "Teresa Ortiz"
                    }
                ],
                Recurrences = [.. Enumerable
                    .Range(0, 10)
                    .Select(i => new RecurrenceActivity
                    {
                        Date = DateOnly.FromDateTime(new DateTime(2025, 04, 15).AddDays(i * 7)),
                        TimeStart = new TimeOnly(9, 00),
                        TimeEnd = new TimeOnly(11, 00),
                        RoomId = rooms[2].Id
                    }),
                    new RecurrenceActivity
                    {
                        Date = DateOnly.FromDateTime(new DateTime(2025, 05, 7)),
                        TimeStart = new TimeOnly(12, 30),
                        TimeEnd = new TimeOnly(13, 30),
                        IsRecurrent = false,
                        RoomId = rooms[5].Id
                    } ]
            },
            new()
            {
                Title = "Activitat completa",
                Description = "Activitat completa amb una persona a la llista d'espera",
                CreatorId = users[0].Id,
                MaxParticipants = 1,
                RoomId = rooms[2].Id,
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
                Recurrences = [.. Enumerable
                    .Range(0, 10)
                    .Select(i => new RecurrenceActivity
                    {
                        Date = DateOnly.FromDateTime(new DateTime(2025, 04, 16).AddDays(i * 7)),
                        TimeStart = new TimeOnly(9, 00),
                        TimeEnd = new TimeOnly(11, 00),
                        RoomId = rooms[2].Id
                    })
                ]
            },
            new()
            {
                Title = "Nutrició",
                Description = "--",
                CreatorId = users[1].Id,
                MaxParticipants = 10,
                RoomId = rooms[5].Id,
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
                Recurrences = [.. Enumerable
                    .Range(0, 10)
                    .Select(i => new RecurrenceActivity
                    {
                        Date = DateOnly.FromDateTime(new DateTime(2025, 04, 15).AddDays(i * 14)),
                        TimeStart = new TimeOnly(9, 00),
                        TimeEnd = new TimeOnly(11, 00),
                        RoomId = rooms[5].Id
                    })]

            },
            new()
            {
                Title = "Cuina tardes",
                Description = "--",
                CreatorId = users[2].Id,
                MaxParticipants = 10,
                RoomId = rooms[2].Id,
                AllowedMissedDays = 3,
                Recurrences = [.. Enumerable
                    .Range(0, 10)
                    .Select(i => new RecurrenceActivity
                    {
                        Date = DateOnly.FromDateTime(new DateTime(2025, 04, 16).AddDays(i * 7)),
                        TimeStart = new TimeOnly(16, 30),
                        TimeEnd = new TimeOnly(18, 30),
                        RoomId = rooms[2].Id
                    })
                ]
            },
            new()
            {
                Title = "Cuina matins",
                Description = "Cuina",
                CreatorId = users[rnd.Next(0, 7)].Id,
                MaxParticipants = rnd.Next(6, 18),
                RoomId = rooms[4].Id,
                AllowedMissedDays = rnd.Next(1, 5),
                Organizers = [
                    new ActivityOrganizer
                    {
                        UserId = users[rnd.Next(0, 7)].Id
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
                Recurrences = [.. Enumerable
                    .Range(0, 10)
                    .Select(i => new RecurrenceActivity
                    {
                        Date = DateOnly.FromDateTime(new DateTime(2025, 04, 16).AddDays(i * 7)),
                        TimeStart = new TimeOnly(10, 00),
                        TimeEnd = new TimeOnly(12, 30),
                        RoomId = rooms[4].Id
                    })
                ]
            },
            new()
            {
                Title = "Yoga Grup dimarts",
                Description = "---",
                CreatorId = users[rnd.Next(0, 7)].Id,
                MaxParticipants = 7,
                RoomId = rooms[12].Id,
                AllowedMissedDays = 2,
                Organizers = [
                    new ActivityOrganizer
                    {
                        UserId = users[6].Id
                    }
                ],
                Attendees = [
                    new Attendee
                    {
                        Id = "3",
                        Identifier = "Antonia"
                    }
                ],
                Recurrences = [.. Enumerable
                    .Range(0, 10)
                    .Select(i => new RecurrenceActivity
                    {
                        Date = DateOnly.FromDateTime(new DateTime(2025, 04, 8).AddDays(i * 7)),
                        TimeStart = new TimeOnly(16, 30),
                        TimeEnd = new TimeOnly(18, 30),
                        RoomId = rooms[12].Id
                    })
                ]
            },
            new()
            {
                Title = "Costura",
                Description = "---",
                CreatorId = users[rnd.Next(0, 7)].Id,
                MaxParticipants = rnd.Next(6, 18),
                RoomId = rooms[4].Id,
                AllowedMissedDays = rnd.Next(1, 5),
                Organizers = [
                    new ActivityOrganizer
                    {
                        UserId = users[rnd.Next(0, 7)].Id
                    }
                ],
                Recurrences = [.. Enumerable
                    .Range(0, 10)
                    .Select(i => new RecurrenceActivity
                    {
                        Date = DateOnly.FromDateTime(new DateTime(2025, 04, 16).AddDays(i * 7)),
                        TimeStart = new TimeOnly(16, 30),
                        TimeEnd = new TimeOnly(18, 30),
                        RoomId = rooms[4].Id
                    })
                ]
            },
            new()
            {
                Title = "Yoga Grup dijous",
                Description = "",
                CreatorId = users[rnd.Next(0, 7)].Id,
                MaxParticipants = 7,
                RoomId = rooms[12].Id,
                AllowedMissedDays = 2,
                Organizers = [
                    new ActivityOrganizer
                    {
                        UserId = users[6].Id
                    }
                ],
                Recurrences = [.. Enumerable
                    .Range(0, 10)
                    .Select(i => new RecurrenceActivity
                    {
                        Date = DateOnly.FromDateTime(new DateTime(2025, 04, 10).AddDays(i * 7)),
                        TimeStart = new TimeOnly(16, 30),
                        TimeEnd = new TimeOnly(18, 30),
                        RoomId = rooms[12].Id
                    })
                ]
            },
            new()
            {
                Title = "Repàs",
                Description = "Repàs grup 14-16 anys",
                CreatorId = users[rnd.Next(0, 7)].Id,
                MaxParticipants = 6,
                RoomId = rooms[7].Id,
                AllowedMissedDays = rnd.Next(1, 5),
                Organizers = [
                    new ActivityOrganizer
                    {
                        UserId = users[rnd.Next(0, 7)].Id
                    }
                ],
                Recurrences = [.. Enumerable
                    .Range(0, 10)
                    .Select(i => new RecurrenceActivity
                    {
                        Date = DateOnly.FromDateTime(new DateTime(2025, 04, 16).AddDays(i * 7)),
                        TimeStart = new TimeOnly(17, 30),
                        TimeEnd = new TimeOnly(19, 30),
                        RoomId = rooms[7].Id
                    })
                ]
            },
            new()
            {
                Title = "Reforç escolar",
                Description = "Grup reforç 10-13 anys",
                CreatorId = users[rnd.Next(0, 7)].Id,
                MaxParticipants = 5,
                RoomId = rooms[6].Id,
                AllowedMissedDays = rnd.Next(1, 3),
                Organizers = [
                    new ActivityOrganizer
                    {
                        UserId = users[rnd.Next(0, 7)].Id
                    }
                ],
                Recurrences = [.. Enumerable
                    .Range(0, 10)
                    .Select(i => new RecurrenceActivity
                    {
                        Date = DateOnly.FromDateTime(new DateTime(2025, 04, 16).AddDays(i * 7)),
                        TimeStart = new TimeOnly(17, 30),
                        TimeEnd = new TimeOnly(19, 00),
                        RoomId = rooms[6].Id
                    })
                ]
            },
            new()
            {
                Title = "Crochet",
                Description = "---",
                CreatorId = users[rnd.Next(0, 7)].Id,
                MaxParticipants = rnd.Next(6, 12),
                RoomId = rooms[12].Id,
                AllowedMissedDays = rnd.Next(1, 3),
                Organizers = [
                    new ActivityOrganizer
                    {
                        UserId = users[rnd.Next(0, 7)].Id
                    }
                ],
                Recurrences = [.. Enumerable
                    .Range(0, 10)
                    .Select(i => new RecurrenceActivity
                    {
                        Date = DateOnly.FromDateTime(new DateTime(2025, 04, 16).AddDays(i * 7)),
                        TimeStart = new TimeOnly(10, 00),
                        TimeEnd = new TimeOnly(12, 30),
                        RoomId = rooms[12].Id
                    })
                ]
            },
            new()
            {
                Title = "Competències digitals",
                Description = "Formació per a gent gran en risc exclusió digital",
                CreatorId = users[rnd.Next(0, 7)].Id,
                MaxParticipants = rnd.Next(6, 15),
                RoomId = rooms[5].Id,
                AllowedMissedDays = rnd.Next(1, 5),
                Organizers = [
                    new ActivityOrganizer
                    {
                        UserId = users[rnd.Next(0, 7)].Id
                    }
                ],
                Recurrences = [.. Enumerable
                    .Range(0, 10)
                    .Select(i => new RecurrenceActivity
                    {
                        Date = DateOnly.FromDateTime(new DateTime(2025, 04, 14).AddDays(i * 7)),
                        TimeStart = new TimeOnly(10, 00),
                        TimeEnd = new TimeOnly(12, 00),
                        RoomId = rooms[5].Id
                    })
                ]
            },
            new()
            {
                Title = "Castellà",
                Description = "---",
                CreatorId = users[rnd.Next(0, 7)].Id,
                MaxParticipants = 7,
                RoomId = rooms[9].Id,
                AllowedMissedDays = rnd.Next(1, 3),
                Organizers = [
                    new ActivityOrganizer
                    {
                        UserId = users[rnd.Next(0, 7)].Id
                    }
                ],
                Recurrences = [.. Enumerable
                    .Range(0, 10)
                    .Select(i => new RecurrenceActivity
                    {
                        Date = DateOnly.FromDateTime(new DateTime(2025, 04, 16).AddDays(i * 7)),
                        TimeStart = new TimeOnly(16, 00),
                        TimeEnd = new TimeOnly(18, 00),
                        RoomId = rooms[9].Id
                    })
                ]
            },
            new()
            {
                Title = "Xarrades Nutri",
                Description = "--",
                CreatorId = users[rnd.Next(0, 7)].Id,
                MaxParticipants = 30,
                RoomId = rooms[0].Id,
                AllowedMissedDays = rnd.Next(1, 5),
                Organizers = [
                    new ActivityOrganizer
                    {
                        UserId = users[rnd.Next(0, 7)].Id
                    }
                ],
                Recurrences = [.. Enumerable
                    .Range(0, 5)
                    .Select(i => new RecurrenceActivity
                    {
                        Date = DateOnly.FromDateTime(new DateTime(2025, 04, 10).AddDays(i * 14)),
                        TimeStart = new TimeOnly(10, 00),
                        TimeEnd = new TimeOnly(12, 30),
                        RoomId = rooms[0].Id
                    })
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

        var today = DateOnly.FromDateTime(DateTime.Now);
        foreach (var activity in activities)
        {
            var attendees = activity.Attendees.Where(x => !x.IsWaiting);
            foreach (var recur in activity.Recurrences) if (recur.Date < today)
                {
                    foreach (var att in attendees) if (!att.IsWaiting)
                        {
                            var randomValue = rnd.Next(1, 3);
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