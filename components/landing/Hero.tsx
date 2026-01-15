import Image from "next/image";
import { Button } from "../ui/button";

function Hero() {
    return (
        <section className="relative overflow-hidden bg-ui-alt pt-32 pb-20 lg:pt-40 lg:pb-28">
            {/* Background pattern */}
            <div className="absolute inset-0 z-0 opacity-30 bg-[radial-gradient(#cfd7e7_1px,transparent_1px)] bg-size-[16px_16px]" />

            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                    {/* LEFT */}
                    <div className="max-w-2xl">
                        {/* Badge */}
                        <div className="mb-6 inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-ui-primary cursor-default">
                            <span className="mr-2 h-2 w-2 rounded-full bg-ui-primary" />
                            Nuevo: Reportes automáticos SII
                        </div>

                        {/* Title */}
                        <h1 className="mb-6 text-4xl font-black leading-tight tracking-tight text-text-main sm:text-5xl lg:text-6xl cursor-default">
                            Deja Excel y controla tu inventario de forma{" "}
                            <span className="text-ui-primary">profesional</span>
                        </h1>

                        {/* Description */}
                        <p className="mb-8 text-lg leading-relaxed text-ui-secondary cursor-default">
                            Gestiona productos, stock y movimientos en tiempo real desde una sola plataforma.
                            Diseñada específicamente para Pymes y negocios en Chile.
                        </p>

                        {/* Actions */}
                        <div className="flex flex-col gap-4 sm:flex-row">
                            <Button size="lg" className="shadow-lg shadow-blue-500/30 bg-ui-primary hover:bg-ui-primary-dark transition-colors cursor-pointer">
                                Comenzar prueba gratuita
                            </Button>

                            <Button
                                size="lg"
                                variant="outline"
                                className="flex items-center gap-2 cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-xl">
                                    play_circle
                                </span>
                                Ver demo
                            </Button>
                        </div>

                        {/* Social proof */}
                        <div className="mt-8 flex items-center gap-4 text-sm text-ui-secondary cursor-default">
                            <div className="flex -space-x-2">
                                {[
                                    "/images/avatars/avatar1.jpg",
                                    "/images/avatars/avatar2.jpg",
                                    "/images/avatars/avatar3.jpg",
                                ].map((src, index) => (
                                    <div
                                        key={index}
                                        className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-white"
                                    >
                                        <Image
                                            src={src}
                                            alt={`User avatar ${index + 1}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                            <p>Más de 500 Pymes confían en nosotros</p>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="relative">
                        <div className="relative rotate-1 rounded-2xl border border-gray-100 bg-white p-2 shadow-2xl shadow-blue-900/10 transition-transform duration-500 hover:rotate-0">
                            <div className="absolute -top-10 -right-10 h-20 w-20 rounded-full bg-yellow-400 opacity-20 blur-2xl" />

                            <div className="relative aspect-4/3 overflow-hidden rounded-xl bg-gray-50">
                                <Image
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrnyTlzhGEVLCJM1ML-d-_L1sTTEs09pI2jRAgNX7kAoDQ6lyJJueL4uwfjlaz_QbxrLHXIbwlegDbVx3Kf9qg4WbDW4zSzI5GTq70EazKs7krzVfF2dRfLbDrEklYJn4bAnI32aVkvsbSTvxBLrwUuxetxmdx9b_nl7g1dXg_XmhDf1x3CgkHpGzd3YcBRHuvEymBEGTY-4v7Ne1l6N3WvGqnF9K6ra5EoadZtCN1nZJyQdnQz9lGp5wscMPz1iIMe2qL-19xmogx"
                                    alt="Dashboard de inventario"
                                    fill
                                    className="object-cover object-top"
                                    priority
                                />
                            </div>

                            {/* Floating card */}
                            <div
                                className="absolute -left-6 bottom-12 hidden items-center gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-xl md:flex animate-bounce"
                                style={{ animationDuration: "3s" }}
                            >
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                                    <span className="material-symbols-outlined">
                                        check_circle
                                    </span>
                                </div>
                                <div>
                                    <p className="text-xs text-text-secondary">Stock actualizado</p>
                                    <p className="text-sm font-bold text-text-main">
                                        Hace 2 min
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero