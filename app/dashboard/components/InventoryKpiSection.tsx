// app/dashboard/components/InventoryKpiSection.tsx
'use client';

import { useEffect, useState } from "react";
import { dashBoardService } from "@/services/dashboardService";
import { KpiCardSkeleton } from "./KpiSkeleton";
import { KpiCards } from "./KpiCards";


interface InventoryValuationResponse {
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

export function InventoryKpiSection() {
    const [inventorySummary, setInventorySummary] =
        useState<InventoryValuationResponse | null>(null);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getInitial = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const inventoryData =
                    await dashBoardService.getInventoryValuation();

                setInventorySummary(inventoryData);
            } catch {
                setError("No se pudieron cargar las métricas del inventario");
            } finally {
                setIsLoading(false);
            }
        };

        getInitial();
    }, []);

    if (error) {
        return (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                {error}
            </div>
        );
    }

    if (isLoading) {
        return (
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <KpiCardSkeleton key={i} />
                ))}
            </section>
        );
    }

    // --- KPIs ---
    const totalProducts = Math.round(inventorySummary?.total_items ?? 0);

    const totalValue = Math.round(inventorySummary?.total_value ?? 0);
    const formattedTotalValue = new Intl.NumberFormat("es-CL", {
        style: "currency",
        currency: "CLP",
    }).format(totalValue);

    const totalWarehouses = Object.keys(
        inventorySummary?.by_warehouse ?? {}
    ).length;

    const warehouses = Object.entries(
        inventorySummary?.by_warehouse ?? {}
    );

    const topWarehouse = warehouses.reduce(
        (max, [, curr]) =>
            curr.total_value > max.total_value ? curr : max,
        warehouses[0]?.[1]
    );

    const topWarehouseName = warehouses.find(
        ([, w]) => w === topWarehouse
    )?.[0];

    const formattedTopWarehouseValue = topWarehouse
        ? new Intl.NumberFormat("es-CL", {
            style: "currency",
            currency: "CLP",
        }).format(Math.round(topWarehouse.total_value))
        : "—";

    return (
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <KpiCards
                title="Productos totales"
                value={totalProducts}
                description="en inventario"
            />

            <KpiCards
                title="Valor total del inventario"
                value={formattedTotalValue}
                description="CLP"
            />

            <KpiCards
                title="Bodegas activas"
                value={totalWarehouses}
                description="registradas"
            />

            <KpiCards
                title="Bodega líder"
                value={formattedTopWarehouseValue}
                description={topWarehouseName ?? "—"}
            />
        </section>
    );
}
