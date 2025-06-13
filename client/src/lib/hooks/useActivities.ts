import { keepPreviousData, useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import { useLocation, useNavigate } from "react-router";
import { useAccount } from "./useAccount";
import { useStore } from "./useStore";
import dayjs from "dayjs";

export const useActivities = (id?: string) => {
    const { activityStore: { filter, startDate, searchTerm, includeCancelled } } = useStore()
    const queryClient = useQueryClient();
    const { currentUser } = useAccount();
    const location = useLocation();
    const navigate = useNavigate()


    const { data: activitiesGroup, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery<PagedList<Activity>>({
        queryKey: ['activities', filter, startDate, searchTerm, includeCancelled],
        queryFn: async ({ pageParam = null }) => {
            const response = await agent.get<PagedList<Activity>>('/activities', {
                params: {
                    cursor: pageParam,
                    pageSize: 9,
                    filter,
                    startDate,
                    searchTerm,
                    includeCancelled
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
                        isOneDay: activity.dateStart === activity.dateEnd,
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
                isFull: data.maxParticipants <= data.numberAttendees,
                isOneDay: data.dateStart === data.dateEnd,
                interval: data.dateStart === data.dateEnd ? 1 : dayjs(data.dateEnd).diff(dayjs(data.dateStart), 'day') / (data.recurrences.length - 1)
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

    const toggleActivity = useMutation({
        mutationFn: async () => {
            await agent.put(`/activities/${id}/cancel`)
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
        mutationFn: async () => {
            await agent.delete(`/activities/${id}`)
        },
        onSuccess: async () => {
            navigate('/activities', { replace: true })
        }
    })

    const updateOrganizers = useMutation({
        mutationFn: async (organizerIds: string[]) => {
            await agent.post(`/activities/${id}/organizers`, organizerIds);
        },
        onMutate: async (organizerIds) => {
            await queryClient.cancelQueries({ queryKey: ['activities', id] });
            const previousActivity = queryClient.getQueryData<Activity>(['activities', id]);

            if (previousActivity) {
                const profiles = queryClient.getQueryData<Profile[]>(['profiles']) ?? [];
                const nameById = Object.fromEntries(
                    profiles.map(p => [p.id, p.displayName])
                );
                const optOrg: Profile[] = organizerIds.map(
                    uid => ({ id: uid, displayName: nameById[uid] }));

                queryClient.setQueryData<Activity>(['activities', id],
                    { ...previousActivity, organizers: optOrg });
            }
            return { previousActivity };
        },
        onError: (_, _organizerIds, context: { previousActivity?: Activity } | undefined) => {
            if (context?.previousActivity) {
                queryClient.setQueryData<Activity>(
                    ['activities', id],
                    context.previousActivity
                );
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['activities', id] });
        },
    });

    const addRecur = useMutation({
        mutationFn: async (recurrence: CreateRecur) => {
            await agent.post(`/activities/${id}/recurrence`, recurrence)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['activities', id]
            })
        }
    })
    const deleteRecur = useMutation({
        mutationFn: async (recurId: string) => {
            await agent.delete(`/activities/${id}/recurrence/${recurId}`)
        },
        onSuccess: async () => {
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
        toggleActivity,
        createActivity,
        deleteActivity,
        activity,
        isLoadingActivity,
        updateOrganizers,
        addRecur,
        deleteRecur
    }
}