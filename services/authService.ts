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
        return response.data;
    },

    logout: async () => {
        const response = await axiosInstance.post('/api/v1/auth/logout/',{});
        return response.data
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
    },

    requestPasswordReset: async ({ email }: { email: string }) => {
        const response = await axiosInstance.post('/api/v1/accounts/reset_password/', { email })
        return response.data
    },

    confirmPasswordReset: async ({ uid, token, new_password, re_new_password }: { uid: string, token: string, new_password: string, re_new_password: string }) => {
        const response = await axiosInstance.post('/api/v1/accounts/reset_password_confirm/', { uid, token, new_password, re_new_password })
        return response.data
    },
    verifyToken: async () => {
        const response = await axiosInstance.get('/api/v1/auth/verify/')
        return response.data
    }
}