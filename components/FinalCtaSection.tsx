import { Button } from "./ui/button"

function FinalCtaSection() {
    return (
        <section className="border-t border-[#e7ebf3] bg-background-alt py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-4xl rounded-3xl bg-ui-dark px-6 py-16 text-center text-white shadow-2xl shadow-gray-400/20 sm:px-12">
                    <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                        Empieza hoy a gestionar tu inventario sin Excel
                    </h2>

                    <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-400">
                        Únete a cientos de emprendedores chilenos que ya ordenaron su
                        negocio. Prueba gratis por 14 días.
                    </p>

                    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Button
                            size="lg"
                            className="h-14 min-w-50 rounded-xl bg-ui-primary px-8 text-lg font-bold text-white transition-all hover:scale-105 hover:bg-primary-dark cursor-pointer"
                        >
                            Probar gratis
                        </Button>

                        <p className="mt-2 text-sm text-gray-500 sm:mt-0">
                            Sin compromiso. Cancela cuando quieras.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FinalCtaSection