using Application.Activities.DTOs;
using Application.Attendances.DTOs;
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
        CreateMap<Activity, ActivityDto>()
            .ForMember(x => x.NumberAttendees, o => o.MapFrom(s => s.Attendees.Where(att => att.IsWaiting == false).Count()))
            .ForMember(x => x.NumberWaiting, o => o.MapFrom(s => s.Attendees.Where(att => att.IsWaiting == true).Count()))
            .ForMember(x => x.DateStart, o => o.MapFrom(s => s.FirstDate.Date))
            .ForMember(x => x.DateEnd, o => o.MapFrom(s => s.Recurrences.Where(x => x.IsRecurrent).Max(recur => recur.Date)))
            .ForMember(x => x.TimeStart, o => o.MapFrom(s => s.FirstDate.TimeStart))
            .ForMember(x => x.TimeEnd, o => o.MapFrom(s => s.FirstDate.TimeEnd));
        CreateMap<Activity, ActivityDetailsDto>();

        CreateMap<Activity, UserActivityDto>()
            .ForMember(x => x.Date, o => o.MapFrom(s => s.FirstDate.Date));
        CreateMap<Attendee, AttendeeDto>();
        CreateMap<CreateAttendeeDto, Attendee>();

        CreateMap<ActivityOrganizer, UserProfile>()
            .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.User.DisplayName))
            .ForMember(d => d.Id, o => o.MapFrom(s => s.User.Id));
            
            
        CreateMap<User, UserProfile>();
    }
}
