import axiosInstance from "@/lib/axios"
import { CreateCompanyFormValues } from "@/schemas/onboarding.schema"


export const onboardingService = {
    createCompany: async ({ company_name, company_rut }: CreateCompanyFormValues) => {
        const response = await axiosInstance.post('/api/v1/onboarding/setup-company/', { company_name, company_rut })
        return response.data
    },
}