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
            new() {DisplayName = "Maria Robles", UserName = "maria@test.com", Email = "maria@test.com"},
            new() {DisplayName = "Tatiana Prim", UserName = "tatiana@test.com", Email = "tatiana@test.com"},
            new() {DisplayName = "Roser Fabra", UserName = "roser@test.com", Email = "roser@test.com"}
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
                Title = "Past Activity 1",
                Date = DateTime.Now.AddMonths(-2),
                Description = "Activity 2 months ago",
                Category = "drinks",
                Room = "London",
                CreatorId = users[0].Id,
                Organizers = [
                    new ActivityOrganizer
                    {
                        UserId = users[0].Id
                    }
                ]
            },
            new() {
                Title = "Past Activity 2",
                Date = DateTime.Now.AddMonths(-1),
                Description = "Activity 1 month ago",
                Category = "culture",
                Room = "Paris",
                CreatorId = users[0].Id,
                Organizers = [
                    new ActivityOrganizer
                    {
                        UserId = users[2].Id
                    }
                ]
            },
            new() {
                Title = "Future Activity 1",
                Date = DateTime.Now.AddMonths(1),
                Description = "Activity 1 month in future",
                Category = "culture",
                Room = "London",
                CreatorId = users[2].Id
            },
            new() {
                Title = "Future Activity 2",
                Date = DateTime.Now.AddMonths(2),
                Description = "Activity 2 months in future",
                Category = "music",
                Room = "London",
                CreatorId = users[0].Id,
                Organizers = [
                    new ActivityOrganizer
                    {
                        UserId = users[0].Id
                    }
                ]
            },
            new()
            {
                Title = "Future Activity 3",
                Date = DateTime.Now.AddMonths(3),
                Description = "Activity 3 months in future",
                Category = "drinks",
                Room = "London",
                CreatorId = users[1].Id,
                Organizers = [
                    new ActivityOrganizer
                    {
                        UserId = users[2].Id
                    }
                ]
            },
            new()
            {
                Title = "Future Activity 4",
                Date = DateTime.Now.AddMonths(4),
                Description = "Activity 4 months in future",
                Category = "drinks",
                Room = "London",
                CreatorId = users[0].Id
            },
            new()
            {
                Title = "Future Activity 5",
                Date = DateTime.Now.AddMonths(5),
                Description = "Activity 5 months in future",
                Category = "culture",
                Room = "London",
                CreatorId = users[1].Id,
                Organizers = [
                    new ActivityOrganizer
                    {
                        UserId = users[0].Id
                    }
                ]
            },
            new()
            {
                Title = "Future Activity 6",
                Date = DateTime.Now.AddMonths(6),
                Description = "Activity 6 months in future",
                Category = "music",
                Room = "London",
                CreatorId = users[2].Id,
                Organizers = [
                    new ActivityOrganizer
                    {
                        UserId = users[1].Id
                    }
                ]
            },
            new()
            {
                Title = "Future Activity 7",
                Date = DateTime.Now.AddMonths(7),
                Description = "Activity 2 months ago",
                Category = "travel",
                Room = "London",
                CreatorId = users[2].Id
            },
            new()
            {
                Title = "Future Activity 8",
                Date = DateTime.Now.AddMonths(8),
                Description = "Activity 8 months in future",
                Category = "film",
                Room = "London",
                CreatorId = users[0].Id,
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