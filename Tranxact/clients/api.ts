import axios, { AxiosRequestConfig, AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL, DEFAULT_HEADERS, REQUEST_TIMEOUT, API_CRYPTO_BASE_URL } from '@/config/apiConfig';

const createAppApiClient = (): AxiosInstance => {
    const instance = axios.create({
        baseURL: BASE_URL,
        timeout: REQUEST_TIMEOUT,
        headers: DEFAULT_HEADERS,
    });

    instance.interceptors.request.use(
        async (config) => {
            try {
                const token = await AsyncStorage.getItem('auth-token');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                console.log(`[API Request] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`, config.params || '');
                return config;
            } catch (error) {
                console.error('[API Request Error]', error);
                return config;
            }
        },
        (error) => {
            console.error('[API Request Interceptor Error]', error);
            return Promise.reject(error);
        }
    );

    // Extend InternalAxiosRequestConfig to include _retry
    interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
        _retry?: boolean;
    }

    instance.interceptors.response.use(
        (response) => {
            console.log(`[API Response Success] ${response.config.method?.toUpperCase()} ${response.config.url}`);
            return response;
        },
        async (error: AxiosError) => {
            const originalRequest = error.config as CustomAxiosRequestConfig;
            if (!originalRequest) {
                console.error('[API Response Error] No original request found', error);
                return Promise.reject(error);
            }

            console.error(`[API Response Error] ${originalRequest.method?.toUpperCase()} ${originalRequest.url}`,
                error.response?.status, error.response?.data);

            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;

                try {
                    console.log('[API] Attempting token refresh');
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
                    console.log('[API] Token refreshed successfully');
                    return instance(originalRequest);
                } catch (refreshError) {
                    console.error('[API] Token refresh failed', refreshError);
                    await AsyncStorage.removeItem('auth-token');
                    await AsyncStorage.removeItem('refresh-token');
                    return Promise.reject(refreshError);
                }
            }

            return Promise.reject(error);
        }
    );

    return instance;
};

const createCryptoApiClient = (): AxiosInstance => {
    const instance = axios.create({
        baseURL: API_CRYPTO_BASE_URL,
        timeout: REQUEST_TIMEOUT,
        headers: DEFAULT_HEADERS,
    });

    instance.interceptors.request.use(
        (config) => {
            console.log(`[Crypto API Request] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`, config.params || '');
            return config;
        },
        (error) => {
            console.error('[Crypto API Request Error]', error);
            return Promise.reject(error);
        }
    );

    instance.interceptors.response.use(
        (response) => {
            console.log(`[Crypto API Response Success] ${response.config.method?.toUpperCase()} ${response.config.url}`);
            return response;
        },
        (error: AxiosError) => {
            console.error('[Crypto API Response Error]',
                error.config?.method?.toUpperCase(),
                error.config?.url,
                error.response?.status,
                error.response?.data);
            return Promise.reject(error);
        }
    );

    return instance;
};

const appApiClient = createAppApiClient();
const cryptoApiClient = createCryptoApiClient();

export const api = {
    get: (url: string, config?: AxiosRequestConfig) =>
        appApiClient.get(url, config),
    post: (url: string, data?: any, config?: AxiosRequestConfig) =>
        appApiClient.post(url, data, config),
    put: (url: string, data?: any, config?: AxiosRequestConfig) =>
        appApiClient.put(url, data, config),
    delete: (url: string, config?: AxiosRequestConfig) =>
        appApiClient.delete(url, config),
    patch: (url: string, data?: any, config?: AxiosRequestConfig) =>
        appApiClient.patch(url, data, config),

    crypto: {
        get: (url: string, config?: AxiosRequestConfig) =>
            cryptoApiClient.get(url, config),
        post: (url: string, data?: any, config?: AxiosRequestConfig) =>
            cryptoApiClient.post(url, data, config),
    },

    setHeader: (key: string, value: string) => {
        appApiClient.defaults.headers.common[key] = value;
    },
    clearHeader: (key: string) => {
        delete appApiClient.defaults.headers.common[key];
    }
};