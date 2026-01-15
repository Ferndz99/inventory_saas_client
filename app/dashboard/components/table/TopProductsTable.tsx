"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dispatch, SetStateAction } from "react";

export type TopProductMetric =
    | "price"
    | "stock_quantity"
    | "stock_value";

export interface TopProduct {
    id: number;
    name: string;
    sku: string;
    barcode: string;
    price: number;
    cost: number;
    category_name: string;
    template_name: string;
    total_stock: string;
    below_minimum: string;
    is_active: boolean;
    unit_of_measure: string;
}

export interface TopProductsResponse {
    metric: TopProductMetric;
    limit: number;
    products: TopProduct[];
    generated_at: string;
}


interface TopProductsTableProps {
    data: TopProductsResponse;
    metric: TopProductMetric,
    setMetric: Dispatch<SetStateAction<TopProductMetric>>
}

export function TopProductsTable({ data, metric, setMetric }: TopProductsTableProps) {

    const metricOptions = [
        { value: "stock_value", label: "Valor en stock" },
        { value: "stock_quantity", label: "Cantidad en stock" },
        { value: "price", label: "Precio" },
    ];

    const formatCLP = (value: number) =>
        new Intl.NumberFormat("es-CL", {
            style: "currency",
            currency: "CLP",
            maximumFractionDigits: 0,
        }).format(value);

    const formatStock = (value: string | number) =>
        Math.trunc(Number(value));


    return (

        <Card className="bg-gray-50 w-full overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between flex-wrap gap-4">
                <div className="space-y-1">
                    <CardTitle>Top productos</CardTitle>
                    <CardDescription>
                        Ranking de productos según métrica seleccionada
                    </CardDescription>
                </div>

                <Select value={metric} onValueChange={(value) => setMetric(value as TopProductMetric)}>
                    <SelectTrigger className="w-40">
                        <SelectValue placeholder="Métrica" />
                    </SelectTrigger>
                    <SelectContent>
                        {metricOptions.map((option) => (
                            <SelectItem
                                key={option.value}
                                value={option.value}
                            >
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </CardHeader>

            <CardContent>
                <div className="relative w-full overflow-auto">
                    <Table className="w-full">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="whitespace-nowrap">#</TableHead>
                                <TableHead className="whitespace-nowrap min-w-50">Producto</TableHead>
                                <TableHead className="whitespace-nowrap">Categoría</TableHead>
                                <TableHead className="text-right whitespace-nowrap">
                                    Stock
                                </TableHead>
                                <TableHead className="text-right whitespace-nowrap">
                                    Precio
                                </TableHead>
                                <TableHead className="text-center whitespace-nowrap">
                                    Estado
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {data.products.map((product, index) => (
                                <TableRow key={product.id}>
                                    <TableCell className="font-medium">
                                        {index + 1}
                                    </TableCell>

                                    <TableCell>
                                        <div className="flex flex-col min-w-50">
                                            <span className="truncate max-w-62.5">{product.name}</span>
                                            <span className="text-xs text-muted-foreground">
                                                SKU: {product.sku}
                                            </span>
                                        </div>
                                    </TableCell>

                                    <TableCell className="whitespace-nowrap">
                                        {product.category_name}
                                    </TableCell>

                                    <TableCell className="text-right whitespace-nowrap">
                                        {formatStock(product.total_stock)}{" "}
                                        {product.unit_of_measure}
                                    </TableCell>

                                    <TableCell className="text-right whitespace-nowrap">
                                        {formatCLP(product.price)}
                                    </TableCell>

                                    <TableCell className="text-center">
                                        {product.is_active ? (
                                            <Badge variant="default" className="bg-ui-primary">
                                                Activo
                                            </Badge>
                                        ) : (
                                            <Badge variant="secondary">
                                                Inactivo
                                            </Badge>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>

        // <Card className="bg-gray-50 w-full">
        //     <CardHeader className="flex flex-row items-center justify-between">
        //         <div className="space-y-1">
        //             <CardTitle>Top productos</CardTitle>
        //             <CardDescription>
        //                 Ranking de productos según métrica seleccionada
        //             </CardDescription>
        //         </div>

        //         <Select value={metric} onValueChange={(value) => setMetric(value as TopProductMetric)}>
        //             <SelectTrigger className="w-40">
        //                 <SelectValue placeholder="Métrica" />
        //             </SelectTrigger>
        //             <SelectContent>
        //                 {metricOptions.map((option) => (
        //                     <SelectItem
        //                         key={option.value}
        //                         value={option.value}
        //                     >
        //                         {option.label}
        //                     </SelectItem>
        //                 ))}
        //             </SelectContent>
        //         </Select>
        //     </CardHeader>

        //     <CardContent className="">
        //         <div className="overflow-x-auto">
        //             <Table className="">
        //                 <TableHeader>
        //                     <TableRow>
        //                         <TableHead>#</TableHead>
        //                         <TableHead>Producto</TableHead>
        //                         <TableHead>Categoría</TableHead>
        //                         <TableHead className="text-right">
        //                             Stock
        //                         </TableHead>
        //                         <TableHead className="text-right">
        //                             Precio
        //                         </TableHead>
        //                         <TableHead className="text-center">
        //                             Estado
        //                         </TableHead>
        //                     </TableRow>
        //                 </TableHeader>

        //                 <TableBody>
        //                     {data.products.map((product, index) => (
        //                         <TableRow key={product.id}>
        //                             <TableCell className="font-medium">
        //                                 {index + 1}
        //                             </TableCell>

        //                             <TableCell>
        //                                 <div className="flex flex-col">
        //                                     <span>{product.name}</span>
        //                                     <span className="text-xs text-muted-foreground">
        //                                         SKU: {product.sku}
        //                                     </span>
        //                                 </div>
        //                             </TableCell>

        //                             <TableCell>
        //                                 {product.category_name}
        //                             </TableCell>

        //                             <TableCell className="text-right">
        //                                 {formatStock(product.total_stock)}{" "}
        //                                 {product.unit_of_measure}
        //                             </TableCell>

        //                             <TableCell className="text-right">
        //                                 {formatCLP(product.price)}
        //                             </TableCell>

        //                             <TableCell className="text-center">
        //                                 {product.is_active ? (
        //                                     <Badge variant="default" className="bg-ui-primary">
        //                                         Activo
        //                                     </Badge>
        //                                 ) : (
        //                                     <Badge variant="secondary">
        //                                         Inactivo
        //                                     </Badge>
        //                                 )}
        //                             </TableCell>
        //                         </TableRow>
        //                     ))}
        //                 </TableBody>
        //             </Table>
        //         </div>

        //     </CardContent>
        // </Card>
    );
}
