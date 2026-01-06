const industries = [
    "Bodegas",
    "Retail",
    "E-commerce",
    "Ferreterías",
];


function ChileFocusSection() {
    return (
        <section className="relative overflow-hidden bg-linear-to-br from-ui-primary to-ui-primary-dark py-16 text-white">
            {/* Background texture */}
            <div
                aria-hidden
                className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"
            />

            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
                    {/* Text content */}
                    <div className="max-w-2xl">
                        <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                            Pensado para negocios en Chile
                        </h2>

                        <p className="mb-6 text-lg leading-relaxed text-blue-100">
                            Desde Arica a Punta Arenas. Ideal para Pymes, bodegas, tiendas retail y
                            emprendedores que necesitan orden. Hablamos tu idioma y entendemos tu
                            realidad.
                        </p>

                        <div className="flex flex-wrap gap-3">
                            {industries.map((industry) => (
                                <span
                                    key={industry}
                                    className="rounded-lg bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm transition hover:bg-white/20"
                                >
                                    {industry}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Cards column */}
                    <div className="flex w-full max-w-sm flex-col gap-4">
                        {/* Card 1 */}
                        <div className="w-full rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-md shadow-lg transition hover:-translate-y-1 hover:shadow-xl">
                            <div className="flex items-center gap-4">
                                <span className="material-symbols-outlined text-4xl">
                                    verified_user
                                </span>

                                <div>
                                    <p className="text-lg font-bold">Soporte Local</p>
                                    <p className="text-sm text-blue-200">
                                        Ayuda rápida en español
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="w-full rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-md shadow-lg transition hover:-translate-y-1 hover:shadow-xl">
                            <div className="flex items-center gap-4">
                                <span className="material-symbols-outlined text-4xl">
                                    lock
                                </span>

                                <div>
                                    <p className="text-lg font-bold">Datos Seguros</p>
                                    <p className="text-sm text-blue-200">
                                        Información protegida y cifrada
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="w-full rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-md shadow-lg transition hover:-translate-y-1 hover:shadow-xl">
                            <div className="flex items-center gap-4">
                                <span className="material-symbols-outlined text-4xl">
                                    bolt
                                </span>

                                <div>
                                    <p className="text-lg font-bold">Rápido y Simple</p>
                                    <p className="text-sm text-blue-200">
                                        Pensado para Pymes y emprendedores
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* End cards column */}
                </div>
            </div>
        </section>


        // <section className="relative overflow-hidden bg-linear-to-br from-ui-primary to-ui-primary-dark py-16 text-white">
        //     {/* Background texture */}
        //     <div
        //         aria-hidden
        //         className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"
        //     />

        //     <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        //         <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
        //             {/* Text content */}
        //             <div className="max-w-2xl">
        //                 <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
        //                     Pensado para negocios en Chile
        //                 </h2>

        //                 <p className="mb-6 text-lg text-blue-100 leading-relaxed">
        //                     Desde Arica a Punta Arenas. Ideal para Pymes, bodegas, tiendas
        //                     retail y emprendedores que necesitan orden. Hablamos tu idioma y
        //                     entendemos tu realidad.
        //                 </p>

        //                 <div className="flex flex-wrap gap-3">
        //                     {industries.map((industry) => (
        //                         <span
        //                             key={industry}
        //                             className="rounded-lg bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm transition hover:bg-white/20"
        //                         >
        //                             {industry}
        //                         </span>
        //                     ))}
        //                 </div>
        //             </div>

        //             {/* Support card */}
        //             {/* <div className="shrink-0 rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-md shadow-lg w-full md:w-auto">
        //                 <div className="flex items-center gap-4">
        //                     <span className="material-symbols-outlined text-4xl">
        //                         verified_user
        //                     </span>

        //                     <div>
        //                         <p className="text-lg font-bold">Soporte Local</p>
        //                         <p className="text-sm text-blue-200">
        //                             Ayuda rápida en español
        //                         </p>
        //                     </div>
        //                 </div>
        //             </div> */}
        //         </div>
        //     </div>
        // </section>
    )
}

export default ChileFocusSection