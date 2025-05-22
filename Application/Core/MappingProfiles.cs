using Application.Activities.DTOs;
using Application.Attendances.DTOs;
using Application.Laundry.DTOs;
using Application.Profiles.DTOs;
using Application.Requests.DTOs;
using Application.Rooms.DTOs;
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
            .ForMember(dest => dest.IsOrganizing, opt => opt.MapFrom((src, dest, destMember, ctx) => src.Organizers.Any(o => o.UserId == (string)ctx.Items["CurrentUserId"])))
            .ForMember(x => x.NumberAttendees, o => o.MapFrom(s => s.Attendees.Where(att => att.IsWaiting == false).Count()))
            .ForMember(x => x.NumberWaiting, o => o.MapFrom(s => s.Attendees.Where(att => att.IsWaiting == true).Count()))
            .ForMember(x => x.DateStart, o => o.MapFrom(s => s.FirstDate.Date))
            .ForMember(x => x.DateEnd, o => o.MapFrom(s => s.Recurrences.Where(x => x.IsRecurrent).Max(recur => recur.Date)))
            .ForMember(x => x.TimeStart, o => o.MapFrom(s => s.FirstDate.TimeStart))
            .ForMember(x => x.TimeEnd, o => o.MapFrom(s => s.FirstDate.TimeEnd));
        CreateMap<Activity, ActivityDetailsDto>()
            .ForMember(x => x.NumberAttendees, o => o.MapFrom(s => s.Attendees.Where(att => att.IsWaiting == false).Count()))
            .ForMember(x => x.DateStart, o => o.MapFrom(s => s.FirstDate.Date))
            .ForMember(x => x.DateEnd, o => o.MapFrom(s => s.Recurrences.Where(x => x.IsRecurrent).Max(recur => recur.Date)))
            .ForMember(x => x.TimeStart, o => o.MapFrom(s => s.FirstDate.TimeStart))
            .ForMember(x => x.TimeEnd, o => o.MapFrom(s => s.FirstDate.TimeEnd))
            .ForMember(x => x.Recurrences, o => o.MapFrom(s => s.Recurrences.Where(x => x.IsRecurrent)))
            .ForMember(x => x.OneTimeEvents, o => o.MapFrom(s => s.Recurrences.Where(x => !x.IsRecurrent).OrderBy(x => x.Date)));
        CreateMap<Activity, UserActivityDto>()
            .ForMember(x => x.DateStart, o => o.MapFrom(s => s.FirstDate.Date))
            .ForMember(x => x.DateEnd, o => o.MapFrom(s => s.Recurrences.Where(x => x.IsRecurrent && x.Id != s.FirstDate.Id).Max(recur => recur.Date)));
        CreateMap<Activity, ActivitiesOptionsDto>();

        CreateMap<RecurrenceActivity, RecurrenceDto>();
        CreateMap<RecurrenceActivity, OneTimeDto>();
        CreateMap<RecurrenceActivity, RecurrenceBookingDto>()
            .ForMember(d => d.NumberAttendees, o => o.MapFrom(s => s.Activity.MaxParticipants))
            .ForMember(d => d.ActivityTitle, o => o.MapFrom(s => s.Activity.Title));

        CreateMap<Attendee, AttendeeDto>();
        CreateMap<CreateAttendeeDto, Attendee>();

        CreateMap<ActivityOrganizer, UserProfile>()
            .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.User.DisplayName))
            .ForMember(d => d.Id, o => o.MapFrom(s => s.User.Id));
        CreateMap<User, UserProfile>();

        CreateMap<Room, RoomDto>();
        CreateMap<Room, ActivityRoomDto>();

        CreateMap<Request, ActivityRequestDto>();
        CreateMap<Request, RequestDto>()
            .ForMember(d => d.ActivityTitle, o => o.MapFrom(s => s.Activity.Title));

        CreateMap<EditBookingDto, LaundryBooking>();
    }
}
