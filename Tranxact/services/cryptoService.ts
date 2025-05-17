import { ICoin } from '@/app/(home)';
import { api } from '@/clients/api';
import { useQuery } from '@tanstack/react-query';

const userApiService = {
    getCryptoCurrency: async (): Promise<ICoin[]> => {
        try {
            const response = await api.crypto.get('/coins/markets', {
                params: {
                    vs_currency: 'usd',
                    order: 'market_cap_desc',
                    per_page: 5,
                    page: 1,
                    sparkline: false
                }
            });

            return response?.data as ICoin[];
        } catch (error) {
            console.error('Error fetching cryptocurrency data:', error);
            throw error;
        }
    },
};

export const useCrypto = {
    useGetCrypto: () => {
        return useQuery({
            queryKey: ['crypto_currency'],
            queryFn: () => userApiService.getCryptoCurrency(),
            retry: 2,
            staleTime: 5 * 60 * 1000,
        });
    },
};