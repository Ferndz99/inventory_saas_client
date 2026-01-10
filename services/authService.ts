import axiosInstance from '@/lib/axios';
import { RegisterFormValues, LoginFormValues } from '@/schemas/auth.schema';

export const authService = {

    register: async ({ email, password, re_password }: RegisterFormValues) => {
        const response = await axiosInstance.post("api/v1/accounts/", { email, password, re_password })
        return response.data
    },

    login: async ({ email, password }: LoginFormValues) => {
        const response = await axiosInstance.post('/api/v1/auth/login/', {
            email,
            password,
        });
        console.log(response.data)
        const { access } = response.data;
        localStorage.setItem('access_token', access);

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
        return response.data
    },

    resendActivation: async (email: string) => {
        const response = await axiosInstance.post('/api/v1/accounts/resend_activation/', { email })
        return response.data
    }
};