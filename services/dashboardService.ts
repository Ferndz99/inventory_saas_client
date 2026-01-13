import axiosInstance from "@/lib/axios"

export const dashBoardService = {
    getInventoryValuation: async ()=>{
        const response = await axiosInstance.get('/api/v1/reports/inventory-valuation/')
        return response.data
    },

    getCategoryAnalisys: async ()=>{
        const response = await axiosInstance.get('/api/v1/reports/category-analysis/')
        return response.data
    },

    getStockMovementSummary: async ()=>{
        const response = await axiosInstance.get('/api/v1/stock-movements/summary/')
        return response.data
    },
}