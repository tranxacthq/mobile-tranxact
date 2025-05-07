import axios, { AxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL, DEFAULT_HEADERS, REQUEST_TIMEOUT } from '@/config/apiConfig';

const apiClient = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
    headers: DEFAULT_HEADERS,
});

apiClient.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('auth-token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = await AsyncStorage.getItem('refresh-token');
                if (!refreshToken) {
                    throw new Error('No refresh token available');
                }

                const response = await axios.post(`${BASE_URL}/auth/refresh`, {
                    refreshToken
                });

                await AsyncStorage.setItem('auth-token', response.data.token);
                if (response.data.refreshToken) {
                    await AsyncStorage.setItem('refresh-token', response.data.refreshToken);
                }

                originalRequest.headers.Authorization = `Bearer ${response.data.token}`;
                return apiClient(originalRequest);
            } catch (refreshError) {
                await AsyncStorage.removeItem('auth-token');
                await AsyncStorage.removeItem('refresh-token');
                console.error('Token refresh failed, redirecting to login');
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export const api = {
    get: <T>(url: string, config?: AxiosRequestConfig) =>
        apiClient.get<T>(url, config),

    post: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
        apiClient.post<T>(url, data, config),

    put: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
        apiClient.put<T>(url, data, config),

    delete: <T>(url: string, config?: AxiosRequestConfig) =>
        apiClient.delete<T>(url, config),

    patch: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
        apiClient.patch<T>(url, data, config),

    setHeader: (key: string, value: string) => {
        apiClient.defaults.headers.common[key] = value;
    },

    clearHeader: (key: string) => {
        delete apiClient.defaults.headers.common[key];
    }
};