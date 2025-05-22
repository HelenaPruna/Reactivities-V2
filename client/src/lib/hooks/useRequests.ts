import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import agent from "../api/agent"
import { useStore } from "./useStore"

export const useRequests = (isAdding?: boolean, isEval?: boolean, id?: string, activityId?: string) => {
    const queryClient = useQueryClient();
    const { requestStore: { filter, myRequests, myActReqs } } = useStore()
    
    const { data: requests, isLoading: loadingRequests } = useQuery({
        queryKey: ["requests", filter, myRequests, myActReqs],
        queryFn: async () => {
            const response = await agent.get<RequestSol[]>('/requests', {
                params: {
                    filter,
                    myRequests,
                    myActReqs
                }
            });
            return response.data
        },
        enabled: isAdding === undefined && isEval === undefined
    })

    const { data: actOptions, isLoading: loadingActOpt } = useQuery({
        queryKey: ['activityOptions'],
        queryFn: async () => {
            const response = await agent.get<ActivityOptions[]>('/requests/activities');
            return response.data
        },
        enabled: !!isAdding && isEval === undefined 
    })

    const addRequest = useMutation({
        mutationFn: async (req: RequestVal) => {
            const response = await agent.post('/requests', req)
            return response.data
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
              queryKey: ["requests", filter, myRequests],
            });
            if (variables.activityId) {
              queryClient.invalidateQueries({
                queryKey: ["activities", variables.activityId],
              });
            }
          },
    })

    const updateRequest = useMutation({
        mutationFn: async (state: number) => {
            await agent.put(`/requests/${id}`, {state})
        },
        onSuccess: async () => {
            queryClient.invalidateQueries({
                queryKey: ["requests", filter, myRequests]
            })
            if (activityId) queryClient.invalidateQueries({
                queryKey: ["activities", activityId]
            })
        }
    })    

    const deleteRequest = useMutation({
        mutationFn: async () => {
            await agent.delete(`/requests/${id}`)
        },
        onSuccess: async () => {
            queryClient.invalidateQueries({
                queryKey: ["requests", filter, myRequests]
            })
            if (activityId) queryClient.invalidateQueries({
                queryKey: ["activities", activityId]
            })
        }
    })


    return {
        requests,
        loadingRequests,
        addRequest,
        updateRequest,
        deleteRequest,
        actOptions,
        loadingActOpt
    }
}