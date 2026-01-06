
function HowItWorks() {
    return (
        <section className="bg-white py-20" id="como-funciona">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-16 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-ui-main sm:text-4xl">
                        Empieza en minutos, no en meses
                    </h2>
                    <p className="mt-4 text-lg text-ui-secondary">
                        Sin instalaciones complicadas. Todo funciona desde tu navegador.
                    </p>
                </div>

                <div className="relative">
                    {/* Connecting Line (Desktop only) */}
                    <div
                        aria-hidden
                        className="absolute top-12 left-0 hidden h-1 w-full bg-linear-to-r from-transparent via-blue-100 to-transparent lg:block"
                    />

                    <div className="grid gap-8 lg:grid-cols-3">
                        {/* Step 1 */}
                        <div className="relative flex flex-col items-center text-center">
                            <div className="z-10 mb-6 flex h-24 w-24 items-center justify-center rounded-full border-4 border-blue-50 bg-white shadow-sm">
                                <span className="text-4xl font-black text-ui-primary">1</span>
                            </div>

                            <h3 className="mb-2 text-xl font-bold text-ui-main">
                                Crea tu cuenta
                            </h3>

                            <p className="max-w-xs text-ui-secondary">
                                Regístrate con tu correo. No necesitas tarjeta de crédito para
                                probar.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="relative flex flex-col items-center text-center">
                            <div className="z-10 mb-6 flex h-24 w-24 items-center justify-center rounded-full border-4 border-blue-50 bg-white shadow-sm">
                                <span className="text-4xl font-black text-ui-primary">2</span>
                            </div>

                            <h3 className="mb-2 text-xl font-bold text-ui-main">
                                Carga tus productos
                            </h3>

                            <p className="max-w-xs text-ui-secondary">
                                Súbelos uno a uno o importa tu lista actual de Excel masivamente.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="relative flex flex-col items-center text-center">
                            <div className="z-10 mb-6 flex h-24 w-24 items-center justify-center rounded-full border-4 border-blue-50 bg-white shadow-sm">
                                <span className="text-4xl font-black text-ui-primary">3</span>
                            </div>

                            <h3 className="mb-2 text-xl font-bold text-ui-main">
                                Toma el control
                            </h3>

                            <p className="max-w-xs text-ui-secondary">
                                Empieza a registrar movimientos y ver reportes al instante.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default HowItWorks