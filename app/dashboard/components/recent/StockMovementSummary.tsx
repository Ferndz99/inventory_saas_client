"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ArrowUp, ArrowDown, Boxes } from "lucide-react"
import type { StockMovement } from "./RecentStockMovements"

interface Props {
    movements: StockMovement[]
    hours: 24 | 48 | 72
}

export function StockMovementsSummary({ movements, hours }: Props) {
    const total = movements.length

    const inCount = movements.filter(m => m.movement_type === "IN").length
    const outCount = movements.filter(m => m.movement_type === "OUT").length

    const productMap = new Map<string, number>()

    movements.forEach(m => {
        productMap.set(
            m.product_name,
            (productMap.get(m.product_name) ?? 0) + Math.abs(m.quantity)
        )
    })

    const topProduct = [...productMap.entries()]
        .sort((a, b) => b[1] - a[1])[0]

    return (
        <Card className="">
            <CardHeader>
                <CardTitle className="text-sm">
                    Resumen últimas {hours}h
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4 text-sm">
                {/* Total */}
                <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Movimientos</span>
                    <span className="font-semibold">{total}</span>
                </div>

                {/* IN / OUT */}
                <div className="flex justify-between gap-2">
                    <div className="flex items-center gap-2 text-green-600">
                        <ArrowUp className="h-4 w-4" />
                        <span>{inCount} IN</span>
                    </div>

                    <div className="flex items-center gap-2 text-red-600">
                        <ArrowDown className="h-4 w-4" />
                        <span>{outCount} OUT</span>
                    </div>
                </div>

                {/* Top product */}
                {topProduct && (
                    <div className="flex items-center gap-2 pt-2 border-t">
                        <Boxes className="h-4 w-4 text-muted-foreground" />
                        <div className="text-xs">
                            <p className="text-muted-foreground">Producto más movido</p>
                            <p className="font-medium">{topProduct[0]}</p>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
