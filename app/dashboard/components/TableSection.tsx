import { dashBoardService } from "@/services/dashboardService";
import { TopProduct, TopProductMetric, TopProductsResponse, TopProductsTable } from "./table/TopProductsTable"
import { useEffect, useState } from "react";

function TableSection() {

    const [metric, setMetric] = useState<TopProductMetric>("stock_value");
    const [loading, setLoading] = useState(true);
    const [topProducts, setTopProducts] = useState<TopProductsResponse | null>(null)



    useEffect(() => {
        const getData = async () => {
            const res = await dashBoardService.getTopProducts(metric)
            setTopProducts(res)
        }
        getData()
    }, [metric])


    return (
        <section>
            {topProducts && <TopProductsTable data={topProducts} metric={metric} setMetric={setMetric}/>}
        </section>
    )
}

export default TableSection