import { useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import { useMemo, useState } from "react";

export const useProfiles = (id?: string) => {
    const [filter, setFilter] = useState<string | null>(null);
    const queryClient = useQueryClient();

    const { data: profiles, isLoading: isLoadingProfiles } = useQuery({
        queryKey: ['profiles'],
        queryFn: async () => {
            const response = await agent.get<Profile[]>('/profiles');
            return response.data;
        },
        enabled: !id
    })

    const { data: profile, isLoading: loadingProfile} = useQuery<Profile>({
        queryKey: ['profile', id],
        queryFn: async () => {
            const response = await agent.get<Profile>(`/profiles/${id}`);
            return response.data;
        },
        enabled: !!id
    })

    const {data: userActivities, isLoading: loadingUserActivities} = useQuery({
        queryKey: ['user-activities', filter],
        queryFn: async () => {
            const response = await agent.get<Activity[]>(`/profiles/${id}/activities`, {
                params: {
                    filter
                }
            });
            return response.data
        },
        enabled: !!id && !!filter
    });


    const isCurrentUser = useMemo(() => {  //TODO: revisar si al final necessito això o no 
        return id === queryClient.getQueryData<User>(['user'])?.id 
     }, [id, queryClient])

    return {
        profiles,
        isLoadingProfiles,
        profile,
        loadingProfile,
        isCurrentUser,
        userActivities,
        loadingUserActivities,
        filter,
        setFilter
    }
}