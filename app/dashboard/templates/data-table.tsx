"use client"

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    SortingState,
    OnChangeFn,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface DataTableProps<TData> {
    columns: ColumnDef<TData>[]
    data: TData[]

    pageIndex: number
    pageCount: number
    onPageChange: (pageIndex: number) => void

    sorting: SortingState
    onSortingChange: OnChangeFn<SortingState>
}

export function DataTable<TData>({
    columns,
    data,
    pageIndex,
    pageCount,
    onPageChange,
    sorting,
    onSortingChange,
}: DataTableProps<TData>) {

    const table = useReactTable({
        data,
        columns,

        manualPagination: true,
        manualSorting: true,

        pageCount,

        state: {
            pagination: {
                pageIndex,
                pageSize: 10,
            },
            sorting,
        },

        onSortingChange,

        onPaginationChange: (updater) => {
            const next =
                typeof updater === "function"
                    ? updater({ pageIndex, pageSize: 10 })
                    : updater

            onPageChange(next.pageIndex)
        },

        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className="space-y-4">
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map(headerGroup => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <TableHead
                                        key={header.id}
                                        className={cn(
                                            header.column.getCanSort() && "cursor-pointer select-none"
                                        )}
                                        onClick={header.column.getToggleSortingHandler()}
                                    >
                                        <div className="flex items-center gap-2">
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}

                                            {header.column.getCanSort() && (
                                                <>
                                                    {header.column.getIsSorted() === "asc" && (
                                                        <ArrowUp className="h-4 w-4" />
                                                    )}
                                                    {header.column.getIsSorted() === "desc" && (
                                                        <ArrowDown className="h-4 w-4" />
                                                    )}
                                                    {!header.column.getIsSorted() && (
                                                        <ArrowUpDown className="h-4 w-4 opacity-50" />
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map(row => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map(cell => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No hay plantillas
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                    Mostrando {data.length === 0 ? 0 : pageIndex * 10 + 1} a{" "}
                    {Math.min((pageIndex + 1) * 10, pageIndex * 10 + data.length)} de{" "}
                    {pageCount * 10} resultados
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onPageChange(pageIndex - 1)}
                        disabled={pageIndex === 0}
                    >
                        Anterior
                    </Button>

                    <span className="text-sm text-muted-foreground">
                        Página {pageIndex + 1} de {pageCount}
                    </span>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onPageChange(pageIndex + 1)}
                        disabled={pageIndex + 1 >= pageCount}
                    >
                        Siguiente
                    </Button>
                </div>
            </div>
        </div>
    )
}