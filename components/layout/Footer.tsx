import Link from 'next/link'

function Footer() {
    return (
        <footer className="border-t border-[#e7ebf3] bg-white py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Top */}
                <div className="grid gap-8 md:grid-cols-4 lg:grid-cols-5">
                    {/* Brand */}
                    <div className="col-span-2 lg:col-span-2">
                        <div className="mb-4 flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ui-primary text-white">
                                <span className="material-symbols-outlined text-lg">
                                    inventory_2
                                </span>
                            </div>

                            <span className="text-xl font-bold text-ui-main">
                                InventarioCL
                            </span>
                        </div>

                        <p className="mb-6 max-w-xs text-sm text-ui-secondary">
                            El software de inventario más fácil de usar para pequeñas y
                            medianas empresas en Chile. Ordena tu negocio hoy.
                        </p>

                        <div className="flex gap-4">
                            <a
                                href="#"
                                aria-label="Sitio web"
                                className="text-ui-secondary transition-colors hover:text-primary"
                            >
                                <span className="material-symbols-outlined">public</span>
                            </a>

                            <a
                                href="#"
                                aria-label="Correo"
                                className="text-ui-secondary transition-colors hover:text-primary"
                            >
                                <span className="material-symbols-outlined">mail</span>
                            </a>
                        </div>
                    </div>

                    {/* Producto */}
                    <div>
                        <h4 className="mb-4 font-bold text-ui-main">Producto</h4>
                        <ul className="space-y-2 text-sm text-ui-secondary">
                            <li>
                                <Link href="#funcionalidades" className="hover:text-ui-primary">
                                    Funcionalidades
                                </Link>
                            </li>
                            <li>
                                <Link href="#precios" className="hover:text-ui-primary">
                                    Precios
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-ui-primary">
                                    Actualizaciones
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Soporte */}
                    <div>
                        <h4 className="mb-4 font-bold text-ui-main">Soporte</h4>
                        <ul className="space-y-2 text-sm text-ui-secondary">
                            <li>
                                <Link href="#" className="hover:text-ui-primary">
                                    Centro de Ayuda
                                </Link>
                            </li>
                            <li>
                                <Link href="#contacto" className="hover:text-ui-primary">
                                    Contacto
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-ui-primary">
                                    Estado del servicio
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="mb-4 font-bold text-ui-main">Legal</h4>
                        <ul className="space-y-2 text-sm text-ui-secondary">
                            <li>
                                <Link href="/terminos" className="hover:text-ui-primary">
                                    Términos
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacidad" className="hover:text-ui-primary">
                                    Privacidad
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-12 border-t border-[#e7ebf3] pt-8 text-center text-sm text-ui-secondary">
                    <p>
                        © {new Date().getFullYear()} InventarioCL. Todos los derechos
                        reservados. Hecho con ❤️ en Chile.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer