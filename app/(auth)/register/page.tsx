"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { registerSchema, RegisterFormValues } from "@/schemas/auth.schema";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function RegisterForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
    });

    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async (data: RegisterFormValues) => {
        console.log("Register data:", data);
    };

    return (
        <>
            <div className="flex flex-col items-center text-center mb-8">
                {/* Icon Brand */}
                <div
                    className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-ui-primary mb-5 shadow-glow"
                >
                    <span className="material-symbols-outlined text-[26px]">
                        grid_view
                    </span>
                </div>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
                    Crear cuenta
                </h2>

                <p className="text-slate-500 dark:text-slate-400 text-[15px] leading-relaxed">
                    Regístrate para comenzar a usar la plataforma
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Email */}
                <div className="space-y-2">
                    <label
                        htmlFor="email"
                        className="text-sm font-medium text-ui-main"
                    >
                        Email
                    </label>

                    <input
                        id="email"
                        type="email"
                        placeholder="name@company.com"
                        className="w-full h-11 px-4 rounded-lg bg-white border border-gray-200
                                text-ui-main placeholder-gray-400 text-sm
                                focus:outline-none focus:ring-2 focus:ring-ui-primary
                                focus:border-ui-primary transition-all duration-200"
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
                    <label
                        htmlFor="password"
                        className="text-sm font-medium text-ui-main"
                    >
                        Password
                    </label>

                    <div className="relative">
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="w-full h-11 px-4 pr-12 rounded-lg  text-ui-main border bg-white border-gray-200
                placeholder-gray-400 text-sm
                focus:outline-none focus:ring-2 focus:ring-ui-primary
                focus:border-ui-primary transition-all duration-200"
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
                    <label
                        htmlFor="re_password"
                        className="text-sm font-medium text-ui-main"
                    >
                        Confirmar password
                    </label>

                    <input
                        id="re_password"
                        type="password"
                        placeholder="••••••••"
                        className="w-full h-11 px-4 rounded-lg bg-white border border-gray-200
                        text-ui-main placeholder-gray-400 text-sm
                            focus:outline-none focus:ring-2 focus:ring-ui-primary
                            focus:border-ui-primary transition-all duration-200"
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
                    className="w-full h-11 bg-ui-primary hover:bg-ui-primary-dark
            active:bg-[#0c3ca3] disabled:opacity-60
            text-white text-sm font-bold rounded-lg
            transition-all duration-200
            shadow-[0_4px_14px_rgba(19,91,236,0.25)]
            hover:shadow-[0_6px_20px_rgba(19,91,236,0.35)]
            flex items-center justify-center gap-2 mt-1 cursor-pointer"
                >
                    {isSubmitting ? "Ingresando..." : "Iniciar sesión"}
                </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
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
                <p className="text-sm text-[#64748b]">
                    ¿No tienes una cuenta?
                    <Link
                        href="/login"
                        className="font-medium text-ui-primary
                        hover:text-ui-primary-dark transition-colors ml-1"
                    >
                        Inicia sesión
                    </Link>
                </p>
            </div>
        </>
    );
}
