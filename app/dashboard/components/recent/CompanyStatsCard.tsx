// components/CompanyStatsCard.tsx
"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Package, FolderTree, Warehouse, FileText, AlertTriangle, DollarSign } from "lucide-react"
import StatItem from "./StatItem"

interface CompanyStats {
    total_products: number
    total_categories: number
    total_warehouses: number
    total_templates: number
    low_stock_products: number
    total_stock_value: number
}


export function CompanyStatsCard({ stats }: { stats: CompanyStats | null }) {
    if (!stats) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Estadísticas Generales</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">Cargando...</p>
                </CardContent>
            </Card>
        )
    }

    const formatCLP = (value: number) =>
        new Intl.NumberFormat("es-CL", {
            style: "currency",
            currency: "CLP",
            maximumFractionDigits: 0,
        }).format(value);

    return (
        <Card className="bg-gray-50">
            <CardHeader>
                <CardTitle>Estadísticas Generales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
                <StatItem
                    icon={Package}
                    label="Productos"
                    value={stats.total_products}
                    iconColor="text-blue-600"
                    iconBg="bg-blue-50"
                />

                <StatItem
                    icon={FolderTree}
                    label="Categorías"
                    value={stats.total_categories}
                    iconColor="text-purple-600"
                    iconBg="bg-purple-50"
                />

                <StatItem
                    icon={Warehouse}
                    label="Bodegas"
                    value={stats.total_warehouses}
                    iconColor="text-green-600"
                    iconBg="bg-green-50"
                />

                <StatItem
                    icon={FileText}
                    label="Plantillas"
                    value={stats.total_templates}
                    iconColor="text-orange-600"
                    iconBg="bg-orange-50"
                />

                {stats.low_stock_products > 0 && (
                    <StatItem
                        icon={AlertTriangle}
                        label="Productos con stock bajo"
                        value={stats.low_stock_products}
                        iconColor="text-red-600"
                        iconBg="bg-red-50"
                        alert
                    />
                )}

                <div className="pt-2 border-t mt-2">
                    <StatItem
                        icon={DollarSign}
                        label="Valor total inventario"
                        value={formatCLP(stats.total_stock_value)}
                        iconColor="text-emerald-600"
                        iconBg="bg-emerald-50"
                    />
                </div>
            </CardContent>
        </Card>
    )
}