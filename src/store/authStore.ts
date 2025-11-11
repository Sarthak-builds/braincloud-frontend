import {create} from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthFormData, AuthResponse, User } from '@/types';
import * as api from '../lib/api'

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    register: ( credentials: AuthFormData) => Promise<void>;
    login: (credentials: AuthFormData) => Promise<void>;
    logout: () => void;
}

const useAuthStore = create<AuthState>()(persist((set)=> ({
    user:null,
    token:null,
    isAuthenticated:false,

    register: async (credentials:AuthFormData) => {
        const response = await api.signupApi(credentials);
        if(response && response.user && response.token) {
            const userResponse:User = {
                id: response.user.id,
                username: response.user.username,
                email: credentials.email,
            };
            set({user: userResponse, token:response.token,
                isAuthenticated:true,
            });
        }
    },
    login: async ( credentials: AuthFormData) => {
        const response = await api.signinApi(credentials);
        set({ token:response.token, isAuthenticated:true});
    },
    logout: () => set({user:null, isAuthenticated:false, token:null}),
}),
{
    name: 'auth-storage',
    partialize: (state) => ({
      token: state.token,
      user:state.user,
      isAuthenticated:state.isAuthenticated,
    }),
    storage: {
        getItem: (name) => {
            const str = localStorage.getItem(name);
            if (str) {
                return JSON.parse(str);
            }
            return null;
        },
        setItem: (name, value) => {
            localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
            localStorage.removeItem(name);
        },
    }
}));

    export default useAuthStore;