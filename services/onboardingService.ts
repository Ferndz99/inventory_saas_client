import axiosInstance from "@/lib/axios"
import { CreateCategoryForm, CreateCompanyFormValues, TemplateFormValues } from "@/schemas/onboarding.schema"


export const onboardingService = {
    createCompany: async ({ company_name, company_rut }: CreateCompanyFormValues) => {
        const response = await axiosInstance.post('/api/v1/onboarding/setup-company/', { company_name, company_rut })
        return response.data
    },

    getOnboardingStatus: async () => {
        const response = await axiosInstance.get('/api/v1/onboarding/progress/')
        return response.data
    },

    createCategory: async ({ name, is_active }: CreateCategoryForm) => {
        const response = await axiosInstance.post('/api/v1/categories/', { name, is_active })
        return response.data
    },

    getTemplates: async () => {
        const response = await axiosInstance.get('/api/v1/templates/')
        return response.data
    },

    createTemplate: async ({ name, description, is_active }: TemplateFormValues) => {
        const response = await axiosInstance.post('/api/v1/templates/', { name, description, is_active })
        return response.data
    }
}