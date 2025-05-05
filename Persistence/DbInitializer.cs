using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence;

public class DbInitializer
{
    public static async Task SeedData(AppDbContext context, UserManager<User> userManager, RoleManager<IdentityRole> roleManager)
    {
        Random rnd = new();

        var roleNames = new[] { "Admin", "Regular", "Observer" };
        foreach (var roleName in roleNames)
        {
            if (!await roleManager.RoleExistsAsync(roleName))
                await roleManager.CreateAsync(new IdentityRole(roleName));
        }

        var users = new List<User>
        {
            new() {Id = "User-01", DisplayName = "Tatiana Prim", UserName = "tatiana@reactivities.com", Email = "tatiana@reactivities.com"},
            new() {Id = "User-02", DisplayName = "Roser Vidal", UserName = "roser@reactivities.com", Email = "roser@reactivities.com"},
            new() {Id = "User-03", DisplayName = "Núria Abad", UserName = "nuria@reactivities.com", Email = "nuria@reactivities.com"},
            new() {Id = "User-04", DisplayName = "Carla Perez", UserName = "carla@reactivities.com", Email = "carla@reactivities.com"},
            new() {Id = "User-05", DisplayName = "Cristina Pous", UserName = "cristina@reactivities.com", Email = "cristina@reactivities.com"},
            new() {Id = "User-06", DisplayName = "Ester Garcia", UserName = "ester@reactivities.com", Email = "ester@reactivities.com"},
            new() {Id = "User-07", DisplayName = "Helena Moreno", UserName = "helena@reactivities.com", Email = "helena@reactivities.com"},
            new() {Id = "User-08", DisplayName = "Laura Baldoví", UserName = "laura@reactivities.com", Email = "laura@reactivities.com"},
            new() {Id = "User-09", DisplayName = "Carmen Garcia", UserName = "carmen@reactivities.com", Email = "carmen@reactivities.com"},
            new() {Id = "User-10", DisplayName = "Raquel Rodríguez", UserName = "raquel@reactivities.com", Email = "raquel@reactivities.com"},
            new() {Id = "User-11", DisplayName = "Dolores Fernández", UserName = "dolores@reactivities.com", Email = "dolores@reactivities.com"},
            new() {Id = "User-12", DisplayName = "Pilar Gómez", UserName = "pilar@reactivities.com", Email = "pilar@reactivities.com"},
            new() {Id = "User-13", DisplayName = "Miguel Díaz", UserName = "miguel@reactivities.com", Email = "miguel@reactivities.com"},
            new() {Id = "User-14", DisplayName = "Antonia Martín", UserName = "antonia@reactivities.com", Email = "antonia@reactivities.com"},
            new() {Id = "User-15", DisplayName = "Admin antic", UserName = "admin_eliminar@reactivities.com", Email = "admin_eliminar@reactivities.com"}
        };

        if (!userManager.Users.Any())
        {
            foreach (var user in users)
            {
                await userManager.CreateAsync(user, "Pa$$w0rd");
            }

            foreach (var id in new[] { "User-01", "User-02", "User-03", "User-04", "User-15" })
            {
                var u = await userManager.FindByIdAsync(id);
                await userManager.AddToRoleAsync(u!, "Admin");
            }

            foreach (var id in new[] { "User-05", "User-06", "User-07", "User-08", "User-09", "User-10", "User-11", "User-12" })
            {
                var u = await userManager.FindByIdAsync(id);
                await userManager.AddToRoleAsync(u!, "Regular");
            }

            foreach (var id in new[] { "User-13", "User-14" })
            {
                var u = await userManager.FindByIdAsync(id);
                await userManager.AddToRoleAsync(u!, "Observer");
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
            new()
            {
                Title = "Taller acabat",
                Description = "Taller anterior",
                CreatorId = users[14].Id,
                MaxParticipants = 10,
                AllowedMissedDays = 3,
                RoomId = rooms[1].Id,
                Organizers = [
                    new ActivityOrganizer
                    {
                        UserId = users[0].Id
                    },
                    new ActivityOrganizer
                    {
                        UserId = users[5].Id
                    }
                ],
                Recurrences = [
                    new RecurrenceActivity
                    {
                        Date = new DateOnly(2024, 4, 10),
                        TimeStart = new TimeOnly(10, 30),
                        TimeEnd = new TimeOnly(12, 30),
                        RoomId = rooms[1].Id
                    }
                ],
                Requests = [
                    new Request
                    {
                        State = 1,
                        Type = 0,
                        Message = "Sol·licitud d'una activitat antiga",
                        RequestedById = users[5].Id,
                        ApprovedById = users[0].Id,
                        DateCreated = new DateTime(2025, 4, 10),
                        DateApproved = new DateTime(2025, 4, 12)
                    }
                ]
            },
            new()
            {
                Title = "Taller acabat",
                Description = "Taller anterior",
                CreatorId = users[0].Id,
                MaxParticipants = 10,
                AllowedMissedDays = 3,
                RoomId = rooms[1].Id,
                Organizers = [
                    new ActivityOrganizer
                    {
                        UserId = users[0].Id
                    },
                    new ActivityOrganizer
                    {
                        UserId = users[5].Id
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
                ],
                Requests = [
                    new Request
                    {
                        State = 1,
                        Type = 0,
                        Message = "Abonar compra de 2€ pinzells",
                        RequestedById = users[5].Id,
                        ApprovedById = users[0].Id,
                        DateCreated = new DateTime(2025, 4, 10),
                        DateApproved = new DateTime(2025, 4, 12)
                    }
                ]
            },
            new()
            {
                Title = "Taller cancel·lat",
                Description = "--",
                CreatorId = users[rnd.Next(0, 4)].Id,
                MaxParticipants = 30,
                IsCancelled = true,
                AllowedMissedDays = rnd.Next(1, 5),
                Organizers = [
                    new ActivityOrganizer
                    {
                        UserId = users[3].Id
                    },
                    new ActivityOrganizer
                    {
                        UserId = users[4].Id
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
            new()
            {
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
            new()
            {
                Title = "Risoterapia",
                Description = "",
                CreatorId = users[2].Id,
                MaxParticipants = 10,
                RoomId = rooms[2].Id,
                AllowedMissedDays = 3,
                Organizers = [
                    new ActivityOrganizer
                    {
                        UserId = users[4].Id
                    }
                ],
                Attendees = [
                    new Attendee { Identifier = "Teresa Ortiz" },
                    new Attendee { Identifier = "Alejandro Fernández" },
                    new Attendee { Identifier = "Lucía Martínez" },
                    new Attendee { Identifier = "Miguel Gómez" },
                    new Attendee { Identifier = "Carmen Sánchez" },
                    new Attendee { Identifier = "Pablo Rodríguez" },
                    new Attendee { Identifier = "Laura Díaz" },
                    new Attendee { Identifier = "Fernando Jiménez" },
                    new Attendee { Identifier = "Ana López" }
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
                    }
                ],
                Requests = [
                    new Request
                    {
                        State = 1,
                        Type = 1,
                        Message = "Esmorzar pel dimarts 15",
                        RequestedById = users[4].Id,
                        ApprovedById = users[0].Id,
                        DateCreated = new DateTime(2025, 4, 10),
                        DateApproved = new DateTime(2025, 4, 12)
                    },
                    new Request
                    {
                        State = 1,
                        Type = 1,
                        Message = "Es necessita una sala per l'activitat extra del dia 7-5",
                        RequestedById = users[4].Id,
                        ApprovedById = users[1].Id,
                        DateCreated = new DateTime(2025, 4, 15),
                        DateApproved = new DateTime(2025, 4, 17)
                    }
                ]
            },
            new()
            {
                Title = "Casal infantil",
                Description = "Per a mares i nens de 0-3 anys",
                CreatorId = users[0].Id,
                MaxParticipants = 10,
                RoomId = rooms[2].Id,
                AllowedMissedDays = 3,
                Organizers = [
                    new ActivityOrganizer
                    {
                        UserId = users[8].Id
                    }
                ],
                Attendees = [
                    new Attendee { Identifier = "Salma Zahra El Fassi" },
                    new Attendee { Identifier = "Valentina Castro" },
                    new Attendee { Identifier = "Isabella Rojas" },
                    new Attendee { Identifier = "Fatima Choukri" },
                    new Attendee { Identifier = "Carolina Navarro" },
                    new Attendee { Identifier = "Gabriela Sánchez" },
                    new Attendee { Identifier = "Jackelyn Esteves" },
                    new Attendee { Identifier = "Bianca Vazquez" }
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
                Description = "Xerrades cada dues setmanes",
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
                    new Attendee { Identifier = "Roberta",Comments   = "Potato potato"},
                    new Attendee { Identifier = "Clara" },
                    new Attendee { Identifier = "Alejandro Fernández", Comments = "Los jueves tiene que salir media hora antes" },
                    new Attendee { Identifier = "Lucía Martínez" },
                    new Attendee { Identifier = "Miguel Gómez", Comments = "Es una persona mayor"},
                    new Attendee { Identifier = "Carmen Sánchez" },
                    new Attendee { Identifier = "Pablo Rodríguez"},
                    new Attendee { Identifier = "Laura Díaz" },
                    new Attendee { Identifier = "Fernando Jiménez", Comments = "Es una persona mayor"},
                    new Attendee { Identifier = "Ana López" }

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
                Attendees = [
                    new Attendee { Identifier = "Marta García" },
                    new Attendee { Identifier = "Isabel Ruiz" },
                    new Attendee { Identifier = "Paula Navarro" },
                    new Attendee { Identifier = "Elena Castro" },
                    new Attendee { Identifier = "Sara Villar" },
                    new Attendee { Identifier = "Nuria Molina" },
                    new Attendee { Identifier = "Raquel Morales" },
                    new Attendee { Identifier = "Sonia Ortiz" },
                    new Attendee { Identifier = "Beatriz Sánchez" },
                    new Attendee { Identifier = "Irene Delgado" }
                ],
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
                CreatorId = users[rnd.Next(0, 4)].Id,
                MaxParticipants = rnd.Next(6, 18),
                RoomId = rooms[4].Id,
                AllowedMissedDays = rnd.Next(1, 5),
                Organizers = [
                    new ActivityOrganizer
                    {
                        UserId = users[3].Id
                    }
                ],
                Attendees = [
                    new Attendee { Identifier = "Ana María Torres" },
                    new Attendee { Identifier = "Claudia Herrera" },
                    new Attendee { Identifier = "María José Paredes" },
                    new Attendee { Identifier = "Cristina Fuentes" },
                    new Attendee { Identifier = "Lorena Prieto" },
                    new Attendee { Identifier = "Valeria Campos" },
                    new Attendee { Identifier = "Patricia Morales" },
                    new Attendee { Identifier = "Mónica Vega" },
                    new Attendee { Identifier = "Yolanda Ríos" },
                    new Attendee { Identifier = "Silvia Castaño" }
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
                ],
                Requests = [
                    new Request
                    {
                        State = 1,
                        Type = 1,
                        Message = "S'ha de comprar patates i oli d'oliva pel dimecres 16-4",
                        RequestedById = users[3].Id,
                        ApprovedById = users[0].Id,
                        DateCreated = new DateTime(2025, 4, 11),
                        DateApproved = new DateTime(2025, 4, 14)
                    },
                    new Request
                    {
                        State = 0,
                        Type = 1,
                        Message = "S'ha de comprar 1kg de farina pel dimecres 30-4",
                        RequestedById = users[3].Id,
                        DateCreated = new DateTime(2025, 4, 16)
                    }
                ]
            },
            new()
            {
                Title = "Yoga Grup dimarts",
                Description = "---",
                CreatorId = users[rnd.Next(0, 4)].Id,
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
                    new Attendee { Identifier = "Juan Gómez" },
                    new Attendee { Identifier = "Marta Ruiz" },
                    new Attendee { Identifier = "Carlos Herrera" },
                    new Attendee { Identifier = "Lucía Martín" },
                    new Attendee { Identifier = "David Fernández" },
                    new Attendee { Identifier = "Elena Serrano" },
                    new Attendee { Identifier = "José Antonio Díaz" }
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
                CreatorId = users[rnd.Next(0, 4)].Id,
                MaxParticipants = rnd.Next(6, 18),
                RoomId = rooms[4].Id,
                AllowedMissedDays = rnd.Next(1, 5),
                Organizers = [
                    new ActivityOrganizer
                    {
                        UserId = users[5].Id
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
                ],
                Requests = [
                    new Request
                    {
                        State = 2,
                        Type = 1,
                        Message = "Es necessita una nova màquina de cosir",
                        RequestedById = users[5].Id,
                        ApprovedById = users[1].Id,
                        DateCreated = new DateTime(2025, 4, 3),
                        DateApproved = new DateTime(2025, 4, 7)
                    }
                ]
            },
            new()
            {
                Title = "Yoga Grup dijous",
                Description = "",
                CreatorId = users[rnd.Next(0, 4)].Id,
                MaxParticipants = 7,
                RoomId = rooms[12].Id,
                AllowedMissedDays = 2,
                Organizers = [
                    new ActivityOrganizer
                    {
                        UserId = users[5].Id
                    }
                ],
                Attendees = [
                    new Attendee { Identifier = "Jorge Navarro" },
                    new Attendee { Identifier = "Elena Marín" },
                    new Attendee { Identifier = "Iris Morales" },
                    new Attendee { Identifier = "Noa Ramos" },
                    new Attendee { Identifier = "Aitana Castaño" },
                    new Attendee { Identifier = "Nuria Cortés" },
                    new Attendee { Identifier = "Miguel Gil" },
                    new Attendee { Identifier = "Leticia Suárez", Comments = "Té 80 anys", IsWaiting = true },
                    new Attendee { Identifier = "Rocío Gil", Comments = "Ja ha participat en anterioritat a yoga" , IsWaiting = true },
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
                CreatorId = users[rnd.Next(0, 4)].Id,
                MaxParticipants = 6,
                RoomId = rooms[7].Id,
                AllowedMissedDays = rnd.Next(1, 5),
                Organizers = [
                    new ActivityOrganizer
                    {
                        UserId = users[5].Id
                    }
                ],
                Attendees = [
                    new Attendee { Identifier = "Mario Ruiz" },
                    new Attendee { Identifier = "Diego Blanco" },
                    new Attendee { Identifier = "Carlos Ortiz" },
                    new Attendee { Identifier = "Bruno Herrera" },
                    new Attendee { Identifier = "Alexia Molina" },
                    new Attendee { Identifier = "Andrea Castro" },
                    new Attendee { Identifier = "Antonio Prieto", IsWaiting = true },
                    new Attendee { Identifier = "Alberto Gómez", IsWaiting = true }
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
                CreatorId = users[rnd.Next(0, 4)].Id,
                MaxParticipants = 6,
                RoomId = rooms[6].Id,
                AllowedMissedDays = rnd.Next(1, 3),
                Organizers = [
                    new ActivityOrganizer
                    {
                        UserId = users[5].Id
                    }
                ],
                Attendees = [
                    new Attendee { Identifier = "Sergio Ramos" },
                    new Attendee { Identifier = "Jorge Navarro" },
                    new Attendee { Identifier = "Claudia Fuentes" },
                    new Attendee { Identifier = "Ángel Alonso" },
                    new Attendee { Identifier = "Raúl Vázquez" },
                    new Attendee { Identifier = "Carla Vega" },
                    new Attendee { Identifier = "Eric Ramos" , IsWaiting = true},
                    new Attendee { Identifier = "Iván Domínguez", IsWaiting = true },
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
                CreatorId = users[rnd.Next(0, 4)].Id,
                MaxParticipants = rnd.Next(6, 12),
                RoomId = rooms[12].Id,
                AllowedMissedDays = rnd.Next(1, 3),
                Organizers = [
                    new ActivityOrganizer
                    {
                        UserId = users[9].Id
                    }
                ],
                Attendees = [
                    new Attendee { Identifier = "Antonia Gómez" },
                    new Attendee { Identifier = "Francisca Martín" },
                    new Attendee { Identifier = "Mercedes Jiménez" },
                    new Attendee { Identifier = "Josefa Ruiz" },
                    new Attendee { Identifier = "María Teresa Díaz" },
                    new Attendee { Identifier = "Ángeles Moreno" },
                    new Attendee { Identifier = "Concepción Muñoz" },
                    new Attendee { Identifier = "Rosa María Álvarez" },
                    new Attendee { Identifier = "María Ángeles Romero" },
                    new Attendee { Identifier = "María Luisa Castillo" },
                    new Attendee { Identifier = "Isabel Vázquez" },
                    new Attendee { Identifier = "Manuela Ortega" },
                    new Attendee { Identifier = "Lola Ramos", IsWaiting = true },
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
                CreatorId = users[rnd.Next(0, 4)].Id,
                MaxParticipants = 8,
                RoomId = rooms[5].Id,
                AllowedMissedDays = rnd.Next(1, 5),
                Organizers = [
                    new ActivityOrganizer
                    {
                        UserId = users[8].Id
                    }
                ],
                Attendees = [
                    new Attendee { Identifier = "María Isabel Castro" },
                    new Attendee { Identifier = "Teresa Iglesias" },
                    new Attendee { Identifier = "Nieves Molina" },
                    new Attendee { Identifier = "María Concepción Blanco" },
                    new Attendee { Identifier = "María Rosario Navarro" },
                    new Attendee { Identifier = "Gloria Fernández" },
                    new Attendee { Identifier = "María José Ruiz" }
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
                Description = "Enfocat a persones que parlen àrab",
                CreatorId = users[rnd.Next(0, 4)].Id,
                MaxParticipants = 7,
                RoomId = rooms[9].Id,
                AllowedMissedDays = rnd.Next(1, 3),
                Organizers = [
                    new ActivityOrganizer { UserId = users[10].Id },
                    new ActivityOrganizer { UserId = users[11].Id }
                ],
                Attendees = [
                    new Attendee { Identifier = "Mohamed El Amrani" },
                    new Attendee { Identifier = "Youssef Benjelloun" },
                    new Attendee { Identifier = "Fatima Zahra El Fassi" },
                    new Attendee { Identifier = "Khadija El Mansouri" },
                    new Attendee { Identifier = "Hassan El Oud" },
                    new Attendee { Identifier = "Salma Choukri" },
                    new Attendee { Identifier = "Khalid Bennani" }
                ],
                Recurrences = [.. Enumerable
                    .Range(0, 10)
                    .Select(i => new RecurrenceActivity
                    {
                        Date = DateOnly.FromDateTime(new DateTime(2025, 04, 15).AddDays(i * 7)),
                        TimeStart = new TimeOnly(16, 00),
                        TimeEnd = new TimeOnly(18, 00),
                        RoomId = rooms[9].Id
                    })
                ]
            },
            new()
            {
                Title = "Català",
                Description = "Grup de català enfocat a persones que saben castellà",
                CreatorId = users[rnd.Next(0, 4)].Id,
                MaxParticipants = 7,
                RoomId = rooms[9].Id,
                AllowedMissedDays = rnd.Next(1, 3),
                Organizers = [
                    new ActivityOrganizer { UserId = users[10].Id },
                    new ActivityOrganizer { UserId = users[11].Id }
                ],
                Attendees = [
                    new Attendee { Identifier = "Andrea Morales" },
                    new Attendee { Identifier = "Pedro Guerrero" },
                    new Attendee { Identifier = "Isabella Rojas" },
                    new Attendee { Identifier = "Marco Antonio Blanco" },
                    new Attendee { Identifier = "Carolina Navarro" },
                    new Attendee { Identifier = "Andrés Paredes" },
                    new Attendee { Identifier = "Paola Cedeño" }
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
                Title = "Club de lectura",
                Description = "Grup de lectura per nens de 6-12 anys",
                CreatorId = users[rnd.Next(0, 4)].Id,
                MaxParticipants = 20,
                RoomId = rooms[0].Id,
                AllowedMissedDays = rnd.Next(1, 5),
                Organizers = [
                    new ActivityOrganizer
                    {
                        UserId = users[2].Id
                    },
                    new ActivityOrganizer
                    {
                        UserId = users[3].Id
                    },
                    new ActivityOrganizer
                    {
                        UserId = users[7].Id
                    },
                ],
                Attendees = [
                    new Attendee { Identifier = "Hugo García" },
                    new Attendee { Identifier = "Daniel Martínez" },
                    new Attendee { Identifier = "Pablo Rodríguez" },
                    new Attendee { Identifier = "Alejandro López" },
                    new Attendee { Identifier = "Álvaro Sánchez" },
                    new Attendee { Identifier = "Manuel Fernández" },
                    new Attendee { Identifier = "Adrián Gómez" },
                    new Attendee { Identifier = "Lucas Martín" },
                    new Attendee { Identifier = "David Pérez" },
                    new Attendee { Identifier = "Javier González" },
                    new Attendee { Identifier = "María Muñoz" },
                    new Attendee { Identifier = "Paula Ruiz" },
                    new Attendee { Identifier = "Laura Díaz" },
                    new Attendee { Identifier = "Daniela Moreno" },
                    new Attendee { Identifier = "Lucía Hernández" },
                    new Attendee { Identifier = "Adriana Jiménez" },
                    new Attendee { Identifier = "Sofía Romero" },
                    new Attendee { Identifier = "Sara Álvarez" },
                    new Attendee { Identifier = "Marta Torres" },
                    new Attendee { Identifier = "Alba Ramírez" }
                ],
                Recurrences = [.. Enumerable
                    .Range(0, 5)
                    .Select(i => new RecurrenceActivity
                    {
                        Date = DateOnly.FromDateTime(new DateTime(2025, 04, 10).AddDays(i * 7)),
                        TimeStart = new TimeOnly(18, 00),
                        TimeEnd = new TimeOnly(19, 30),
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

        List<LaundryBooking> laundryBookings = [];
        for (int i = 0; i < 10; i++)
        {
            laundryBookings.Add(new()
            {
                Name = "Marisa",
                Start = new DateTime(2025, 4, 1, 09, 30, 00, DateTimeKind.Utc).AddDays(7 * i),
                End = new DateTime(2025, 4, 1, 11, 00, 00, DateTimeKind.Utc).AddDays(7 * i),
            });

            laundryBookings.Add(new()
            {
                Name = "Pepe",
                Start = new DateTime(2025, 4, 1, 12, 00, 00, DateTimeKind.Utc).AddDays(7 * i),
                End = new DateTime(2025, 4, 1, 13, 30, 00, DateTimeKind.Utc).AddDays(7 * i),
            });

            laundryBookings.Add(new()
            {
                Name = "Roberta",
                Start = new DateTime(2025, 4, 2, 15, 00, 00, DateTimeKind.Utc).AddDays(7 * i),
                End = new DateTime(2025, 4, 2, 16, 30, 00, DateTimeKind.Utc).AddDays(7 * i),
            });

            laundryBookings.Add(new()
            {
                Name = "Carlos",
                Start = new DateTime(2025, 4, 3, 11, 00, 00, DateTimeKind.Utc).AddDays(7 * i),
                End = new DateTime(2025, 4, 3, 12, 30, 00, DateTimeKind.Utc).AddDays(7 * i),
            });

            laundryBookings.Add(new()
            {
                Name = "Esteban",
                Start = new DateTime(2025, 4, 3, 16, 00, 00, DateTimeKind.Utc).AddDays(7 * i),
                End = new DateTime(2025, 4, 3, 17, 30, 00, DateTimeKind.Utc).AddDays(7 * i),
            });

            laundryBookings.Add(new()
            {
                Name = "Maria Cristina",
                Start = new DateTime(2025, 4, 4, 9, 00, 00, DateTimeKind.Utc).AddDays(7 * i),
                End = new DateTime(2025, 4, 4, 10, 30, 00, DateTimeKind.Utc).AddDays(7 * i),
            });

            laundryBookings.Add(new()
            {
                Name = "Pepita",
                Start = new DateTime(2025, 4, 7, 10, 30, 00, DateTimeKind.Utc).AddDays(7 * i),
                End = new DateTime(2025, 4, 7, 12, 00, 00, DateTimeKind.Utc).AddDays(7 * i),
            });
        }

        context.LaundryBookings.AddRange(laundryBookings);
        await context.SaveChangesAsync();
    }
}