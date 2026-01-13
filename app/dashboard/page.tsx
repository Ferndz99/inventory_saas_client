'use client'

import { InventoryKpiSection } from "./components/InventoryKpiSection";


export interface InventoryValuationResponse {
    total_value: number;
    total_items: number;
    generated_at: string;
    by_warehouse: Record<string, {
        warehouse_id: number;
        products: number;
        total_items: number;
        total_value: number;
    }>;
}

export default function page() {

    return (
        <>
            <InventoryKpiSection/>
        </>
    )
}

