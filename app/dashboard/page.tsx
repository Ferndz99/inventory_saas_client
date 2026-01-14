'use client'

import ChartSection from "./components/ChartSection";
import { InventoryKpiSection } from "./components/InventoryKpiSection";
import TableSection from "./components/TableSection";
import RecentSection from "./components/RecentSection";


export default function page() {

    

    return (
        <>
            <div className="space-y-6">
                <InventoryKpiSection />
                <ChartSection />
                <TableSection/>
                <RecentSection/>
            </div>
        </>
    )
}

