import axiosInstance from "@/lib/axios"

export const dashBoardService = {
    getInventoryValuation: async ()=>{
        const response = await axiosInstance.get('/api/v1/reports/inventory-valuation/')
        return response.data
    }
}