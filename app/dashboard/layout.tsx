"use client";

import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "./components/DashboardSidebar";
import { useAuth, useRequireAuth } from "@/contexts/AuthContext";



export default function DashbaordLayout({ children }: { children: React.ReactNode }) {

    const { loading, isReady } = useRequireAuth({ redirectTo: "/login" });
    const { user } = useAuth()

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

        <SidebarProvider
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
            }
        >
            <DashboardSidebar />

            <SidebarInset>
                <header className="h-14 flex items-center justify-between px-4 border-b">
                    <SidebarTrigger />
                    <p className="text-sm">
                        Bienvenido <span className="font-semibold">{user?.email}</span>
                    </p>
                </header>

                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                            <div className="px-4 lg:px-6">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>

        // <SidebarProvider style={
        //     {
        //         "--sidebar-width": "calc(var(--spacing) * 72)",
        //         "--header-height": "calc(var(--spacing) * 12)",
        //     } as React.CSSProperties
        // }>
        //     <DashboardSidebar />

        //     <SidebarInset className="">
        //         <header className="h-14 flex items-center justify-between px-4 border-b">
        //             <SidebarTrigger />
        //             <p className="text-sm">
        //                 Bienvenido <span className="font-semibold">{user?.email}</span>
        //             </p>
        //         </header>

        //         <main className="p-6">
        //             {children}
        //         </main>
        //     </SidebarInset>
        // </SidebarProvider>
    )
}