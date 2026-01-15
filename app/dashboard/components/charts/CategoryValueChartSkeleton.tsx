"use client";

import { TrendingUp } from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Skeleton } from "@/components/ui/skeleton";

export function CategoryValueChartSkeleton() {
    return (
        <Card className="bg-gray-50">
            {/* Header */}
            <CardHeader>
                <CardTitle>
                    <Skeleton className="h-5 w-56" />
                </CardTitle>
                <CardDescription>
                    <Skeleton className="mt-2 h-4 w-80" />
                </CardDescription>
            </CardHeader>

            {/* Chart area */}
            <CardContent>
                <div className="space-y-4">
                    {/* Cada fila simula: label + barra */}
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-4"
                        >
                            {/* Category label */}
                            <Skeleton className="h-4 w-28" />

                            {/* Bar */}
                            <Skeleton
                                className="h-6 rounded-md"
                                style={{
                                    width: `${40 + i * 8}%`,
                                }}
                            />
                        </div>
                    ))}
                </div>
            </CardContent>

            {/* Footer */}
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium">
                    <Skeleton className="h-4 w-60" />
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </div>
                <Skeleton className="h-4 w-72" />
            </CardFooter>
        </Card>
    );
}
