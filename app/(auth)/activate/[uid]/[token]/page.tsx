"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { authService } from "@/services/authService"
import { toast } from "sonner"

type Status = "loading" | "success" | "error"

export default function ActivateAccountPage() {
    const { uid, token } = useParams<{
        uid: string
        token: string
    }>()
    const router = useRouter()
    const [status, setStatus] = useState<Status>("loading")

    useEffect(() => {
        if (!uid || !token) return

        const activate = async () => {
            try {
                await authService.activate(uid, token)
                toast.success("Cuenta activada correctamente")
                setStatus("success")

                setTimeout(() => {
                    router.push("/login")
                }, 2000)
            } catch {
                toast.error("El enlace de activación es inválido o ya expiró")
                setStatus("error")
            }
        }

        activate()
    }, [uid, token, router])

    return (
        <div className="flex items-center justify-center px-4">
            <div
                className="w-full max-w-105 bg-white sm:rounded-xl
                
                flex flex-col p-6 sm:p-8"
            >
                <div className="flex flex-col items-center gap-4 text-center">
                    {status === "loading" && (
                        <>
                            <span className="material-symbols-outlined animate-spin text-3xl text-ui-primary">
                                progress_activity
                            </span>

                            <h1 className="text-lg font-semibold text-ui-main">
                                Activando cuenta
                            </h1>

                            <p className="text-sm text-muted-foreground">
                                Estamos validando tu información, por favor espera…
                            </p>
                        </>
                    )}

                    {status === "success" && (
                        <>
                            <span className="material-symbols-outlined text-4xl text-green-600">
                                check_circle
                            </span>

                            <h1 className="text-lg font-semibold text-ui-main">
                                Cuenta activada
                            </h1>

                            <p className="text-sm text-muted-foreground">
                                Serás redirigido al login en unos segundos.
                            </p>
                        </>
                    )}

                    {status === "error" && (
                        <>
                            <span className="material-symbols-outlined text-4xl text-red-500">
                                error
                            </span>

                            <h1 className="text-lg font-semibold text-ui-main">
                                No se pudo activar la cuenta
                            </h1>

                            <p className="text-sm text-muted-foreground">
                                El enlace puede haber expirado o ya fue utilizado.
                            </p>

                            <Link
                                href="/resend-activation"
                                className="text-sm font-medium text-ui-primary hover:underline"
                            >
                                Reenviar enlace de activación
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
