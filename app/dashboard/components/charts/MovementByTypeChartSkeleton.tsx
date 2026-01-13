"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Skeleton } from "@/components/ui/skeleton";
import { ArrowDown, ArrowLeftRight, ArrowUp } from "lucide-react";

export function MovementByTypeChartSkeleton() {
    return (
        <Card className="bg-gray-50">
            {/* Header */}
            <CardHeader>
                <CardTitle>
                    <Skeleton className="h-5 w-56" />
                </CardTitle>
                <CardDescription>
                    <Skeleton className="mt-2 h-4 w-72" />
                </CardDescription>
            </CardHeader>

            {/* Chart area */}
            <CardContent>
                <div className="flex h-55 items-end gap-6 px-4">
                    {/* Entradas */}
                    <Skeleton className="h-[70%] w-14 rounded-md" />
                    {/* Salidas */}
                    <Skeleton className="h-[50%] w-14 rounded-md" />
                    {/* Transferencias */}
                    <Skeleton className="h-[30%] w-14 rounded-md" />
                </div>
            </CardContent>

            {/* Footer */}
            <CardFooter className="flex gap-6 text-sm">
                <span className="flex items-center gap-1 text-muted-foreground">
                    <ArrowUp className="h-4 w-4" />
                    <Skeleton className="h-4 w-16" />
                </span>

                <span className="flex items-center gap-1 text-muted-foreground">
                    <ArrowDown className="h-4 w-4" />
                    <Skeleton className="h-4 w-14" />
                </span>

                <span className="flex items-center gap-1 text-muted-foreground">
                    <ArrowLeftRight className="h-4 w-4" />
                    <Skeleton className="h-4 w-20" />
                </span>
            </CardFooter>
        </Card>
    );
}
