using Application.Activities.DTOs;
using Application.Profiles.DTOs;
using AutoMapper;
using Domain;

namespace Application.Core;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<Activity, Activity>();
        CreateMap<CreateActivityDto, Activity>();
        CreateMap<EditActivityDto, Activity>();
        CreateMap<Activity, ActivityDto>();
        CreateMap<Activity, UserActivityDto>();
        CreateMap<Attendee, AttendeeDto>();
        CreateMap<Attendee, AttendeeAttendanceDto>();
        CreateMap<CreateAttendeeDto, Attendee>();

        CreateMap<ActivityOrganizer, UserProfile>()
            .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.User.DisplayName))
            .ForMember(d => d.Id, o => o.MapFrom(s => s.User.Id));
            
            
        CreateMap<User, UserProfile>();
    }
}
