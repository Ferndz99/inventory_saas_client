"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function Navbar() {
    const [open, setOpen] = useState(false);
    return (
        <nav className="fixed top-0 z-50 w-full border-b border-[#e7ebf3] bg-white/60 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                {/* Mobile: Menu + Logo */}
                <div className="flex items-center gap-2 md:hidden">
                    <button
                        onClick={() => setOpen(!open)}
                        className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-gray-100"
                        aria-label="Abrir menú"
                    >
                        <span className="material-symbols-outlined text-2xl">menu</span>
                    </button>

                    <div className="flex items-center gap-2 cursor-default">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ui-primary text-white">
                            <span className="material-symbols-outlined">inventory_2</span>
                        </div>
                        <span className="text-lg font-bold tracking-tight text-ui-text-main">
                            InventarioCL
                        </span>
                    </div>
                </div>

                {/* Desktop: Logo */}
                <div className="hidden md:flex items-center gap-2 cursor-default">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ui-primary text-white">
                        <span className="material-symbols-outlined">inventory_2</span>
                    </div>
                    <span className="text-lg font-bold tracking-tight text-ui-text-main">
                        InventarioCL
                    </span>
                </div>

                {/* Desktop: Links */}
                <div className="hidden md:flex items-center gap-8">
                    <Link href="#problema" className="text-sm font-medium text-ui-secondary hover:text-ui-main transition-colors">
                        Problemas
                    </Link>
                    <Link href="#solucion" className="text-sm font-medium text-ui-secondary hover:text-ui-main transition-colors">
                        Solución
                    </Link>
                    <Link href="#funcionalidades" className="text-sm font-medium text-ui-secondary hover:text-ui-main transition-colors">
                        Funcionalidades
                    </Link>
                    <Link href="#como-funciona" className="text-sm font-medium text-ui-secondary hover:text-ui-main transition-colors">
                        Cómo funciona
                    </Link>
                </div>

                {/* Right actions */}
                <div className="flex items-center gap-4">
                    <Link
                        href="#"
                        className="hidden md:block text-sm font-bold text-ui-main hover:text-ui-primary"
                    >
                        Iniciar sesión
                    </Link>

                    <Button className="bg-ui-primary text-sm font-bold text-white hover:bg-ui-primary-dark cursor-pointer">
                        Prueba gratis
                    </Button>
                </div>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="md:hidden border-t border-[#e7ebf3] bg-white">
                    <div className="flex flex-col gap-2 px-4 py-4">
                        <Link
                            href="#problema"
                            onClick={() => setOpen(false)}
                            className="rounded-lg px-3 py-2 text-sm font-medium text-ui-text-main hover:bg-gray-100"
                        >
                            Problemas
                        </Link>
                        <Link
                            href="#solucion"
                            onClick={() => setOpen(false)}
                            className="rounded-lg px-3 py-2 text-sm font-medium text-ui-text-main hover:bg-gray-100"
                        >
                            Solución
                        </Link>
                        <Link
                            href="#funcionalidades"
                            onClick={() => setOpen(false)}
                            className="rounded-lg px-3 py-2 text-sm font-medium text-ui-text-main hover:bg-gray-100"
                        >
                            Funcionalidades
                        </Link>
                        <Link
                            href="#como-funciona"
                            onClick={() => setOpen(false)}
                            className="rounded-lg px-3 py-2 text-sm font-medium text-ui-text-main hover:bg-gray-100"
                        >
                            Cómo funciona
                        </Link>

                        <div className="mt-2 border-t pt-3">
                            <Link
                                href="#"
                                className="block rounded-lg px-3 py-2 text-sm font-bold text-ui-primary hover:bg-blue-50"
                            >
                                Iniciar sesión
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar