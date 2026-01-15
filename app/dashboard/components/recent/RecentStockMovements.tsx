// RecentStockMovements.tsx
"use client"

import { ArrowUp, ArrowDown, ArrowLeftRight } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

export interface StockMovement {
    id: number
    product_name: string
    warehouse_name: string
    movement_type: "IN" | "OUT" | "TRANSFER"
    quantity: number
    account_email: string
    created_at: string
}

interface Props {
    movements: StockMovement[]
    hours: 24 | 48 | 72
    onHoursChange: (value: 24 | 48 | 72) => void
    page: number
    hasNext: boolean
    hasPrevious: boolean
    onPageChange: (page: number) => void
    loading?: boolean
}

export function RecentStockMovements({
    movements,
    hours,
    onHoursChange,
    page,
    hasNext,
    hasPrevious,
    onPageChange,
    loading,
}: Props) {
    const iconMap = {
        IN: <ArrowUp className="text-green-600 h-4 w-4" />,
        OUT: <ArrowDown className="text-red-600 h-4 w-4" />,
        TRANSFER: <ArrowLeftRight className="text-blue-600 h-4 w-4" />,
    }

    const formatStock = (value: string | number) =>
        Math.trunc(Number(value));

    return (
        <Card className="bg-gray-50">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Actividad reciente</CardTitle>

                <Select
                    value={String(hours)}
                    onValueChange={(v) => onHoursChange(Number(v) as 24 | 48 | 72)}
                >
                    <SelectTrigger className="w-28 bg-white">
                        <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="24">24 horas</SelectItem>
                        <SelectItem value="48">48 horas</SelectItem>
                        <SelectItem value="72">72 horas</SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>

            <CardContent className="space-y-4 min-h-125 flex flex-col">
                <div className="flex-1 space-y-4">
                    {loading ? (
                        // Skeleton en lugar de texto
                        Array.from({ length: 10 }).map((_, i) => (
                            <div key={i} className="flex gap-3 animate-pulse">
                                <div className="mt-1 h-4 w-4 bg-gray-200 rounded" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                                </div>
                            </div>
                        ))
                    ) : movements.length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                            No hay movimientos recientes
                        </p>
                    ) : (
                        movements.map((m) => (
                            <div key={m.id} className="flex gap-3 text-sm">
                                <div className="mt-1">
                                    {iconMap[m.movement_type]}
                                </div>

                                <div className="flex-1">
                                    <p className="font-medium">
                                        {m.product_name}
                                        <span className="ml-2 text-muted-foreground">
                                            {m.movement_type === "IN" ? "+" : "-"}
                                            {formatStock(m.quantity)}
                                        </span>
                                    </p>

                                    <p className="text-xs text-muted-foreground">
                                        {m.warehouse_name} ·{" "}
                                        {new Date(m.created_at).toLocaleString("es-CL")}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* PAGINACIÓN */}
                {(movements.length > 0 || loading) && (
                    <div className="pt-4 border-t mt-auto">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        onClick={() => onPageChange(page - 1)}
                                        aria-disabled={!hasPrevious || loading}
                                        className={
                                            !hasPrevious || loading
                                                ? "pointer-events-none opacity-50"
                                                : "cursor-pointer"
                                        }
                                    />
                                </PaginationItem>

                                {page > 2 && (
                                    <PaginationItem>
                                        <PaginationLink
                                            onClick={() => onPageChange(1)}
                                            className="cursor-pointer"
                                        >
                                            1
                                        </PaginationLink>
                                    </PaginationItem>
                                )}

                                {page > 2 && (
                                    <PaginationItem>
                                        <PaginationLink
                                            onClick={() => onPageChange(page - 1)}
                                            className="cursor-pointer"
                                        >
                                            {page - 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                )}

                                <PaginationItem>
                                    <PaginationLink isActive>
                                        {page}
                                    </PaginationLink>
                                </PaginationItem>

                                {hasNext && (
                                    <PaginationItem>
                                        <PaginationLink
                                            onClick={() => onPageChange(page + 1)}
                                            className="cursor-pointer"
                                        >
                                            {page + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                )}

                                <PaginationItem>
                                    <PaginationNext
                                        onClick={() => onPageChange(page + 1)}
                                        aria-disabled={!hasNext || loading}
                                        className={
                                            !hasNext || loading
                                                ? "pointer-events-none opacity-50"
                                                : "cursor-pointer"
                                        }
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}