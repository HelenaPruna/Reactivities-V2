import { useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import { useMemo } from "react";

export const useProfiles = (id?: string) => {
    const queryClient = useQueryClient();

    const { data: profiles, isLoading: isLoadingProfiles } = useQuery({
        queryKey: ['profiles'],
        queryFn: async () => {
            console.log("is loading profiles");
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

    const isCurrentUser = useMemo(() => {  //TODO: revisar si al final necessito això o no 
        return id === queryClient.getQueryData<User>(['user'])?.id 
     }, [id, queryClient])

    return {
        profiles,
        isLoadingProfiles,
        profile,
        loadingProfile,
        isCurrentUser
    }
}