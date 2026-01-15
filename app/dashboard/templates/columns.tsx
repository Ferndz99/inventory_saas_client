"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowUpDown } from "lucide-react"


// types/template.ts
export interface Template {
    id: number
    name: string
    description: string
    is_active: boolean
    attribute_count: number
    product_count: number
    created_at: string
}


export const columns: ColumnDef<Template>[] = [
    {
        accessorKey: "name",
        header: "Nombre"
    },
    {
        accessorKey: "attribute_count",
        header: "Atributos",
    },
    {
        accessorKey: "product_count",
        header: "Productos",
    },
    {
        accessorKey: "is_active",
        header: "Estado",
        cell: ({ row }) =>
            row.getValue("is_active") ? (
                <Badge variant="default">Activo</Badge>
            ) : (
                <Badge variant="secondary">Inactivo</Badge>
            ),
    },
    {
        accessorKey: "created_at",
        header: "Creado",
        cell: ({ row }) =>
            new Date(row.getValue("created_at")).toLocaleDateString(),
    },
    {
        id: "actions",
        header: "Acciones",
        cell: ({ row }) => (
            <Button asChild size="sm" variant="outline">
                <Link href={`/dashboard/templates/${row.original.id}`}>
                    Ver
                </Link>
            </Button>
        ),
    },
]
