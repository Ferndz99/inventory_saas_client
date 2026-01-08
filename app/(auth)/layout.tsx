import Link from "next/link";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div
            className="bg-ui-alt text-ui-main font-display min-h-screen flex flex-col relative overflow-x-hidden antialiased
                selection:bg-ui-primary selection:text-white"
        >
            {/* Background decor */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-125
            bg-[radial-gradient(ellipse_at_top,rgba(19,91,236,0.08),rgba(248,249,252,0))]
            opacity-70"
                />
                <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-ui-primary/20 to-transparent" />
            </div>

            {/* Main content */}
            <main className="relative z-10 flex flex-1 flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
                <div className="absolute top-6 left-6">
                    <Link
                        href="/"
                        aria-label="Volver al inicio"
                        className="text-ui-secondary
    hover:text-ui-primary transition-colors"
                    >
                        <span className="material-symbols-outlined text-[20px]">
                            arrow_back
                        </span>
                    </Link>
                </div>

                <div
                    className="w-full max-w-105 bg-white sm:rounded-xl
            shadow-[0_8px_30px_rgb(0,0,0,0.08)]
            border border-gray-100/50 sm:border-gray-200
            flex flex-col p-6 sm:p-8"
                >
                    {/* Header */}
                    {/* <div className="flex flex-col items-center gap-4 mb-8 text-center">
                        <div
                            className="w-12 h-12 rounded-lg bg-ui-primary/10 border border-ui-pr/20
                    flex items-center justify-center text-ui-primary"
                        >
                            <span className="material-symbols-outlined text-[28px]">
                                grid_view
                            </span>
                        </div>

                        <div className="flex flex-col gap-1">
                            <h1 className="text-2xl font-bold tracking-tight">
                                Welcome Back
                            </h1>
                            <p className="text-[#64748b] text-sm">
                                Enter your credentials to access your account.
                            </p>
                        </div>
                    </div> */}

                    {children}
                </div>

                <div className="mt-8 text-center opacity-60 hover:opacity-100 transition-opacity duration-300">
                    <p className="text-xs text-[#64748b]">
                        © 2024 SaaS Dashboard. All rights reserved.
                    </p>
                </div>
            </main>
        </div>
    );
}
