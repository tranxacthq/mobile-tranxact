import { LoginResponse, SignupResponse, VerifyOtpResponse } from '@/types/auth';
import { useMutation } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '@/clients/api';

const authApiService = {
    login: async (email: string, password: string) => {
        const response = await api.post<LoginResponse>('/auth/login', { email, password });
        return response.data;
    },

    signup: async (email: string) => {
        const response = await api.post<SignupResponse>('/auth/signup', { email });
        return response.data;
    },

    verifyOtp: async (email: string, otp: string) => {
        const response = await api.post<VerifyOtpResponse>('/auth/verify-otp', { email, otp });
        return response.data;
    },

    completeSignup: async (userData: {
        email: string;
        firstName: string;
        lastName: string;
        password: string;
        whatsappNumber: string;
    }) => {
        const response = await api.post('/auth/complete-signup', userData);
        return response.data;
    },

    setup2FA: async (code: string) => {
        const response = await api.post('/auth/setup-2fa', { code });
        return response.data;
    }
};

export const authService = {
    useLogin: () => {
        return useMutation({
            mutationFn: ({ email, password }: { email: string; password: string }) =>
                authApiService.login(email, password),
            onSuccess: async (data) => {
                await AsyncStorage.setItem('auth-token', data.token);
                await AsyncStorage.setItem('refresh-token', data.refreshToken);
            }
        });
    },

    useSignup: () => {
        return useMutation({
            mutationFn: (email: string) => authApiService.signup(email)
        });
    },

    useVerifyOtp: () => {
        return useMutation({
            mutationFn: ({ email, otp }: { email: string; otp: string }) =>
                authApiService.verifyOtp(email, otp)
        });
    },

    useCompleteSignup: () => {
        return useMutation({
            mutationFn: (userData: {
                email: string;
                firstName: string;
                lastName: string;
                password: string;
                whatsappNumber: string;
            }) => authApiService.completeSignup(userData)
        });
    },

    useSetup2FA: () => {
        return useMutation({
            mutationFn: (code: string) => authApiService.setup2FA(code)
        });
    },

    // Original methods (kept for backward compatibility)
    login: authApiService.login,
    signup: authApiService.signup,
    verifyOtp: authApiService.verifyOtp,
    completeSignup: authApiService.completeSignup,
    setup2FA: authApiService.setup2FA
};