'use client'

import ChartSection from "./components/ChartSection";
import { InventoryKpiSection } from "./components/InventoryKpiSection";


export default function page() {

    return (
        <>
            <div className="space-y-6">
                <InventoryKpiSection />
                <ChartSection />
            </div>
        </>
    )
}

