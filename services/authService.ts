import axiosInstance from '@/lib/axios';
import { RegisterFormValues } from '@/schemas/auth.schema';

export const authService = {

    register: async ({ email, password, re_password }: RegisterFormValues) => {
        const response = await axiosInstance.post("api/v1/accounts/", { email, password, re_password })
        return response.data
    },

    login: async (email: string, password: string) => {
        const response = await axiosInstance.post('/api/v1/auth/login/', {
            email,
            password,
        });

        const { access_token } = response.data;
        localStorage.setItem('access_token', access_token);

        return response.data;
    },

    logout: async () => {
        try {
            await axiosInstance.post('/api/v1/auth/logout/');
        } finally {
            localStorage.removeItem('access_token');
            window.location.href = '/login';
        }
    },

    getCurrentUser: async () => {
        const response = await axiosInstance.get('/api/v1/accounts/me/');
        return response.data;
    },

    activate: async (uid: string, token: string) => {
        const response = await axiosInstance.post('/api/v1/accounts/activation/', { uid, token })
        return response.status
    }
};