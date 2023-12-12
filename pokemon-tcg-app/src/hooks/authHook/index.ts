import { IAuthStore } from '@/types';
import { create } from 'zustand';

export const useAuthStore = create<IAuthStore>((set) => ({
    username: '',
    password: '',
    setUsername: (username: string) => set({ username }),
    setPassword: (password: string) => set({ password })
}));
