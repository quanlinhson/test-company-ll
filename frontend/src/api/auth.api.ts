import axiosClient from './axiosClient';
import type { LoginPayload, AuthResponse } from '../types/auth.types';

export const authApi = {
    login: async (payload: LoginPayload): Promise<AuthResponse> => {
        const response = await axiosClient.post<AuthResponse>('/auth/login', payload);
        return response.data;
    },

    register: async (payload: LoginPayload): Promise<void> => {
        await axiosClient.post('/auth/register', payload);
    }
};