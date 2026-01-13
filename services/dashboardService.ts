import axiosInstance from "@/lib/axios"

type TopProductMetric =
    | "price"
    | "stock_quantity"
    | "stock_value";

export const dashBoardService = {
    getInventoryValuation: async () => {
        const response = await axiosInstance.get('/api/v1/reports/inventory-valuation/')
        return response.data
    },

    getCategoryAnalisys: async () => {
        const response = await axiosInstance.get('/api/v1/reports/category-analysis/')
        return response.data
    },

    getStockMovementSummary: async () => {
        const response = await axiosInstance.get('/api/v1/stock-movements/summary/')
        return response.data
    },

    getTopProducts: async (metric: TopProductMetric = "stock_value",
        limit = 10) => {
        const response = await axiosInstance.get('/api/v1/reports/top-products/', { params: { metric, limit } })
        return response.data
    },
}