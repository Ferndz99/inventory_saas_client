interface StatItemProps {
    icon: React.ElementType
    label: string
    value: number | string
    iconColor: string
    iconBg: string
    alert?: boolean
}

function StatItem({ icon: Icon, label, value, iconColor, iconBg, alert }: StatItemProps) {
    return (
        <div className="flex items-center gap-3 py-2">
            <div className={`p-2 rounded-lg ${iconBg} relative`}>
                <Icon className={`h-4 w-4 ${iconColor}`} />
                {alert && (
                    <div className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full animate-pulse" />
                )}
            </div>
            <div className="flex-1">
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="text-sm font-semibold">{value}</p>
            </div>
        </div>
    )
}

export default StatItem