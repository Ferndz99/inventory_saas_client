const problems = [
    {
        icon: "warning",
        title: "Errores manuales",
        description:
            "Fórmulas rotas y dedos rápidos pueden costarte millones al año en stock perdido.",
        baseColor: "red",
        borderHover: "hover:border-red-200",
        bgHover: "hover:bg-red-50/30",
        iconBg: "bg-red-100 text-red-600",
    },
    {
        icon: "schedule",
        title: "Falta de control real",
        description:
            "No sabes cuánto tienes realmente en bodega hasta que haces un conteo físico agotador.",
        baseColor: "orange",
        borderHover: "hover:border-orange-200",
        bgHover: "hover:bg-orange-50/30",
        iconBg: "bg-orange-100 text-orange-600",
    },
    {
        icon: "group_off",
        title: "Difícil colaboración",
        description:
            'Archivos bloqueados y versiones conflictivas ("Final_V3_Real.xlsx") confunden al equipo.',
        baseColor: "yellow",
        borderHover: "hover:border-yellow-200",
        bgHover: "hover:bg-yellow-50/30",
        iconBg: "bg-yellow-100 text-yellow-600",
    },
    {
        icon: "folder_off",
        title: "Sin respaldo seguro",
        description:
            "Un fallo en tu computador y podrías perder la historia completa de tu negocio.",
        baseColor: "gray",
        borderHover: "hover:border-gray-300",
        bgHover: "hover:bg-gray-100/50",
        iconBg: "bg-gray-200 text-gray-600",
    },
];

function ProblemSection() {
    return (
        <section id="problema" className="bg-white py-20 cursor-default">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mx-auto mb-16 max-w-3xl text-center">
                    <h2 className="mb-4 text-3xl font-bold tracking-tight text-ui-main sm:text-4xl">
                        ¿Tu inventario es un caos?
                    </h2>
                    <p className="text-lg text-ui-secondary">
                        Las hojas de cálculo no fueron diseñadas para llevar el ritmo de un
                        negocio en crecimiento en Chile.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {problems.map((problem) => (
                        <div
                            key={problem.title}
                            className={`group rounded-xl border border-[#e7ebf3] bg-ui-alt p-6 transition-all hover:shadow-lg ${problem.borderHover} ${problem.bgHover}`}
                        >
                            <div
                                className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg transition-transform group-hover:scale-110 ${problem.iconBg}`}
                            >
                                <span className="material-symbols-outlined">
                                    {problem.icon}
                                </span>
                            </div>

                            <h3 className="mb-2 text-lg font-bold text-ui-main">
                                {problem.title}
                            </h3>

                            <p className="text-sm text-ui-secondary">
                                {problem.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ProblemSection