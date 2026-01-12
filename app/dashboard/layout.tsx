"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "./components/DashboardSidebar";
import { useRequireAuth } from "@/contexts/AuthContext";



export default function DashbaordLayout({ children }: { children: React.ReactNode }) {

    const { loading, isReady } = useRequireAuth({ redirectTo: "/login" });

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <p>Cargando...</p>
            </div>
        );
    }

    if (!isReady) {
        return null;
    }

    return (
        <SidebarProvider>

            <DashboardSidebar />

            <main className="flex-1">
                <header className="h-14 flex items-center px-4 border-b">
                    <SidebarTrigger />
                </header>

                <section className="p-6">
                    {children}
                </section>
            </main>
        </SidebarProvider>

    )
}