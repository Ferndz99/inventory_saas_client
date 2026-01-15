import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function KpiCardSkeleton() {
    return (
        <Card className="border-gray-200 bg-ui-alt animate-pulse">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="h-4 w-24 rounded bg-gray-200" />
                <div className="h-8 w-8 rounded bg-gray-200" />
            </CardHeader>

            <CardContent className="space-y-3">
                <div className="h-8 w-32 rounded bg-gray-200" />
                <div className="h-3 w-20 rounded bg-gray-200" />
            </CardContent>
        </Card>
    );
}