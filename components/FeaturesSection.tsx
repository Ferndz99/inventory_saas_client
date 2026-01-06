
const features = [
    {
        icon: "category",
        title: "Gestión de Productos",
        description:
            "Organiza por categorías, variantes, precios y códigos de barra. Sube fotos para identificar todo rápido.",
    },
    {
        icon: "swap_vert",
        title: "Entradas y Salidas",
        description:
            "Registra movimientos de forma simple. Ideal para recepciones de proveedores o ajustes de inventario.",
    },
    {
        icon: "bar_chart",
        title: "Reportes Claros",
        description:
            "Visualiza tus productos más vendidos, valoración de inventario y márgenes. Exportable a Excel.",
    },
    {
        icon: "badge",
        title: "Usuarios y Roles",
        description:
            "Da acceso a tu equipo con permisos limitados. Controla quién puede ver costos o editar stock.",
    },
    {
        icon: "qr_code_scanner",
        title: "Escaneo con Celular",
        description:
            "Usa la cámara de tu smartphone para escanear códigos de barra y buscar productos al instante.",
    },
    {
        icon: "history",
        title: "Historial Completo",
        description:
            "Auditoría total. Sabe exactamente quién movió qué producto, cuándo y por qué motivo.",
    },
];


function FeaturesSection() {
    return (
        <section
            id="funcionalidades"
            className="bg-ui-alt py-20"
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-16 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-ui-main sm:text-4xl">
                        Todo lo que necesitas para crecer
                    </h2>
                    <p className="mt-4 text-lg text-text-secondary">
                        Herramientas potentes, simplificadas para el uso diario.
                    </p>
                </div>

                {/* Features grid */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature) => (
                        <div
                            key={feature.title}
                            className="rounded-2xl border border-[#e7ebf3] bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
                        >
                            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-ui-primary">
                                <span className="material-symbols-outlined text-3xl">
                                    {feature.icon}
                                </span>
                            </div>

                            <h3 className="mb-3 text-xl font-bold text-ui-main">
                                {feature.title}
                            </h3>

                            <p className="text-ui-secondary">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default FeaturesSection