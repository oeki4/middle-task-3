'use client';

import React from 'react';
import { StoreProvider } from './StoreProvider';

interface ServiceProviderProps {
    children: React.ReactNode;
}

/**
 * Основной провайдер сервисов приложения (аналог _app из Pages Router)
 */
export const ServiceProvider = ({ children }: ServiceProviderProps) => {
    if (typeof window !== 'undefined') {
        console.log('from app');
    }
    
    return (
        <StoreProvider>
            {children}
        </StoreProvider>
    );
};
