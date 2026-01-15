// src/contexts/AuthContext.tsx
"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { authService } from "@/services/authService";

type User = {
    id: string;
    email: string;
};

type AuthContextType = {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    refetchUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

// Rutas públicas que no requieren autenticación
const PUBLIC_ROUTES = ["/login", "/register", "/forgot-password"];

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [isVerifying, setIsVerifying] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    // Verificar si la ruta actual es pública
    const isPublicRoute = PUBLIC_ROUTES.some(route => pathname?.startsWith(route));

    // Función para verificar y obtener usuario
    const verifyAndFetchUser = useCallback(async () => {
        // Evitar verificaciones simultáneas
        if (isVerifying) return;

        const token = localStorage.getItem("access_token");

        if (!token) {
            setUser(null);
            setLoading(false);
            return;
        }

        setIsVerifying(true);

        try {
            const response = await authService.verifyToken();
            setUser(response.user || { id: response.user_id, email: response.email });
        } catch (error) {
            console.error("Token verification failed:", error);
            localStorage.removeItem("access_token");
            setUser(null);

            // Solo redirigir si estamos en ruta protegida
            if (!isPublicRoute) {
                router.replace("/login");
            }
        } finally {
            setLoading(false);
            setIsVerifying(false);
        }
    }, [isVerifying, isPublicRoute, router]);

    // Verificar sesión al montar y cuando cambie la ruta
    useEffect(() => {
        verifyAndFetchUser();
    }, [pathname]);

    // Función de login
    const login = useCallback(async (email: string, password: string) => {
        try {
            const response = await authService.login({ email, password });
            console.log(response)
            if (response.access) {
                localStorage.setItem("access_token", response.access);
            }

            // Refrescar usuario después del login
            await verifyAndFetchUser();

            // Redirigir a workspace
            router.push("/workspace");
        } catch (error) {
            // Propagar el error para manejarlo en el componente
            throw error;
        }
    }, [verifyAndFetchUser, router]);

    // Función de logout
    const logout = useCallback(async () => {
        try {
            await authService.logout();
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            localStorage.removeItem("access_token");
            setUser(null);
            router.replace("/login");
        }
    }, [router]);

    // Función para refrescar usuario manualmente
    const refetchUser = useCallback(async () => {
        await verifyAndFetchUser();
    }, [verifyAndFetchUser]);

    const value = {
        user,
        isAuthenticated: !!user,
        loading,
        login,
        logout,
        refetchUser,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
};




type UseRequireAuthOptions = {
    redirectTo?: string;
    enabled?: boolean;
};

export function useRequireAuth(options: UseRequireAuthOptions = {}) {
    const { redirectTo = "/login", enabled = true } = options;
    const { isAuthenticated, loading, user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!enabled) return;

        if (!loading && !isAuthenticated) {
            router.replace(redirectTo);
        }
    }, [loading, isAuthenticated, enabled, redirectTo, router]);

    return {
        isAuthenticated,
        loading,
        user,
        isReady: !loading && isAuthenticated,
    };
}

export function useRedirectIfAuthenticated(redirectTo: string = "/workspace") {
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && isAuthenticated) {
            router.replace(redirectTo);
        }
    }, [loading, isAuthenticated, redirectTo, router]);

    return { loading, isAuthenticated };
}
