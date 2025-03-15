import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import { format } from "date-fns";

export const useAttendees = (id: string, isWaiting?: boolean, date?: Date) => {
    const queryClient = useQueryClient();

    const { data: activityAttendees, isLoading: loadingAttendees, isRefetching: refetchingAttendees } = useQuery({
        queryKey: [id, 'attendees', isWaiting],
        queryFn: async () => {
            const response = await agent.get<Attendee[]>(`/activities/${id}/attendees`, {
                params: {
                    predicate: isWaiting
                }
            });
            return response.data
        },
        enabled: !date && !!id && isWaiting !== undefined
    })

    const { data: activityAttendance, isLoading: loadingAttendance, isRefetching: refetchingAttendance } = useQuery({
        queryKey: [id, 'attendance', date],
        queryFn: async () => {
            const response = await agent.get<Attendance[]>(`/activities/${id}/attendance`, {
                params: {
                    predicate: format(date!, "yyyy-MM-dd")
                }
            });
            return response.data
        },
        enabled: !!id && !!date && isWaiting === undefined
    })

    const updateAttendance = useMutation({
        mutationFn: async (attendanceValues: AttendanceValues[]) => {
            await agent.post(`/activities/${id}/attendance`, attendanceValues, {
                params: {
                    predicate: format(date!, "yyyy-MM-dd")
                }
            });
        },
        onSuccess: async () => {
            queryClient.invalidateQueries({
                queryKey: [id, 'attendees', isWaiting]
            })
        }
    })

    const deleteAttendee = useMutation({ //?: Aqui def quedaria millor opt updating 
        mutationFn: async (attendee: Attendee) => {
            await agent.delete(`/activities/${id}/attendees/${attendee.id}`)
        },
        onSuccess: async () => {
            queryClient.invalidateQueries({
                queryKey: [id, 'attendees', isWaiting]
            })
        }
    })

    const addAttendee = useMutation({
        mutationFn: async (attendee: AttendeeVal) => {
            const response = await agent.post(`/activities/${id}/attendees`, attendee)
            return response.data;
        },
        onSuccess: async () => {
            queryClient.invalidateQueries({
                queryKey: [id, 'attendees', isWaiting]
            })
        }
    })

    return {
        activityAttendees,
        loadingAttendees,
        activityAttendance,
        loadingAttendance,
        updateAttendance,
        refetchingAttendance,
        refetchingAttendees,
        deleteAttendee,
        addAttendee
    }
}