import Image from "next/image";

function SolutionSection() {
    return (
        <section
            id="solucion"
            className="bg-ui-dark py-20 text-white"
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                    {/* Imagen */}
                    <div className="order-2 lg:order-1">
                        <div className="relative rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur-sm">
                            <div className="relative aspect-video w-full overflow-hidden rounded-xl">
                                <Image
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEntZwZ5sa3ginRfz4CFRQaB79fi1va4CW5xdJ42gOKlSGY6IbB86tMGjJSiPvHsXZCK9KB3dpLjU_nMXaxkXSbtJLZZguwhsDy5QjgAKGOOw2hrEW9sTyw7EZ2Tpm9meUFyxcxdfWRn7O-F2V6ucTE0Q1nhPGDVFpQL9x_t1BL3MRTxyAYXughOK-anhBoKNABgpXgreEKn0evyjlT7nhYFEu_o2rQtIa2MGBhib-F4U8GWY7h_JANE1MOuS2Z4maWHO67pW0ZV0R"
                                    alt="Flujo de datos limpio y dashboards organizados"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </div>
                    </div>

                    {/* Texto */}
                    <div className="order-1 lg:order-2">
                        <div className="mb-6 inline-flex items-center rounded-full border border-ui-primary/30 bg-ui-primary/20 px-3 py-1 text-sm font-medium text-blue-300">
                            La solución inteligente
                        </div>

                        <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
                            Recupera el control y la tranquilidad de tu negocio
                        </h2>

                        <p className="mb-8 text-lg text-gray-400">
                            InventarioCL es la alternativa moderna a Excel. Simple, potente y
                            accesible desde cualquier lugar.
                        </p>

                        <ul className="space-y-6">
                            <li className="flex items-start gap-4">
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ui-primary text-white">
                                    <span className="material-symbols-outlined text-lg">
                                        sync
                                    </span>
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold">
                                        Control en tiempo real
                                    </h4>
                                    <p className="text-sm text-gray-400">
                                        Cada venta o compra actualiza tu stock al instante. Sin
                                        esperas.
                                    </p>
                                </div>
                            </li>

                            <li className="flex items-start gap-4">
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ui-primary text-white">
                                    <span className="material-symbols-outlined text-lg">
                                        notifications_active
                                    </span>
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold">
                                        Alertas de bajo stock
                                    </h4>
                                    <p className="text-sm text-gray-400">
                                        Recibe notificaciones automáticas antes de que te quedes sin
                                        productos.
                                    </p>
                                </div>
                            </li>

                            <li className="flex items-start gap-4">
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ui-primary text-white">
                                    <span className="material-symbols-outlined text-lg">
                                        cloud_done
                                    </span>
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold">
                                        Acceso desde cualquier lugar
                                    </h4>
                                    <p className="text-sm text-gray-400">
                                        Gestiona tu bodega desde la oficina, tu casa o desde tu
                                        celular.
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SolutionSection