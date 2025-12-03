// 'use client';

// import { useEffect } from 'react';
// import useAuthStore from '@/store/authStore';
// import api from '@/lib/api';

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   useEffect(() => {
//     let interceptorId: number | null = null;

//     const applyToken = (token: string | null) => {
//       // Remove previous interceptor
//       if (interceptorId !== null) {
//         api.interceptors.request.eject(interceptorId);
//       }

//       // Add fresh interceptor with the current token
//       interceptorId = api.interceptors.request.use((config) => {
//         if (token) {
//           config.headers.Authorization = `Bearer ${token}`;
//         } else {
//           delete config.headers.Authorization;
//         }
//         return config;
//       });
//     };

//     // 1. Apply token that exists right now (after refresh or first mount)
//     applyToken(useAuthStore.getState().token);

//     // 2. Subscribe to future token changes
//     // Zustand's subscribe only accepts ONE argument: a listener that receives the whole state
//     const unsubscribe = useAuthStore.subscribe((state) => {
//       applyToken(state.token);
//     });

//     // Cleanup
//     return () => {
//       if (interceptorId !== null) {
//         api.interceptors.request.eject(interceptorId);
//       }
//       unsubscribe();
//     };
//   }, []); // runs once on mount

//   return <>{children}</>;
// }