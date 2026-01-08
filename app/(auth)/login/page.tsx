"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas/auth.schema";
import * as z from "zod";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { buttonBaseClasses, inputBaseClasses } from "@/lib/ui/input-classes";


type LoginFormValues = z.infer<typeof loginSchema>;



export default function LoginPage() {

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });

    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async (data: LoginFormValues) => {
        console.log("Login data:", data);
    };

    return (
        <>
            {/* Header */}
            <div className="flex flex-col items-center text-center gap-5 mb-8 cursor-default">
                <div className="h-14 w-14 rounded-xl bg-ui-primary/10 flex items-center justify-center text-ui-primary border border-ui-primary/20">
                    <span className="material-symbols-outlined text-[28px]">
                        grid_view
                    </span>
                </div>

                <div className="space-y-1">
                    <h1 className="text-2xl font-bold tracking-tight text-ui-main">
                        Ingresa a tu cuenta
                    </h1>
                    <p className="text-sm text-ui-secondary">
                        Ingrese sus credenciales para acceder a su cuenta
                    </p>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                {/* Email */}
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="name@company.com"
                        {...register("email")}
                        className={inputBaseClasses}
                    />
                    {errors.email && (
                        <p className="text-xs text-red-500">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                {/* Password */}
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>

                    <div className="relative">
                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            {...register("password")}
                            className={inputBaseClasses}
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword((v) => !v)}
                            className="absolute right-0 top-0 h-full px-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
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

                    <div className="flex justify-end pt-1">
                        <Link
                            href="#"
                            className="text-xs font-medium text-ui-secondary hover:text-ui-primary transition-colors"
                        >
                            ¿Olvidaste tu contraseña?
                        </Link>
                    </div>
                </div>

                {/* Submit */}
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className={buttonBaseClasses}
                >
                    {isSubmitting ? "Ingresando..." : "Iniciar sesión"}
                </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase cursor-default">
                    <span className="bg-white px-2 text-ui-secondary">
                        o continuar con
                    </span>
                </div>
            </div>

            {/* Social login */}
            <div className="grid grid-cols-2 gap-3">
                <Button
                    type="button"
                    variant="outline"
                    className="h-10 gap-2"
                >
                    <img src="/icons/google.svg" alt="Google" className="w-4 h-4" />
                    Google
                </Button>

                <Button
                    type="button"
                    variant="outline"
                    className="h-10 gap-2"
                >
                    <img src="/icons/github.svg" alt="GitHub" className="w-4 h-4" />
                    GitHub
                </Button>
            </div>

            {/* Register */}
            <div className="mt-8 text-center">
                <p className="text-sm text-ui-secondary cursor-default">
                    ¿No tienes una cuenta?
                    <Link
                        href="/register"
                        className="ml-1 font-medium text-ui-primary hover:text-ui-primary-dark transition-colors"
                    >
                        Regístrate
                    </Link>
                </p>
            </div>
        </>



        // <>
        //     <div className="w-full max-w-md mx-auto">
        //         <Card className="border-slate-200/60 dark:border-slate-800 shadow-lg">
        //             <CardContent className="p-8 sm:px-10 sm:py-10 flex flex-col gap-8">
        //                 {/* Header */}
        //                 <div className="flex flex-col items-center text-center gap-4">
        //                     <div
        //                         className="w-12 h-12 rounded-lg
        //             bg-ui-primary/10 border border-ui-primary/20
        //             flex items-center justify-center text-ui-primary"
        //                     >
        //                         <span className="material-symbols-outlined text-[28px]">
        //                             grid_view
        //                         </span>
        //                     </div>

        //                     <div className="space-y-1">
        //                         <h1 className="text-2xl font-bold tracking-tight text-ui-main dark:text-white">
        //                             Welcome Back
        //                         </h1>
        //                         <p className="text-sm text-ui-secondary dark:text-slate-400">
        //                             Enter your credentials to access your account.
        //                         </p>
        //                     </div>
        //                 </div>

        //                 {/* Form */}
        //                 <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        //                     {/* Email */}
        //                     <div className="space-y-2">
        //                         <Label htmlFor="email">Email</Label>

        //                         <Input
        //                             id="email"
        //                             type="email"
        //                             placeholder="name@company.com"
        //                             {...register("email")}
        //                             className={cn(
        //                                 "h-11 px-4 rounded-lg",
        //                                 "bg-white! dark:bg-ui-dark!",
        //                                 "border-gray-200! dark:border-gray-700!",
        //                                 "text-ui-main! dark:text-white!",
        //                                 "placeholder:text-gray-400! dark:placeholder:text-slate-500!",
        //                                 "focus:border-ui-primary! focus:ring-2! focus:ring-ui-primary!"
        //                             )}
        //                         />

        //                         {errors.email && (
        //                             <p className="text-xs text-red-500">
        //                                 {errors.email.message}
        //                             </p>
        //                         )}
        //                     </div>

        //                     {/* Password */}
        //                     <div className="space-y-2">
        //                         <Label htmlFor="password">Password</Label>

        //                         <div className="relative">
        //                             <Input
        //                                 id="password"
        //                                 type={showPassword ? "text" : "password"}
        //                                 placeholder="••••••••"
        //                                 {...register("password")}
        //                                 className={cn(
        //                                     "h-11 px-4 pr-12 rounded-lg",
        //                                     "bg-white! dark:bg-ui-dark!",
        //                                     "border-gray-200! dark:border-gray-700!",
        //                                     "text-ui-main! dark:text-white!",
        //                                     "placeholder:text-gray-400! dark:placeholder:text-slate-500!",
        //                                     "focus:border-ui-primary! focus:ring-2! focus:ring-ui-primary!"
        //                                 )}
        //                             />

        //                             <button
        //                                 type="button"
        //                                 onClick={() => setShowPassword((v) => !v)}
        //                                 className="absolute right-0 top-0 h-full px-3
        //                     text-gray-400 hover:text-gray-600
        //                     dark:hover:text-slate-300
        //                     transition-colors flex items-center justify-center"
        //                             >
        //                                 <span className="material-symbols-outlined text-[20px]">
        //                                     {showPassword ? "visibility_off" : "visibility"}
        //                                 </span>
        //                             </button>
        //                         </div>

        //                         {errors.password && (
        //                             <p className="text-xs text-red-500">
        //                                 {errors.password.message}
        //                             </p>
        //                         )}

        //                         <div className="flex justify-end pt-1">
        //                             <a
        //                                 href="#"
        //                                 className="text-xs font-medium text-ui-secondary
        //                     hover:text-ui-primary transition-colors"
        //                             >
        //                                 ¿Olvidaste tu contraseña?
        //                             </a>
        //                         </div>
        //                     </div>

        //                     {/* Submit */}
        //                     <Button
        //                         type="submit"
        //                         disabled={isSubmitting}
        //                         className="w-full h-11 bg-ui-primary hover:bg-ui-primary-dark
        //             active:bg-[#0c3ca3] disabled:opacity-60
        //             text-white text-sm font-bold rounded-lg
        //             transition-all duration-200
        //             shadow-[0_4px_14px_rgba(19,91,236,0.25)]
        //             hover:shadow-[0_6px_20px_rgba(19,91,236,0.35)]
        //             flex items-center justify-center gap-2 mt-1"
        //                     >
        //                         {isSubmitting ? "Ingresando..." : "Iniciar sesión"}
        //                     </Button>
        //                 </form>

        //                 {/* Divider */}
        //                 <div className="relative">
        //                     <div className="absolute inset-0 flex items-center">
        //                         <div className="w-full border-t border-gray-200 dark:border-slate-700" />
        //                     </div>
        //                     <div className="relative flex justify-center text-xs uppercase">
        //                         <span className="bg-white dark:bg-ui-dark px-2 text-ui-secondary">
        //                             o continuar con
        //                         </span>
        //                     </div>
        //                 </div>

        //                 {/* Social login */}
        //                 <div className="grid grid-cols-2 gap-3">
        //                     <Button
        //                         type="button"
        //                         variant="outline"
        //                         className="h-10 flex items-center gap-2"
        //                     >
        //                         <img src="/icons/google.svg" alt="Google" className="w-4 h-4" />
        //                         Google
        //                     </Button>

        //                     <Button
        //                         type="button"
        //                         variant="outline"
        //                         className="h-10 flex items-center gap-2"
        //                     >
        //                         <img src="/icons/github.svg" alt="GitHub" className="w-4 h-4" />
        //                         GitHub
        //                     </Button>
        //                 </div>

        //                 {/* Register */}
        //                 <div className="text-center pt-2">
        //                     <p className="text-sm text-ui-secondary">
        //                         ¿No tienes una cuenta?
        //                         <Link
        //                             href="/register"
        //                             className="font-medium text-ui-primary
        //                 hover:text-ui-primary-dark transition-colors ml-1"
        //                         >
        //                             Regístrate
        //                         </Link>
        //                     </p>
        //                 </div>
        //             </CardContent>
        //         </Card>
        //     </div>

        // </>

        // <>
        //     <div className="flex flex-col items-center gap-4 mb-8 text-center">
        //         <div
        //             className="w-12 h-12 rounded-lg bg-ui-primary/10 border border-ui-pr/20
        //             flex items-center justify-center text-ui-primary"
        //         >
        //             <span className="material-symbols-outlined text-[28px]">
        //                 grid_view
        //             </span>
        //         </div>

        //         <div className="flex flex-col gap-1">
        //             <h1 className="text-2xl font-bold tracking-tight">
        //                 Welcome Back
        //             </h1>
        //             <p className="text-[#64748b] text-sm">
        //                 Enter your credentials to access your account.
        //             </p>
        //         </div>
        //     </div>
        //     <form
        //         onSubmit={handleSubmit(onSubmit)}
        //         className="flex flex-col gap-5"
        //     >
        //         {/* Email */}
        //         <div className="space-y-2">
        //             <label
        //                 htmlFor="email"
        //                 className="text-sm font-medium text-ui-main"
        //             >
        //                 Email
        //             </label>

        //             <input
        //                 id="email"
        //                 type="email"
        //                 placeholder="name@company.com"
        //                 className="w-full h-11 px-4 rounded-lg bg-white border border-gray-200
        //                         text-ui-main placeholder-gray-400 text-sm
        //                         focus:outline-none focus:ring-2 focus:ring-ui-primary
        //                         focus:border-ui-primary transition-all duration-200"
        //                 {...register("email")}
        //             />

        //             {errors.email && (
        //                 <p className="text-xs text-red-500">
        //                     {errors.email.message}
        //                 </p>
        //             )}
        //         </div>

        //         {/* Password */}
        //         <div className="space-y-2">
        //             <label
        //                 htmlFor="password"
        //                 className="text-sm font-medium text-ui-main"
        //             >
        //                 Password
        //             </label>

        //             <div className="relative">
        //                 <input
        //                     id="password"
        //                     type={showPassword ? "text" : "password"}
        //                     placeholder="••••••••"
        //                     className="w-full h-11 px-4 pr-12 rounded-lg bg-white
        //         border border-gray-200 text-ui-main
        //         placeholder-gray-400 text-sm
        //         focus:outline-none focus:ring-2 focus:ring-ui-primary
        //         focus:border-ui-primary transition-all duration-200"
        //                     {...register("password")}
        //                 />

        //                 <button
        //                     type="button"
        //                     onClick={() => setShowPassword((v) => !v)}
        //                     className="absolute right-0 top-0 h-full px-3
        //         text-gray-400 hover:text-gray-600
        //         transition-colors flex items-center justify-center"
        //                 >
        //                     <span className="material-symbols-outlined text-[20px]">
        //                         {showPassword ? "visibility_off" : "visibility"}
        //                     </span>
        //                 </button>
        //             </div>

        //             {errors.password && (
        //                 <p className="text-xs text-red-500">
        //                     {errors.password.message}
        //                 </p>
        //             )}

        //             <div className="flex justify-end pt-1">
        //                 <a
        //                     href="#"
        //                     className="text-xs font-medium text-ui-secondary
        //         hover:text-ui-primary transition-colors"
        //                 >
        //                     ¿Olvidaste tu contraseña?
        //                 </a>
        //             </div>
        //         </div>

        //         {/* Submit */}
        //         <Button
        //             type="submit"
        //             disabled={isSubmitting}
        //             className="w-full h-11 bg-ui-primary hover:bg-ui-primary-dark
        //     active:bg-[#0c3ca3] disabled:opacity-60
        //     text-white text-sm font-bold rounded-lg
        //     transition-all duration-200
        //     shadow-[0_4px_14px_rgba(19,91,236,0.25)]
        //     hover:shadow-[0_6px_20px_rgba(19,91,236,0.35)]
        //     flex items-center justify-center gap-2 mt-1 cursor-pointer"
        //         >
        //             {isSubmitting ? "Ingresando..." : "Iniciar sesión"}
        //         </Button>
        //     </form>

        //     {/* Divider */}
        //     <div className="relative my-6">
        //         <div className="absolute inset-0 flex items-center">
        //             <div className="w-full border-t border-gray-200" />
        //         </div>
        //         <div className="relative flex justify-center text-xs uppercase">
        //             <span className="bg-white px-2 text-[#64748b]">
        //                 o continuar con
        //             </span>
        //         </div>
        //     </div>

        //     {/* Social login */}
        //     <div className="grid grid-cols-2 gap-3">
        //         <Button
        //             type="button"
        //             className="h-10
        //     bg-white hover:bg-gray-50 border border-gray-200
        //     hover:border-gray-300 text-ui-main
        //     text-sm font-medium transition-all duration-200 cursor-pointer"
        //         >
        //             <img src="/icons/google.svg" alt="Google" className="w-4 h-4" />
        //             Google
        //         </Button>

        //         <Button
        //             type="button"
        //             className="h-10
        //     bg-white hover:bg-gray-50 border border-gray-200
        //     hover:border-gray-300 text-ui-main
        //     text-sm font-medium transition-all duration-200 cursor-pointer"
        //         >
        //             <img src="/icons/github.svg" alt="GitHub" className="w-4 h-4" />
        //             GitHub
        //         </Button>
        //     </div>

        //     {/* Register link */}
        //     <div className="mt-8 text-center">
        //         <p className="text-sm text-[#64748b]">
        //             ¿No tienes una cuenta?
        //             <Link
        //                 href="/register"
        //                 className="font-medium text-ui-primary
        //                 hover:text-ui-primary-dark transition-colors ml-1"
        //             >
        //                 Regístrate
        //             </Link>
        //         </p>
        //     </div>
        // </>
    );
}
