'use client'

import { useEffect, useState } from "react";
import ChartSection from "./components/ChartSection";
import { InventoryKpiSection } from "./components/InventoryKpiSection";
import { dashBoardService } from "@/services/dashboardService";
import { TopProduct, TopProductMetric, TopProductsResponse, TopProductsTable } from "./components/table/TopProductsTable";
import TableSection from "./components/TableSection";


export default function page() {

    

    return (
        <>
            <div className="space-y-6">
                <InventoryKpiSection />
                <ChartSection />
                <TableSection/>
            </div>
        </>
    )
}

