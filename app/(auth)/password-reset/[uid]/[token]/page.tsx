"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { buttonBaseClasses, inputBaseClasses } from "@/lib/ui/input-classes"
import { authService } from "@/services/authService"
import { toast } from "sonner"

type ResetPasswordConfirmForm = {
    new_password: string
    re_new_password: string
}

type requestResetPasswordConfirm = {
    uid: string
    token: string
    new_password: string
    re_new_password: string
}

export default function ResetPasswordConfirmPage() {
    const router = useRouter()
    const { uid, token } = useParams<{ uid: string; token: string }>()

    const [showPassword, setShowPassword] = useState(false)
    const [showRepeatPassword, setShowRepeatPassword] = useState(false)

    const {
        register,
        handleSubmit,
        setError,
        setFocus,
        formState: { errors, isSubmitting },
    } = useForm<ResetPasswordConfirmForm>()

    const onSubmit = async (data: ResetPasswordConfirmForm) => {

        // if (data.new_password !== data.re_new_password) {
        //     setRootError("Las contraseñas no coinciden")
        //     return
        // }

        const objRequest: requestResetPasswordConfirm = { ...data, uid, token }

        try {
            console.log(objRequest)
            await authService.confirmPasswordReset(objRequest)
            toast.success("contraseña recuperada")
            router.replace("/login")
        } catch (error: any) {
            const apiError = error?.response?.data;
            if (!apiError) return;
            console.log(apiError)

            if (apiError.detail) {
                setError("root", {
                    type: "server",
                    message: apiError.detail,
                });
            }

            if (Array.isArray(apiError.errors) && apiError.errors.length > 0) {
                const firstErrorField = apiError.errors[0].field;

                apiError.errors.forEach(
                    (error: { field: string; message: string }) => {
                        setError(error.field as keyof ResetPasswordConfirmForm, {
                            type: "server",
                            message: error.message,
                        });
                    }
                );

                setFocus(firstErrorField as keyof ResetPasswordConfirmForm);
            }
            // setRootError(
            //     error?.response?.data?.detail ||
            //     "No se pudo cambiar la contraseña. El enlace puede haber expirado."
            // )
        }
    }

    return (
        <>
            {/* Header */}
            <div className="flex flex-col items-center text-center gap-5 mb-8 cursor-default">
                <div className="h-14 w-14 rounded-xl bg-ui-primary/10 flex items-center justify-center text-ui-primary border border-ui-primary/20">
                    <span className="material-symbols-outlined text-[28px]">
                        lock_reset
                    </span>
                </div>

                <div className="space-y-1">
                    <h1 className="text-2xl font-bold tracking-tight text-ui-main">
                        Restablecer contraseña
                    </h1>
                    <p className="text-sm text-ui-secondary">
                        Ingresa tu nueva contraseña para continuar
                    </p>
                </div>
            </div>

            {/* Root error */}
            {/* {rootError && (
                <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {rootError}
                </div>
            )} */}

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                {/* New password */}
                <div className="space-y-2">
                    <Label
                        htmlFor="new_password"
                        className={cn(errors.new_password && "text-red-500")}
                    >
                        Nueva contraseña
                    </Label>

                    <div className="relative">
                        <Input
                            id="new_password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            {...register("new_password", {
                                required: "La contraseña es obligatoria",
                                minLength: {
                                    value: 8,
                                    message: "Debe tener al menos 8 caracteres",
                                },
                            })}
                            className={cn(
                                inputBaseClasses,
                                errors.new_password &&
                                "border-red-500! focus-visible:ring-red-500! focus-visible:border-red-500!"
                            )}
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(v => !v)}
                            className="absolute right-0 top-0 h-full px-3 flex items-center text-gray-400 hover:text-gray-600"
                        >
                            <span className="material-symbols-outlined text-[20px]">
                                {showPassword ? "visibility_off" : "visibility"}
                            </span>
                        </button>
                    </div>

                    {errors.new_password && (
                        <p className="text-xs text-red-500">
                            {errors.new_password.message}
                        </p>
                    )}
                </div>

                {/* Repeat password */}
                <div className="space-y-2">
                    <Label
                        htmlFor="re_new_password"
                        className={cn(errors.re_new_password && "text-red-500")}
                    >
                        Repetir contraseña
                    </Label>

                    <div className="relative">
                        <Input
                            id="re_new_password"
                            type={showRepeatPassword ? "text" : "password"}
                            placeholder="••••••••"
                            {...register("re_new_password", {
                                required: "Repite la contraseña",
                            })}
                            className={cn(
                                inputBaseClasses,
                                errors.re_new_password &&
                                "border-red-500! focus-visible:ring-red-500! focus-visible:border-red-500!"
                            )}
                        />

                        <button
                            type="button"
                            onClick={() => setShowRepeatPassword(v => !v)}
                            className="absolute right-0 top-0 h-full px-3 flex items-center text-gray-400 hover:text-gray-600"
                        >
                            <span className="material-symbols-outlined text-[20px]">
                                {showRepeatPassword ? "visibility_off" : "visibility"}
                            </span>
                        </button>
                    </div>

                    {errors.re_new_password && (
                        <p className="text-xs text-red-500">
                            {errors.re_new_password.message}
                        </p>
                    )}
                </div>

                {/* Submit */}
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className={buttonBaseClasses}
                >
                    {isSubmitting ? "Guardando..." : "Cambiar contraseña"}
                </Button>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center">
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
        </>
    )
}
