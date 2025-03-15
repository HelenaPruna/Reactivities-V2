import { keepPreviousData, useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import { useLocation } from "react-router";
import { useAccount } from "./useAccount";
import { useStore } from "./useStore";

export const useActivities = (id?: string) => {
    const { activityStore: { filter, startDate } } = useStore()
    const queryClient = useQueryClient();
    const { currentUser } = useAccount();
    const location = useLocation();

    const { data: activitiesGroup, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery<PagedList<Activity, string>>({
        queryKey: ['activities', filter, startDate],
        queryFn: async ({ pageParam = null }) => {
            const response = await agent.get<PagedList<Activity, string>>('/activities', {
                params: {
                    cursor: pageParam,
                    pageSize: 10,
                    filter,
                    startDate
                }
            });
            return response.data;
        },
        placeholderData: keepPreviousData,
        initialPageParam: null,
        getNextPageParam: (lastPage) => lastPage.nextCursor,

        enabled: !id && location.pathname === '/activities' && !!currentUser,
        select: data => ({
            ...data,
            pages: data.pages.map((page) => ({
                ...page,
                items: page.items.map(activity => {
                    return {
                        ...activity,
                        isCreator: currentUser?.id === activity.creator.id,
                        isOrganizing: activity.organizers.some(x => x.id === currentUser?.id),
                        isFull: activity.maxParticipants <= activity.numberAttendees
                    }
                })
            }))
        })
    });

    const { data: activity, isLoading: isLoadingActivity } = useQuery({
        queryKey: ['activities', id],
        queryFn: async () => {
            const response = await agent.get<Activity>(`/activities/${id}`);
            return response.data;
        },
        enabled: !!id && !!currentUser,
        select: data => {
            return {
                ...data,
                isCreator: currentUser?.id === data.creator.id,
                isOrganizing: data.organizers.some(x => x.id === currentUser?.id),
                isFull: data.maxParticipants <= data.numberAttendees
            }
        }
    })

    const updateActivity = useMutation({
        mutationFn: async (activity: Activity) => {
            await agent.put(`/activities/${id}`, activity)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['activities', id]
            })
        }
    })

    const createActivity = useMutation({
        mutationFn: async (activity: FieldActivity) => {
            const response = await agent.post('/activities', activity);
            return response.data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['activities']
            })
        }
    })

    const deleteActivity = useMutation({
        mutationFn: async (id: string) => {
            await agent.delete(`/activities/${id}`)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['activities']
            })
        }
    })

    const updateOrganizers = useMutation({
        mutationFn: async (organizerIds: string[]) => {
            await agent.post(`/activities/${id}/organizers`, organizerIds);
        },
        onSuccess: async () => { //TODO: seria millor si fos ser optimistic updating 
            await queryClient.invalidateQueries({
                queryKey: ['activities', id]
            })
        }
    })


    return {
        activitiesGroup,
        isLoading,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
        updateActivity,
        createActivity,
        deleteActivity,
        activity,
        isLoadingActivity,
        updateOrganizers
    }
}