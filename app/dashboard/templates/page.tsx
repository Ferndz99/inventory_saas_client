"use client"

import { useEffect, useState } from "react"
import { onboardingService } from "@/services/onboardingService"
import { columns, Template } from "./columns"
import { DataTable } from "./data-table"
import { DataTableSkeleton } from "./data-table-skeleton"
import { SortingState } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"

function TemplatePage() {
    const [data, setData] = useState<Template[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const [pageIndex, setPageIndex] = useState(0)
    const [pageSize] = useState(10)
    const [totalCount, setTotalCount] = useState(0)

    const [sorting, setSorting] = useState<SortingState>([])

    const pageCount = Math.ceil(totalCount / pageSize)

    useEffect(() => {
        const fetchTemplates = async () => {
            setLoading(true)
            setError(null) // Limpia errores previos

            try {
                const sort = sorting[0]

                const res = await onboardingService.getTemplates(
                    pageIndex + 1,
                    pageSize,
                    sort
                        ? `${sort.desc ? "-" : ""}${sort.id}`
                        : undefined,
                )

                setData(res.results)
                setTotalCount(res.count)
            } catch (err) {
                console.error(err)
                setError("No se pudieron cargar las plantillas")
            } finally {
                setLoading(false)
            }
        }

        fetchTemplates()
    }, [pageIndex, pageSize, sorting])

    // Función mejorada para manejar cambios de sorting
    const handleSortingChange = (updaterOrValue: SortingState | ((old: SortingState) => SortingState)) => {
        // Resetea a la primera página cuando cambia el sorting
        setPageIndex(0)

        // Maneja tanto valores directos como funciones updater
        setSorting(updaterOrValue)
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-96 gap-4">
                <p className="text-sm text-red-500">{error}</p>
                <Button variant="outline" onClick={() => window.location.reload()}>
                    Reintentar
                </Button>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Plantillas</h1>
                <p className="text-sm text-muted-foreground">
                    Gestiona las plantillas de productos
                </p>
            </div>

            {loading ? (
                <DataTableSkeleton columns={columns.length} rows={pageSize} />
            ) : (
                <DataTable
                    columns={columns}
                    data={data}
                    pageIndex={pageIndex}
                    pageCount={pageCount}
                    onPageChange={setPageIndex}
                    sorting={sorting}
                    onSortingChange={handleSortingChange}
                />
            )}
        </div>
    )
}

export default TemplatePage