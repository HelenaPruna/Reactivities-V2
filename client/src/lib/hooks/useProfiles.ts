import { useQuery } from "@tanstack/react-query";
import agent from "../api/agent";

export const useProfiles = () => {

    const { data: profiles, isLoading: isLoadingProfiles } = useQuery({
        queryKey: ['profiles'],
        queryFn: async () => {
            const response = await agent.get<Profile[]>('/profiles');
            return response.data;
        }
    })

    return {
        profiles,
        isLoadingProfiles
    }
}