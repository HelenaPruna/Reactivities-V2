import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useStore } from "./useStore"
import agent from "../api/agent"

export const useRooms = (activityId?: string, recurId?: string) => {
    const { roomStore: { startDate, endDate } } = useStore()
    const queryClient = useQueryClient();

    const { data: roomsList, isLoading: loadingRooms } = useQuery({
        queryKey: ['rooms', startDate, endDate],
        queryFn: async () => {
            const response = await agent.get<Room[]>('/rooms', {
                params: {
                    fromDate: startDate,
                    toDate: endDate
                }
            });
            return response.data
        },
        enabled: !activityId && !recurId
    })

    const { data: availableRooms, isLoading: loadingAvailableRooms } = useQuery({
        queryKey: ['rooms', activityId, recurId],
        queryFn: async () => {
            const response = await agent.get<Room[]>(`/rooms/${activityId}`, {
                params: {
                    isOneTime: recurId != undefined,
                    recurId
                }
            });
            return response.data
        },
        enabled: !!activityId
    })

    const bookRoom = useMutation({
        mutationFn: async (roomId: string) => {
            await agent.post(`/rooms/${roomId}/book/${activityId}`, null, {
                params: {
                    isOneTime: recurId != undefined,
                    recurId
                }
            });
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['activities', activityId]
            })
        }
    })

    return {
        roomsList,
        loadingRooms,
        availableRooms,
        loadingAvailableRooms,
        bookRoom
    }
}