import React, { createContext, useState, useContext, ReactNode } from 'react';

interface ApiContextState {
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
    error: string | null;
    setError: (error: string | null) => void;
}

const ApiContext = createContext<ApiContextState | undefined>(undefined);

export const ApiProvider = ({ children }: { children: ReactNode }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    return (
        <ApiContext.Provider value={{ isLoading, setIsLoading, error, setError }}>
            {children}
        </ApiContext.Provider>
    );
};

export const useApi = (): ApiContextState => {
    const context = useContext(ApiContext);
    if (context === undefined) {
        throw new Error('useApi must be used within an ApiProvider');
    }
    return context;
};