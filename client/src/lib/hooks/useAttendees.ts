import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";


export const useAttendees = (id: string, isWaiting?: boolean, recurId?: string | null) => {
    const queryClient = useQueryClient();

    const { data: activityAttendees, isLoading: loadingAttendees } = useQuery({
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
        enabled: recurId === undefined && isWaiting !== undefined
    })

    const { data: activityAttendance, isLoading: loadingAttendance } = useQuery({
        queryKey: [id, 'attendance', recurId],
        queryFn: async () => {
            const response = await agent.get<Attendance[]>(`/activities/${id}/attendance/${recurId}`);
            return response.data
        },
        enabled: !!recurId && isWaiting === undefined
    })

    const updateAttendance = useMutation({
        mutationFn: async (attendanceValues: AttendanceValues[]) => {
            await agent.put(`/activities/${id}/attendance/${recurId}`, attendanceValues);
        },
        onSuccess: async () => {
            queryClient.invalidateQueries({
                queryKey: [id, 'attendees', false]
            })
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
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [id, 'attendees', isWaiting] });
            queryClient.invalidateQueries({ queryKey: ['activities', id] });
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
        onSuccess: (returnedId, newAttendee) => {
            queryClient.setQueryData<Attendee[]>([id, 'attendees', newAttendee.isWaiting], (old = []) =>
                old.map(att => (att.id === 'temp-id' ? { ...att, id: returnedId } : att))
            );
        },
        onSettled: (_, _err, newAtt) => {
            const waitKey = newAtt.isWaiting;
            queryClient.invalidateQueries({ queryKey: [id, 'attendees', waitKey] });
        },
    })

    const activateAttendee = useMutation({
        mutationFn: async (attendeeId: string) => {
            await agent.put(`/activities/${id}/attendees/${attendeeId}`)
        },
        onSuccess: async () => {
            queryClient.invalidateQueries({
                queryKey: [id, 'attendees', isWaiting]
            })
            queryClient.invalidateQueries({ queryKey: ['activities', id] });

        }
    })

    const editAttendee = useMutation({
        mutationFn: async (attendee: AttendeeVal) => {
            await agent.put(`/activities/attendees/${attendee.id}`, attendee)
        },
        onMutate: async (attendeeEdited) => {
            await queryClient.cancelQueries({ queryKey: [id, 'attendees', attendeeEdited.isWaiting] });
            const prevAttendees = queryClient.getQueryData<Attendee[]>([id, 'attendees', attendeeEdited.isWaiting]);
            return { prevAttendees };
        },
        onError: (_, newAttendee, context) => {
            queryClient.setQueryData([id, 'attendees', newAttendee.isWaiting], context?.prevAttendees);
        },
        onSettled: (_, __, newAtt) => {
            const waitKey = newAtt.isWaiting;
            queryClient.invalidateQueries({ queryKey: [id, 'attendees', waitKey] });
        }
    })

    return {
        activityAttendees,
        loadingAttendees,
        activityAttendance,
        loadingAttendance,
        updateAttendance,
        deleteAttendee,
        addAttendee,
        activateAttendee,
        editAttendee
    }
}