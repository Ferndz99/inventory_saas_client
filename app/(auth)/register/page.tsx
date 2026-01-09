"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { registerSchema, RegisterFormValues } from "@/schemas/auth.schema";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { buttonBaseClasses, inputBaseClasses } from "@/lib/ui/input-classes";
import { Input } from "@/components/ui/input";
import { authService } from "@/services/authService";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function RegisterForm() {

    const router = useRouter()
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
        setFocus,
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
    });

    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async (data: RegisterFormValues) => {
        console.log("Register data:", data);
        try {
            await authService.register(data)
            router.push("/login")
        } catch (err: any) {
            const apiError = err?.response?.data;

            if (!apiError) return;

            // Error general
            if (apiError.detail) {
                setError("root", {
                    type: "server",
                    message: apiError.detail,
                });
            }

            // Errores por campo
            if (Array.isArray(apiError.errors) && apiError.errors.length > 0) {
                const firstErrorField = apiError.errors[0].field;

                apiError.errors.forEach(
                    (error: { field: string; message: string }) => {
                        setError(error.field as keyof RegisterFormValues, {
                            type: "server",
                            message: error.message,
                        });
                    }
                );

                setFocus(firstErrorField as keyof RegisterFormValues);
            }
        }
    };

    return (
        <>
            <div className="flex flex-col items-center text-center gap-5 mb-8 cursor-default">
                {/* Icon Brand */}
                <div
                    className="h-14 w-14 rounded-xl bg-ui-primary/10 flex items-center justify-center text-ui-primary border border-ui-primary/20"
                >
                    <span className="material-symbols-outlined text-[28px]">
                        grid_view
                    </span>
                </div>

                <div className="space-y-1">
                    <h1 className="text-2xl font-bold tracking-tight text-ui-main">
                        Crea tu cuenta
                    </h1>
                    <p className="text-sm text-ui-secondary">
                        Lleva el control de tus ventas y stock desde hoy mismo.
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                {/* Email */}
                <div className="space-y-2">
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
                        className={cn(
                            inputBaseClasses,
                            errors.email &&
                            "border-red-500! focus-visible:ring-red-500! focus-visible:border-red-500!"
                        )}
                        {...register("email")}
                    />

                    {errors.email && (
                        <p className="text-xs text-red-500">
                            {errors.email.message}
                        </p>
                    )}
                </div>


                {/* Password */}
                <div className="space-y-2">
                    <Label
                        htmlFor="password"
                    >
                        Password
                    </Label>

                    <div className="relative">
                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className={cn(inputBaseClasses, errors.password && "border-red-500! focus-visible:ring-red-500! focus-visible:border-red-500!")}
                            {...register("password")}
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword((v) => !v)}
                            className="absolute right-0 top-0 h-full px-3
                text-gray-400 hover:text-gray-600
                transition-colors flex items-center justify-center"
                        >
                            <span className="material-symbols-outlined text-[20px]">
                                {showPassword ? "visibility_off" : "visibility"}
                            </span>
                        </button>
                    </div>

                    {errors.password && (
                        <p className="text-xs text-red-500">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                    <Label
                        htmlFor="re_password"
                    >
                        Confirmar password
                    </Label>

                    <Input
                        id="re_password"
                        type="password"
                        placeholder="••••••••"
                        className={cn(inputBaseClasses, errors.re_password && "border-red-500! focus-visible:ring-red-500! focus-visible:border-red-500!")}
                        {...register("re_password")}
                    />

                    {errors.re_password && (
                        <p className="text-xs text-red-500">
                            {errors.re_password.message}
                        </p>
                    )}
                </div>


                {/* Submit */}
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className={buttonBaseClasses}
                >
                    {isSubmitting ? "Creando cuenta..." : "Crea tu cuenta"}
                </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase cursor-default">
                    <span className="bg-white px-2 text-[#64748b]">
                        o continuar con
                    </span>
                </div>
            </div>

            {/* Social buttons */}
            <div className="grid grid-cols-2 gap-3">
                <Button
                    type="button"
                    className="h-10
            bg-white hover:bg-gray-50 border border-gray-200
            hover:border-gray-300 text-ui-main
            text-sm font-medium transition-all duration-200 cursor-pointer"
                >
                    <img src="/icons/google.svg" alt="Google" className="w-4 h-4" />
                    Google
                </Button>

                <Button
                    type="button"
                    className="h-10
            bg-white hover:bg-gray-50 border border-gray-200
            hover:border-gray-300 text-ui-main
            text-sm font-medium transition-all duration-200 cursor-pointer"
                >
                    <img src="/icons/github.svg" alt="GitHub" className="w-4 h-4" />
                    GitHub
                </Button>
            </div>

            {/* Footer link */}
            <div className="mt-8 text-center">
                <p className="text-sm text-ui-secondary cursor-default">
                    ¿Ya tienes una cuenta?
                    <Link
                        href="/login"
                        className="ml-1 font-medium text-ui-primary hover:text-ui-primary-dark transition-colors"
                    >
                        Inicia sesión
                    </Link>
                </p>
            </div>
        </>
    );
}
