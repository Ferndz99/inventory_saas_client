import axiosInstance from "@/lib/axios"
import { AssignAttributeFormValues, AttributeFormValues, CreateCategoryForm, CreateCompanyFormValues, ProductOnboardingForm, TemplateFormValues } from "@/schemas/onboarding.schema"


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
    },


    assignAttribute: async (templateId: number | undefined, { custom_attribute, global_attribute, default_value, is_required, order }: AssignAttributeFormValues) => {
        const response = await axiosInstance.post(`/api/v1/templates/${templateId}/add-attribute/`, { custom_attribute, global_attribute, default_value, is_required, order })
        return response.data
    },

    getGlobalAttributes: async () => {
        const response = await axiosInstance.get('/api/v1/global-attributes/')
        return response.data
    },

    getCustomAttributes: async () => {
        const response = await axiosInstance.get('/api/v1/custom-attributes/')
        return response.data
    },

    createProduct: async ({ name, price, is_active, price_includes_tax, sku, barcode, cost, minimum_stock, unit_of_measure, category, template, specifications }: ProductOnboardingForm) => {
        const response = await axiosInstance.post('/api/v1/products/', { name, price, is_active, price_includes_tax, sku, barcode, cost, minimum_stock, unit_of_measure, category, template, specifications })
        return response.data
    },

    getAttributesFortemplate: async (templateId: number) => {
        const response = await axiosInstance.get(`/api/v1/templates/${templateId}/structure/`)
        return response.data
    },

    validateSpecifications: async (payload: {
        template: number
        specifications: Record<string, any>,
        category: number,
        name: string,
        price: number,
        sku: string
    }) => {
        const response = await axiosInstance.post(
            "/api/v1/products/validate-specifications/",
            payload
        )
        return response.data
    },
}