// app/workspace/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { companyService } from "@/services/companyService";
import { useAuth } from "@/contexts/AuthContext";

export default function WorkspaceEntry() {
    const router = useRouter();
    const { isAuthenticated, loading: authLoading } = useAuth();

    useEffect(() => {
        // Esperar a que termine la verificación de autenticación
        if (authLoading) return;

        // Si no está autenticado, redirigir a login
        if (!isAuthenticated) {
            router.replace("/login");
            return;
        }

        // Verificar si tiene empresa
        const verifyCompany = async () => {
            try {
                await companyService.getCompany();
                // Tiene empresa, redirigir a dashboard
                router.replace("/dashboard");
            } catch (error: any) {
                if (error.response?.status === 403) {
                    // No tiene empresa, redirigir a onboarding
                    router.replace("/onboarding/company");
                } else {
                    console.error("Error checking company:", error);
                    // En caso de error, redirigir a onboarding por defecto
                    router.replace("/onboarding/company");
                }
            }
        };

        verifyCompany();
    }, [authLoading, isAuthenticated, router]);

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <span className="material-symbols-outlined animate-spin text-4xl text-ui-primary">
                    progress_activity
                </span>
                <p className="text-sm text-ui-secondary">
                    {authLoading ? "Verificando sesión..." : "Cargando..."}
                </p>
            </div>
        </div>
    );
}

