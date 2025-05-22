import { useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import { useState } from "react";

export const useProfiles = (id?: string) => {
    const [filter, setFilter] = useState<string | null>(null);
    const queryClient = useQueryClient();

    const { data: profiles, isLoading: isLoadingProfiles } = useQuery({
        queryKey: ['profiles'],
        queryFn: async () => {
            const response = await agent.get<Profile[]>('/profiles');
            return response.data;
        },
        enabled: !id && !queryClient.getQueryData(['profiles'])
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

    return {
        profiles,
        isLoadingProfiles,
        profile,
        loadingProfile,
        userActivities,
        loadingUserActivities,
        filter,
        setFilter
    }
}