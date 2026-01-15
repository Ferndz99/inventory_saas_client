"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

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

interface CategoryAnalysisItem {
    id: number;
    name: string;
    total_products: number;
    total_stock: number;
    total_value: number;
}

interface CategoryBarChartProps {
    categories: CategoryAnalysisItem[];
}

const chartConfig = {
    total_value: {
        label: "Valor inventario",
        color: "var(--color-ui-primary)",
    },
} satisfies ChartConfig;

export function CategoryValueChart({
    categories,
}: CategoryBarChartProps) {
    const formatCLP = (value: number) =>
        new Intl.NumberFormat("es-CL", {
            style: "currency",
            currency: "CLP",
            maximumFractionDigits: 0,
        }).format(value);

    return (
        <Card className="bg-gray-50">
            <CardHeader>
                <CardTitle>Inventario por categoría</CardTitle>
                <CardDescription>
                    Valor total del stock agrupado por categoría
                </CardDescription>
            </CardHeader>

            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart
                        data={categories}
                        layout="vertical"
                        margin={{ left: 0 }}
                    >
                        <CartesianGrid horizontal={false} />

                        <YAxis
                            dataKey="name"
                            type="category"
                            tickLine={false}
                            axisLine={false}
                            width={120}
                        />

                        <XAxis
                            type="number"
                            tickFormatter={(value) => formatCLP(value)}
                        />

                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    formatter={(value) => formatCLP(Number(value))}
                                />
                            }
                        />

                        <Bar
                            dataKey="total_value"
                            fill="var(--color-total_value)"
                            radius={[0, 6, 6, 0]}
                        />
                    </BarChart>

                    {/* <BarChart accessibilityLayer data={categories}>
                        <CartesianGrid vertical={false} />

                        <XAxis
                            dataKey="name"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            interval={0}
                            angle={-35}
                            height={80}
                        />

                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    formatter={(value) =>
                                        formatCLP(Number(value))
                                    }
                                />
                            }
                        />

                        <Bar
                            dataKey="total_value"
                            fill="var(--color-total_value)"
                            radius={8}
                        />
                    </BarChart> */}
                </ChartContainer>
            </CardContent>

            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 leading-none font-medium">
                    Categorías con mayor valor en stock
                    <TrendingUp className="h-4 w-4" />
                </div>
                <div className="text-muted-foreground leading-none">
                    Valores expresados en pesos chilenos (CLP)
                </div>
            </CardFooter>
        </Card>
    );
}
