// components/CompanyStatsCardSkeleton.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export function CompanyStatsCardSkeleton() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Estadísticas Generales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3 py-2 animate-pulse">
                        <div className="h-8 w-8 bg-gray-200 rounded-lg" />
                        <div className="flex-1 space-y-2">
                            <div className="h-3 bg-gray-200 rounded w-20" />
                            <div className="h-4 bg-gray-200 rounded w-12" />
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}