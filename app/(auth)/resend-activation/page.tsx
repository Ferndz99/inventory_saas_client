"use client"

import { useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { authService } from "@/services/authService"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { buttonBaseClasses, inputBaseClasses } from "@/lib/ui/input-classes"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

const schema = z.object({
    email: z.email("Ingresa un email válido"),
})

type FormValues = z.infer<typeof schema>

export default function ResendActivationPage() {
    const [loading, setLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(schema),
    })

    const onSubmit = async (data: FormValues) => {
        setLoading(true)

        try {
            await authService.resendActivation(data.email)

            toast.success(
                "Si tu cuenta existe y no está activa, te enviamos un nuevo enlace."
            )
        } catch {
            // ⚠️ Mensaje neutro por seguridad
            toast.success(
                "Si tu cuenta existe y no está activa, te enviamos un nuevo enlace."
            )
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div
                className="
                flex flex-col gap-6 p-6 sm:p-8"
            >
                <div className="flex flex-col gap-2 text-center">
                    <h1 className="text-lg font-semibold text-ui-main">
                        Reenviar enlace de activación
                    </h1>

                    <p className="text-sm text-muted-foreground">
                        Ingresa tu email y te enviaremos un nuevo enlace si tu
                        cuenta aún no está activa.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-4"
                >
                    <div className="flex flex-col gap-1">
                        <Label
                            htmlFor="email"
                            className={cn(errors.email && "text-red-500")}
                        >
                            Email
                        </Label>

                        <Input
                            id="email"
                            type="email"
                            placeholder="name@company.com"
                            {...register("email")}
                            className={cn(inputBaseClasses, errors.email && "border-red-500! focus-visible:ring-red-500! focus-visible:border-red-500!")}
                        />

                        {errors.email && (
                            <p className="text-xs text-red-500">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        className={cn(buttonBaseClasses)}
                    >
                        {loading && (
                            <span className="material-symbols-outlined animate-spin text-[18px]">
                                progress_activity
                            </span>
                        )}
                        Reenviar enlace
                    </Button>
                </form>

                <div className="text-center">
                    <Link
                        href="/login"
                        className="text-sm font-medium text-ui-primary hover:underline"
                    >
                        Volver al login
                    </Link>
                </div>
            </div>
        </>
    )
}
