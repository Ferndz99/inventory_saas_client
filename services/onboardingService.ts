import axiosInstance from "@/lib/axios"
import { AttributeFormValues, CreateCategoryForm, CreateCompanyFormValues, TemplateFormValues } from "@/schemas/onboarding.schema"


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
    },

    createAttribute: async ({ name, data_type, description, is_active, unit_of_measure }: AttributeFormValues) => {
        const response = await axiosInstance.post('/api/v1/custom-attributes/', { name, data_type, description, is_active, unit_of_measure })
        return response.data
    }
}