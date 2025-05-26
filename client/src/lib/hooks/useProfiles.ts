import { useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";

export const useProfiles = () => {
    const queryClient = useQueryClient();

    const { data: profiles, isLoading: isLoadingProfiles } = useQuery({
        queryKey: ['profiles'],
        queryFn: async () => {
            const response = await agent.get<Profile[]>('/profiles');
            return response.data;
        },
        enabled: !queryClient.getQueryData(['profiles'])
    })

    return {
        profiles,
        isLoadingProfiles
    }
}