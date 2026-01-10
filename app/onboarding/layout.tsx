import { OnboardingProvider } from "@/contexts/OnboardingContext"

export default function OnboardingLayout({ children }: {
    children: React.ReactNode;
}) {
    return (
        <OnboardingProvider>
            <div className="relative flex h-full min-h-screen w-full flex-col bg-gray-50 dark:bg-ui-dark justify-center items-center overflow-x-hidden p-4">

                <div className="absolute top-8 left-8 hidden md:block">
                    <div className="flex items-center gap-2 cursor-default">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ui-primary text-white">
                            <span className="material-symbols-outlined">inventory_2</span>
                        </div>
                        <span className="text-lg font-bold tracking-tight text-ui-text-main">
                            InventarioCL
                        </span>
                    </div>
                </div>

                <main className="w-full max-w-160 flex flex-col gap-6 animate-fade-in-up mt-0 md:mt-20">
                    {children}
                </main>

            </div>
        </OnboardingProvider>


        //     <div
        //         className="bg-ui-alt text-ui-main font-display min-h-screen flex flex-col relative overflow-x-hidden antialiased
        //   selection:bg-ui-primary selection:text-white"
        //     >
        //         {/* Background decor */}
        //         <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        //             <div
        //                 className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-125
        //       bg-[radial-gradient(ellipse_at_top,rgba(19,91,236,0.08),rgba(248,249,252,0))]
        //       opacity-70"
        //             />
        //             <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-ui-primary/20 to-transparent" />
        //         </div>

        //         {/* Main content */}
        //         <main className="relative z-10 flex flex-1 flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
        //             <div
        //                 className="w-full max-w-120 bg-white sm:rounded-xl
        //       shadow-[0_8px_30px_rgb(0,0,0,0.08)]
        //       border border-gray-100/50 sm:border-gray-200
        //       flex flex-col p-6 sm:p-8"
        //             >
        //                 {children}
        //             </div>

        //             <div className="mt-8 text-center opacity-60 hover:opacity-100 transition-opacity duration-300">
        //                 <p className="text-xs text-[#64748b]">
        //                     © 2024 SaaS Dashboard. All rights reserved.
        //                 </p>
        //             </div>
        //         </main>
        //     </div>
    )
}