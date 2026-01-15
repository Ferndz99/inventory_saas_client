// RecentSection.tsx
import { useEffect, useState } from 'react'
import { RecentStockMovements, StockMovement } from './recent/RecentStockMovements'
import { dashBoardService } from '@/services/dashboardService'
import { CompanyStatsCardSkeleton } from './recent/CompanyStatsCardSkeleton'
import { CompanyStatsCard } from './recent/CompanyStatsCard'



interface CompanyStats {
    total_products: number
    total_categories: number
    total_warehouses: number
    total_templates: number
    low_stock_products: number
    total_stock_value: number
}

function RecentSection() {
    const [recentStock, setRecentStock] = useState<StockMovement[]>([])
    const [hours, setHours] = useState<24 | 48 | 72>(24)
    const [loading, setLoading] = useState(true)
    const [statsLoading, setStatsLoading] = useState(true)

    const [companyStats, setCompanyStats] = useState<CompanyStats | null>(null)

    const [page, setPage] = useState(1)
    const [hasNext, setHasNext] = useState(false)
    const [hasPrevious, setHasPrevious] = useState(false)

    useEffect(() => {
        const getData = async () => {
            try {
                setLoading(true)
                const res = await dashBoardService.getRecentMovements(hours, page)
                setRecentStock(res.results)
                setHasNext(!!res.next)
                setHasPrevious(!!res.previous)
            } finally {
                setLoading(false)
            }
        }
        getData()
    }, [hours, page])

    useEffect(() => {
        const getStats = async () => {
            try {
                setStatsLoading(true)
                const stats = await dashBoardService.getCompanyStats()
                setCompanyStats(stats)
            } catch (error) {
                console.error('Error al cargar estadísticas:', error)
            } finally {
                setStatsLoading(false)
            }
        }
        getStats()
    }, [])

    const handleHoursChange = (newHours: 24 | 48 | 72) => {
        setHours(newHours)
        setPage(1) // Reset a página 1 cuando cambia el filtro
    }

    const handlePageChange = (newPage: number) => {
        if (newPage < 1) return
        if (newPage > page && !hasNext) return
        setPage(newPage)
    }

    return (
        <section className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
            <div className='lg:col-span-2'>
                <RecentStockMovements
                    movements={recentStock}
                    hours={hours}
                    onHoursChange={handleHoursChange}
                    loading={loading}
                    page={page}
                    hasNext={hasNext}
                    hasPrevious={hasPrevious}
                    onPageChange={handlePageChange}
                />
            </div>
            <div className="space-y-4">
                {statsLoading ? (
                    <CompanyStatsCardSkeleton />
                ) : (
                    <CompanyStatsCard stats={companyStats} />
                )}
            </div>
        </section>
    )
}

export default RecentSection