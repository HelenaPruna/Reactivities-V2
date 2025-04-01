import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";


export const useAttendees = (id: string, isWaiting?: boolean, recurId?: string | null) => {
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
        placeholderData: keepPreviousData,
        enabled: recurId === undefined && !!id && isWaiting !== undefined
    })

    const { data: activityAttendance, isLoading: loadingAttendance, isRefetching: refetchingAttendance } = useQuery({
        queryKey: [id, 'attendance', recurId],
        queryFn: async () => {
            const response = await agent.get<Attendance[]>(`/activities/${id}/attendance/${recurId}`);
            return response.data
        },
        enabled: !!id && !!recurId && isWaiting === undefined
    })

    const updateAttendance = useMutation({
        mutationFn: async (attendanceValues: AttendanceValues[]) => {
            await agent.put(`/activities/${id}/attendance/${recurId}`, attendanceValues);
        }
    })

    const deleteAttendee = useMutation({
        mutationFn: async (attendeeId: string) => {
            await agent.delete(`/activities/${id}/attendees/${attendeeId}`)
        },
        onMutate: async (attendeeId: string) => {
            await queryClient.cancelQueries({ queryKey: [id, 'attendees', isWaiting] });
            const previousAttendees = queryClient.getQueryData<Attendee[]>([id, 'attendees', isWaiting]);

            queryClient.setQueryData<Attendee[]>([id, 'attendees', isWaiting], (old = []) =>
                old.filter((attendee) => attendee.id !== attendeeId)
            );
            return { previousAttendees };
        },
        onError: (_, __, context) => {
            queryClient.setQueryData([id, 'attendees', isWaiting], context?.previousAttendees);
        }
    })

    const addAttendee = useMutation({
        mutationFn: async (attendee: AttendeeVal) => {
            const response = await agent.post(`/activities/${id}/attendees`, attendee)
            return response.data;
        },
        onMutate: async (newAttendee) => {
            await queryClient.cancelQueries({ queryKey: [id, 'attendees', newAttendee.isWaiting] });
            const prevAttendees = queryClient.getQueryData<Attendee[]>([id, 'attendees', newAttendee.isWaiting]);

            const optAttendee = { ...newAttendee, id: 'temp-id', skippedDays: 0 };

            queryClient.setQueryData<Attendee[]>([id, 'attendees', newAttendee.isWaiting], (old = []) => [
                ...old,
                optAttendee,
            ]);

            return { prevAttendees };
        },
        onError: (_, newAttendee, context) => {
            queryClient.setQueryData([id, 'attendees', newAttendee.isWaiting], context?.prevAttendees);
        },
        onSuccess: (data, newAttendee) => {
            queryClient.setQueryData<Attendee[]>([id, 'attendees', newAttendee.isWaiting], (old = []) =>
                old.map(att => (att.id === 'temp-id' ? { ...att, id: data } : att))
            );
        }
    })

    const activateAttendee = useMutation({
        mutationFn: async (attendeeId: string) => {
            await agent.put(`/activities/${id}/attendees/${attendeeId}`)
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
        addAttendee,
        activateAttendee
    }
}