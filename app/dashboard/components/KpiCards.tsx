import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Package } from "lucide-react";

interface KpiCardProps {
    title: string;
    value: number | string;
    description: string;
    trend?: "up" | "down";
    change?: string;
}





export function KpiCards({
    title,
    value,
    description,
    trend,
    change,
}: KpiCardProps) {
    const TrendIcon = trend === "down" ? TrendingDown : TrendingUp;
    const trendColor =
        trend === "down" ? "text-red-600" : "text-green-600";

    return (
        <Card className="border-gray-200 hover:shadow-md transition-shadow bg-ui-alt">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-ui-secondary">
                    {title}
                </CardTitle>

                <div className="p-2 rounded-md bg-ui-primary">
                    <Package className="h-4 w-4 text-white" />
                </div>
            </CardHeader>

            <CardContent className="space-y-2">
                <div className="text-2xl font-bold text-ui-main">
                    {typeof value === "number"
                        ? value.toLocaleString("es-CL")
                        : value}
                </div>

                <div className="flex items-center justify-between">
                    {trend && change && (
                        <div className={`flex items-center gap-1 ${trendColor}`}>
                            <TrendIcon className="h-4 w-4" />
                            <span className="text-sm font-medium">{change}</span>
                        </div>
                    )}

                    <span className="text-xs text-ui-secondary">
                        {description}
                    </span>
                </div>
            </CardContent>
        </Card>
    );
}


