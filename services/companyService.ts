import axiosInstance from "@/lib/axios";

export const companyService = {
    getCompany: async ()=>{
        const  response = await axiosInstance.get("/api/v1/companies/")
        return response.data
    }
}