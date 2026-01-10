"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { buttonBaseClasses, inputBaseClasses } from "@/lib/ui/input-classes"
import Link from "next/link"
import { authService } from "@/services/authService"

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            // 🔌 Aquí luego conectas con tu API
            await authService.requestPasswordReset({ email })

            toast.success(
                "Si el correo existe, te enviaremos instrucciones para restablecer tu contraseña."
            )

            setEmail("")
        } catch (error) {
            toast.error("Ocurrió un error. Inténtalo nuevamente.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center">
            <div className="w-full">
                {/* Container */}
                <div className="space-y-6">
                    {/* Header */}
                    <div className="space-y-2">
                        <h1 className="text-2xl font-semibold text-center">
                            ¿Olvidaste tu contraseña?
                        </h1>
                        <p className="text-sm text-muted-foreground text-center">
                            Ingresa tu correo y te enviaremos un enlace para
                            restablecerla.
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={onSubmit} className="space-y-5">
                        {/* Email */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="email"
                            >
                                Email
                            </Label>

                            <Input
                                id="email"
                                type="email"
                                placeholder="correo@ejemplo.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className={cn(inputBaseClasses)}
                            />
                        </div>

                        <Button
                            type="submit"
                            className={cn(buttonBaseClasses)}
                            disabled={loading}
                        >
                            {loading ? "Enviando..." : "Enviar instrucciones"}
                        </Button>
                    </form>
                </div>

                {/* Footer */}
                <p className="text-center text-sm text-muted-foreground mt-6 cursor-default">
                    ¿Recordaste tu contraseña?{" "}
                    <Link
                        href="/login"
                        className="text-sm font-medium text-ui-secondary hover:text-ui-primary transition-colors"
                    >
                        Volver al login
                    </Link>
                </p>
            </div>
        </div>

    )
}
