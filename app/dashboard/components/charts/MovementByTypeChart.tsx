"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { ArrowDown, ArrowLeftRight, ArrowUp } from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart";

interface MovementSummaryResponse {
    total_movements: number;
    total_in: number;
    total_out: number;
    total_transfers: number;
    by_type: Record<string, number>;
}

interface MovementByTypeChartProps {
    summary: MovementSummaryResponse;
}

const chartConfig = {
    value: {
        label: "Movimientos",
        color: "var(--color-ui-primary)",
    },
} satisfies ChartConfig;

export function MovementByTypeChart({
    summary,
}: MovementByTypeChartProps) {
    const chartData = [
        { type: "Entradas", value: summary.by_type.IN },
        { type: "Salidas", value: summary.by_type.OUT },
        { type: "Transferencias", value: summary.by_type.TRANSFER },
    ];

    return (
        <Card className="bg-gray-50">
            <CardHeader>
                <CardTitle>Movimientos de inventario</CardTitle>
                <CardDescription>
                    Distribución por tipo de movimiento
                </CardDescription>
            </CardHeader>

            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart data={chartData}>
                        <CartesianGrid vertical={false} />

                        <XAxis
                            dataKey="type"
                            tickLine={false}
                            axisLine={false}
                        />

                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    formatter={(value) =>
                                        `Movimientos ${Number(value).toLocaleString("es-CL")}`
                                    }
                                />
                            }
                        />


                        <Bar
                            dataKey="value"
                            fill="var(--color-value)"
                            radius={8}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>

            <CardFooter className="flex gap-6 text-sm">
                <span className="flex items-center gap-1">
                    <ArrowUp className="h-4 w-4" /> Entradas
                </span>
                <span className="flex items-center gap-1">
                    <ArrowDown className="h-4 w-4" /> Salidas
                </span>
                <span className="flex items-center gap-1">
                    <ArrowLeftRight className="h-4 w-4" /> Transferencias
                </span>
            </CardFooter>
        </Card>
    );
}
