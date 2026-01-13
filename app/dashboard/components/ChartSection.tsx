import { useEffect, useState } from "react"
import { CategoryValueChart } from "./charts/CategoryValueChart"
import { dashBoardService } from "@/services/dashboardService";
import { MovementByTypeChart } from "./charts/MovementByTypeChart";
import { CategoryValueChartSkeleton } from "./charts/CategoryValueChartSkeleton";
import { MovementByTypeChartSkeleton } from "./charts/MovementByTypeChartSkeleton";

interface CategoryAnalysisItem {
    id: number;
    name: string;
    total_products: number;
    total_stock: number;
    total_value: number;
}
interface MovementSummaryResponse {
    total_movements: number;
    total_in: number;
    total_out: number;
    total_transfers: number;
    by_type: Record<string, number>;
}


function ChartSection() {

    const [categoryAnalysis, setCategoryAnalysis] = useState<CategoryAnalysisItem[]>([])
    const [movementByType, setMovementByType] = useState<MovementSummaryResponse | null>(null)

    useEffect(() => {
        const getData = async () => {
            const data1 = await dashBoardService.getCategoryAnalisys()
            const data2 = await dashBoardService.getStockMovementSummary()
            setCategoryAnalysis(data1.categories)
            setMovementByType(data2)
        }
        getData()
    }, [])

    return (
        <section className="">
            <div className="
                grid 
                grid-cols-1 
                xl:grid-cols-2 
                gap-6
            ">
                {!!categoryAnalysis ? <CategoryValueChart categories={categoryAnalysis} /> : <CategoryValueChartSkeleton />}

                {movementByType ?
                    <MovementByTypeChart summary={movementByType} /> : <MovementByTypeChartSkeleton />
                }
            </div>
        </section>
    )
}

export default ChartSection