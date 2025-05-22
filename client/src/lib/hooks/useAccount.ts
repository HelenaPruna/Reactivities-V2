import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { LoginSchema } from "../schemas/loginSchema"
import agent from "../api/agent"
import { useNavigate } from "react-router";
import { RegisterSchema } from "../schemas/registerSchema";
import { useStore } from "./useStore";

export const useAccount = (usersPage?: boolean, userId?: string) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate()
    const { userStore: { searchTerm } } = useStore()

    const loginUser = useMutation({
        mutationFn: async (creds: LoginSchema) => {
            await agent.post('/login?useCookies=true', creds);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['user']
            })
        }
    })

    const registerUser = useMutation({
        mutationFn: async (creds: RegisterSchema) => {
            await agent.post('/account/register', creds)
        },
        onSuccess: () => {
            navigate('/users', { replace: true })
            queryClient.removeQueries({ queryKey: ['profiles'] });

        }
    })

    const logoutUser = useMutation({
        mutationFn: async () => {
            await agent.post('/account/logout')
        },
        onSuccess: () => {
            queryClient.removeQueries({ queryKey: ['user'] });
            queryClient.removeQueries({ queryKey: ['activities'] });
            queryClient.removeQueries({ queryKey: ['profiles'] });
            navigate('/')
        }
    })

    const { data: currentUser, isLoading: loadingUserInfo } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const response = await agent.get<User>('/account/user-info');
            return response.data;
        },
        enabled: !queryClient.getQueryData(['user'])
    })

    const { data: usersList, isLoading: loadingUsers } = useQuery({
        queryKey: ['usersList', searchTerm],
        queryFn: async () => {
            const response = await agent.get<User[]>('/account/users', {
                params: {
                    searchTerm
                }
            });
            return response.data;
        },
        placeholderData: keepPreviousData,

        enabled: usersPage === true
    })

    const deleteUser = useMutation({
        mutationFn: async () => {
            await agent.delete(`/account/users/${userId}`)
        },
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey: ['usersList'] })
            const prevUsers = queryClient.getQueryData<User[]>(['usersList'])
            queryClient.setQueryData<User[]>(['usersList'], (old = []) =>
                old.filter(u => u.id !== userId))
            return { prevUsers };
        },
        onError: (_, __, context) => {
            queryClient.setQueryData(['usersList'], context?.prevUsers)
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['usersList'] })
            queryClient.removeQueries({ queryKey: ['profiles'] });
        }
    })

    return {
        loginUser,
        currentUser,
        logoutUser,
        loadingUserInfo,
        registerUser,
        usersList,
        loadingUsers,
        deleteUser
    }
}