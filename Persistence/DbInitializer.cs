using System;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence;

public class DbInitializer
{
    public static async Task SeedData(AppDbContext context, UserManager<User> userManager)
    {
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
                Date = DateTime.Now.AddMonths(-2),
                Description = "Activity 2 months ago",
                Category = "drinks",
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
                Attendees = [
                    new Attendee
                    {
                        Id = "1",
                        Identifier = "Teresa Ortiz",
                        Comments = "Necessita x cosa",
                        SkippedDays = 2,
                        AttendanceList = [
                            new Attendance
                            {
                                Date = new DateOnly(2024, 12, 12),
                                HasAttended = 2
                            },
                            new Attendance
                            {
                                Date = new DateOnly(2024, 12, 19),
                                HasAttended = 2
                            },
                            new Attendance
                            {
                                Date = new DateOnly(2024, 12, 26),
                                HasAttended = 1
                            }
                        ]
                    },
                    new Attendee
                    {
                        Id = "2",
                        Identifier = "Marisa",
                        AttendanceList = [
                            new Attendance
                            {
                                Date = new DateOnly(2024, 12, 12),
                                HasAttended = 1
                            },
                            new Attendance
                            {
                                Date = new DateOnly(2024, 12, 19),
                                HasAttended = 1
                            },
                            new Attendance
                            {
                                Date = new DateOnly(2024, 12, 26),
                                HasAttended = 1
                            }
                        ]
                    }

                ]
            },
            new() {
                Id = "activitat-2",
                Title = "Past Activity 2",
                Date = DateTime.Now.AddMonths(-1),
                Description = "Activity 1 month ago",
                Category = "culture",
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
                Attendees = [
                    new Attendee
                    {
                        Id = "3",
                        Identifier = "Antonia",
                        SkippedDays = 1,
                        AttendanceList = [
                            new Attendance
                            {
                                Date = new DateOnly(2024, 12, 12),
                                HasAttended = 1
                            },
                            new Attendance
                            {
                                Date = new DateOnly(2024, 12, 19),
                                HasAttended = 2
                            },
                            new Attendance
                            {
                                Date = new DateOnly(2024, 12, 26),
                                HasAttended = 1
                            }
                        ]
                    }
                ]
            },
            new() {
                Id = "activitat-3",
                Title = "Future Activity 1",
                Date = DateTime.Now.AddMonths(1),
                Description = "Activity 1 month in future",
                Category = "culture",
                Room = "London",
                CreatorId = users[2].Id,
                MaxParticipants = 10,
                AllowedMissedDays = 3,
                Attendees = [
                    new Attendee
                    {
                        Id = "4",
                        Identifier = "Teresa Ortiz",
                        SkippedDays = 1,
                        AttendanceList = [
                            new Attendance
                            {
                                Date = new DateOnly(2024, 12, 12),
                                HasAttended = 1
                            },
                            new Attendance
                            {
                                Date = new DateOnly(2024, 12, 19),
                                HasAttended = 2
                            },
                            new Attendance
                            {
                                Date = new DateOnly(2024, 12, 26),
                                HasAttended = 1
                            }
                        ]
                    }
                ]

            },
            new() {
                Id = "activitat-4",
                Title = "Future Activity 2",
                Date = DateTime.Now.AddMonths(2),
                Description = "Activity 2 months in future",
                Category = "music",
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
                        Identifier = "Paula",
                        AttendanceList = [
                            new Attendance
                            {
                                Date = new DateOnly(2024, 12, 12),
                                HasAttended = 1
                            },
                            new Attendance
                            {
                                Date = new DateOnly(2024, 12, 26),
                                HasAttended = 1
                            }
                        ]
                    },
                    new Attendee
                    {
                        Id = "6",
                        Identifier = "Laura",
                        IsWaiting = true
                    }

                ]
            },
            new()
            {
                Id = "activitat-5",
                Title = "Future Activity 3",
                Date = DateTime.Now.AddMonths(3),
                Description = "Activity 3 months in future",
                Category = "drinks",
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
                        Comments = "Potato potato",
                        SkippedDays = 2,
                        AttendanceList = [
                            new Attendance
                            {
                                Date = new DateOnly(2024, 12, 12),
                                HasAttended = 2
                            },
                            new Attendance
                            {
                                Date = new DateOnly(2024, 12, 19),
                                HasAttended = 2
                            },
                            new Attendance
                            {
                                Date = new DateOnly(2024, 12, 26),
                                HasAttended = 1
                            }
                        ]
                    },
                    new Attendee
                    {
                        Id = "8",
                        Identifier = "Clara",
                        AttendanceList = [
                            new Attendance
                            {
                                Date = new DateOnly(2024, 12, 12),
                                HasAttended = 1
                            },
                            new Attendance
                            {
                                Date = new DateOnly(2024, 12, 19),
                                HasAttended = 1
                            },
                            new Attendance
                            {
                                Date = new DateOnly(2024, 12, 26),
                                HasAttended = 1
                            }
                        ]
                    }

                ]
            },
            new()
            {
                Id = "activitat-6",
                Title = "Future Activity 4",
                Date = DateTime.Now.AddMonths(4),
                Description = "Activity 4 months in future",
                Category = "drinks",
                Room = "London",
                CreatorId = users[0].Id,
                MaxParticipants = 10,
                AllowedMissedDays = 3
            },
            new()
            {
                Id = "activitat-7",
                Title = "Future Activity 5",
                Date = DateTime.Now.AddMonths(5),
                Description = "Activity 5 months in future",
                Category = "culture",
                Room = "London",
                CreatorId = users[1].Id,
                MaxParticipants = 10,
                AllowedMissedDays = 3,
                Organizers = [
                    new ActivityOrganizer
                    {
                        UserId = users[0].Id
                    }
                ]
            },
            new()
            {
                Id = "activitat-8",
                Title = "Future Activity 6",
                Date = DateTime.Now.AddMonths(6),
                Description = "Activity 6 months in future",
                Category = "music",
                Room = "London",
                CreatorId = users[2].Id,
                MaxParticipants = 10,
                AllowedMissedDays = 3,
                Organizers = [
                    new ActivityOrganizer
                    {
                        UserId = users[1].Id
                    }
                ]
            },
            new()
            {
                Id = "activitat-9",
                Title = "Future Activity 7",
                Date = DateTime.Now.AddMonths(7),
                Description = "Activity 2 months ago",
                Category = "travel",
                Room = "London",
                CreatorId = users[2].Id,
                MaxParticipants = 10,
                AllowedMissedDays = 3,
            },
            new()
            {
                Id = "activitat-10",
                Title = "Future Activity 8",
                Date = DateTime.Now.AddMonths(8),
                Description = "Activity 8 months in future",
                Category = "film",
                Room = "London",
                CreatorId = users[0].Id,
                MaxParticipants = 10,
                AllowedMissedDays = 3,
                Organizers = [
                    new ActivityOrganizer
                    {
                        UserId = users[0].Id
                    }
                ]
            }
        };

        context.Activities.AddRange(activities);

        await context.SaveChangesAsync();
    }
}