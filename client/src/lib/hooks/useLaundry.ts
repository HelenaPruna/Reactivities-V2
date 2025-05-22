import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useStore } from "./useStore"
import agent from "../api/agent";

export const useLaundry = (booking: boolean = false) => {
    const { laundryStore: { startDate } } = useStore()
    const queryClient = useQueryClient();

    const { data: bookings, isLoading: loadingBookings } = useQuery({
        queryKey: ['laundryBookings', startDate],
        queryFn: async () => {
            const response = await agent.get<LaundryBooking[]>('/laundry', {
                params: {
                    startDate
                }
            });
            return response.data
        },
        enabled: booking === false
    })

    const bookLaundry = useMutation({
        mutationFn: async (booking: BookingFields) => {
            await agent.post("/laundry", booking);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['laundryBookings', startDate]
            })
        }
    })

    const editBooking = useMutation({
        mutationFn: async (booking: LaundryBooking) => {
            await agent.put(`/laundry/${booking.id}`, booking);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['laundryBookings', startDate]
            })
        }
    })

    const deleteBooking = useMutation({
        mutationFn: async (id: string) => {
            await agent.delete(`/laundry/${id}`)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['laundryBookings', startDate]
            })
        }
    })

    return {
        bookings,
        loadingBookings,
        bookLaundry,
        deleteBooking,
        editBooking
    }
}