'use client';

import { useEffect } from 'react';
import useAuthStore from '@/store/authStore';
import api from '@/lib/api';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    
    const token = useAuthStore.getState().token;
    const interceptor = api.interceptors.request.use((config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        delete config.headers.Authorization;
      }
      return config;
    });

    // Cleanup on unmount
    return () => {
      api.interceptors.request.eject(interceptor);
    };
  }, []); 
  return <>{children}</>;
}