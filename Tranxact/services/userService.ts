import { api } from '@/clients/api';
import { User, UserProfileUpdateData } from '@/types/user';
import { useMutation, useQuery } from '@tanstack/react-query';


// Base API functions
const userApiService = {
    getCurrentUser: async (): Promise<User> => {
        const response = await api.get<User>('/users/me');
        return response.data;
    },

    updateProfile: async (data: UserProfileUpdateData): Promise<User> => {
        const response = await api.patch<User>('/users/me', { data });
        return response.data;
    }
};

export const userService = {
    useCurrentUser: () => {
        return useQuery({
            queryKey: ['currentUser'],
            queryFn: () => userApiService.getCurrentUser()
        });
    },

    useUpdateProfile: () => {
        return useMutation({
            mutationFn: (data: UserProfileUpdateData) => userApiService.updateProfile(data),
            onSuccess: (_, __, context) => {
                return Promise.resolve();
            }
        });
    },

    getCurrentUser: userApiService.getCurrentUser,
    updateProfile: userApiService.updateProfile
};