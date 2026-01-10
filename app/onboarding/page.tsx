"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { onboardingService } from "@/services/onboardingService";
import { OnboardingContextState, useOnboarding } from "@/contexts/OnboardingContext"
import { cn } from "@/lib/utils";
import { buttonBaseClasses } from "@/lib/ui/input-classes";



type OnboardingStepUI = {
    id: keyof Steps
    title: string
    description: string
    actionLabel: string
    href: string
}

const ONBOARDING_STEPS_UI: OnboardingStepUI[] = [
    {
        id: "create_category",
        title: "Paso 1 – Crear categorías",
        description: "Organiza tus productos creando categorías.",
        actionLabel: "Crear categorías",
        href: "/onboarding/categories",
    },
    {
        id: "create_template",
        title: "Paso 2 – Crear plantillas",
        description: "Define estructuras reutilizables para tus productos.",
        actionLabel: "Crear plantillas",
        href: "/onboarding/templates",
    },
    {
        id: "create_attribute",
        title: "Paso 3 – Crear atributos",
        description: "Agrega atributos a tus plantillas.",
        actionLabel: "Crear atributo",
        href: "/onboarding/attributes/create",
    },
    {
        id: "assign_attribute",
        title: "Paso 4 – Asignar atributos",
        description: "Asigna atributos a tus plantillas.",
        actionLabel: "Asignar atributo",
        href: "/onboarding/attributes/assign"
    },
    {
        id: "create_product",
        title: "Paso 5 – Crear productos",
        description: "Agrega tus primeros productos al sistema.",
        actionLabel: "Crear producto",
        href: "/onboarding/products",
    },
]


export interface Root {
    completed: number
    has_company: boolean
    company_id: string
    steps: Steps
    onboarding_completed: boolean
}

export interface Steps {
    create_category: boolean
    create_template: boolean
    create_attribute: boolean
    assign_attribute: boolean
    create_product: boolean
}


export default function OnboardingPage() {

    const router = useRouter()
    const [onboarding, setOnboarding] = useState<Root | null>(null)


    useEffect(() => {
        const getOnboarding = async () => {
            const data = await onboardingService.getOnboardingStatus()
            setOnboarding(data)
        }

        getOnboarding()
    }, [])

    console.log(onboarding)
    if (!onboarding) return null

    const steps = onboarding
        ? ONBOARDING_STEPS_UI.map(step => ({
            ...step,
            completed: onboarding.steps[step.id],
        }))
        : []

    const activeIndex = steps.findIndex(step => !step.completed)
    const completedCount = steps.filter(s => s.completed).length
    const progress = Math.round((completedCount / steps.length) * 100)


    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border p-8 flex flex-col gap-8">
            {/* Header */}
            <div>
                <h2 className="text-2xl font-bold mb-1">
                    Completa la configuración inicial
                </h2>
                <p className="text-sm text-ui-secondary">
                    Te guiamos paso a paso para dejar tu cuenta lista.
                </p>

                {/* Progress */}
                <div className="mt-4">
                    <div className="flex justify-between text-sm mb-2">
                        <span>Completado {completedCount} de {steps.length}</span>
                        <span>{progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                        <div
                            className="h-2 bg-ui-primary rounded-full transition-all"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Steps */}
            <div className="divide-y">
                {steps.map((step, index) => {
                    const isActive = index === activeIndex

                    return (
                        <div
                            key={step.id}
                            className={clsx(
                                "p-6 flex justify-between items-center",
                                isActive && "bg-blue-50 border-l-4 border-ui-primary"
                            )}
                        >
                            <div>
                                <h3
                                    className={clsx(
                                        "font-medium",
                                        step.completed && "line-through opacity-60",
                                        isActive && "text-ui-primary"
                                    )}
                                >
                                    {step.title}
                                </h3>
                                <p className="text-sm text-ui-secondary">
                                    {step.description}
                                </p>
                            </div>

                            <Button
                                disabled={step.completed || !step.href}
                                onClick={() => step.href && router.push(step.href)}
                                className={cn(buttonBaseClasses, "w-auto")}
                            >
                                {step.completed ? "Completado" : step.actionLabel}
                            </Button>


                            {/* <Button
                                disabled={step.completed}
                                variant={
                                    step.completed
                                        ? "secondary"
                                        : isActive
                                            ? "default"
                                            : "outline"
                                }
                                onClick={() => step.href && router.push(step.href)}
                            >
                                {step.completed ? "Completado" : step.actionLabel}
                            </Button> */}
                        </div>
                    )
                })}
            </div>
        </div>

        // <>
        //     <div className="w-full">
        //         <div className="flex justify-between items-end mb-2 px-1">
        //             <span className="text-ui-main dark:text-white font-medium text-sm">
        //                 Paso 2 de 5
        //             </span>
        //             <span className="text-ui-secondary dark:text-slate-400 text-xs">
        //                 40% completado
        //             </span>
        //         </div>

        //         <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        //             <div
        //                 className="h-full bg-ui-primary rounded-full transition-all duration-500 ease-out w-[40%]"
        //             ></div>
        //         </div>
        //     </div>

        //     <div
        //         className="w-full bg-white dark:bg-slate-800 rounded-xl shadow-lg
        //    border border-slate-100 dark:border-slate-700 overflow-hidden"
        //     >
        //         {/* <!-- Card Header --> */}
        //         <div className="p-8 border-b border-slate-100 dark:border-slate-700">
        //             <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
        //                 <div
        //                     className="shrink-0 size-14 rounded-full bg-blue-50 dark:bg-blue-900/20
        //                flex items-center justify-center text-ui-primary"
        //                 >
        //                     <span className="material-symbols-outlined text-[28px]">
        //                         rocket_launch
        //                     </span>
        //                 </div>

        //                 <div className="flex-1">
        //                     <h2 className="text-2xl font-bold text-ui-main dark:text-white mb-1">
        //                         Completa la configuración inicial
        //                     </h2>
        //                     <p className="text-ui-secondary dark:text-slate-400 text-sm leading-relaxed max-w-xl">
        //                         Te guiamos paso a paso para dejar tu cuenta lista. Puedes completar
        //                         todo ahora o continuar más tarde.
        //                     </p>
        //                 </div>
        //             </div>
        //         </div>

        //         {/* <!-- Steps List --> */}
        //         <div className="divide-y divide-slate-100 dark:divide-slate-700">
        //             {/* <!-- Step 1: Completado --> */}
        //             <div className="p-6 flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
        //                 <div className="flex gap-4 items-start">
        //                     <div
        //                         className="mt-1 shrink-0 size-8 rounded-full bg-green-50 dark:bg-green-900/20
        //                     flex items-center justify-center text-green-600"
        //                     >
        //                         <span className="material-symbols-outlined text-[18px]">check</span>
        //                     </div>

        //                     <div className="opacity-60">
        //                         <h3 className="text-sm font-semibold line-through">
        //                             Paso 1 – Crear categorías
        //                         </h3>
        //                         <p className="text-xs text-ui-secondary">
        //                             Organiza tus productos creando categorías.
        //                         </p>
        //                     </div>
        //                 </div>

        //                 <button
        //                     disabled
        //                     className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700
        //                text-slate-400 text-sm font-medium cursor-default"
        //                 >
        //                     Completado
        //                 </button>
        //             </div>

        //             {/* <!-- Step 2: Completado --> */}
        //             <div className="p-6 flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
        //                 <div className="flex gap-4 items-start">
        //                     <div
        //                         className="mt-1 shrink-0 size-8 rounded-full bg-green-50 dark:bg-green-900/20
        //                    flex items-center justify-center text-green-600"
        //                     >
        //                         <span className="material-symbols-outlined text-[18px]">check</span>
        //                     </div>

        //                     <div className="opacity-60">
        //                         <h3 className="text-sm font-semibold line-through">
        //                             Paso 2 – Crear plantillas
        //                         </h3>
        //                         <p className="text-xs text-ui-secondary">
        //                             Define estructuras reutilizables para tus productos.
        //                         </p>
        //                     </div>
        //                 </div>

        //                 <button
        //                     disabled
        //                     className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700
        //                text-slate-400 text-sm font-medium cursor-default"
        //                 >
        //                     Completado
        //                 </button>
        //             </div>

        //             {/* <!-- Step 3: Activo --> */}
        //             <div
        //                 className="p-6 flex flex-col sm:flex-row gap-4 sm:items-center justify-between
        //            bg-blue-50/40 dark:bg-blue-900/10 border-l-4 border-ui-primary"
        //             >
        //                 <div className="flex gap-4 items-start">
        //                     <div
        //                         className="mt-1 shrink-0 size-8 rounded-full border border-blue-200
        //                    dark:border-blue-800 flex items-center justify-center
        //                    text-ui-primary bg-white dark:bg-slate-800"
        //                     >
        //                         <span className="text-sm font-bold">3</span>
        //                     </div>

        //                     <div>
        //                         <h3 className="text-sm font-bold text-ui-primary">
        //                             Paso 3 – Crear productos
        //                         </h3>
        //                         <p className="text-xs text-ui-secondary dark:text-slate-300">
        //                             Agrega tus primeros productos al sistema.
        //                         </p>
        //                     </div>
        //                 </div>

        //                 <button
        //                     className="px-6 py-2.5 rounded-lg bg-ui-primary hover:bg-ui-primary-dark
        //                text-white text-sm font-bold shadow-md
        //                hover:shadow-lg transition-all flex items-center gap-2"
        //                 >
        //                     Crear producto
        //                     <span className="material-symbols-outlined text-[18px]">
        //                         arrow_forward
        //                     </span>
        //                 </button>
        //             </div>

        //             {/* <!-- Step 4 --> */}
        //             <div className="p-6 flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
        //                 <div className="flex gap-4 items-start opacity-70">
        //                     <div
        //                         className="mt-1 shrink-0 size-8 rounded-full border border-slate-300
        //                    dark:border-slate-600 flex items-center justify-center"
        //                     >
        //                         <span className="text-sm font-medium">4</span>
        //                     </div>

        //                     <div>
        //                         <h3 className="text-sm font-medium">
        //                             Paso 4 – Agregar stock
        //                         </h3>
        //                         <p className="text-xs text-ui-secondary">
        //                             Registra el stock inicial en tu bodega.
        //                         </p>
        //                     </div>
        //                 </div>

        //                 <button
        //                     className="px-4 py-2 rounded-lg bg-white dark:bg-slate-800
        //                border border-slate-200 dark:border-slate-600
        //                text-sm font-medium hover:border-ui-primary
        //                hover:text-ui-primary transition-colors"
        //                 >
        //                     Agregar stock
        //                 </button>
        //             </div>

        //             {/* <!-- Step 5 --> */}
        //             <div className="p-6 flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
        //                 <div className="flex gap-4 items-start opacity-70">
        //                     <div
        //                         className="mt-1 shrink-0 size-8 rounded-full border border-slate-300
        //                    dark:border-slate-600 flex items-center justify-center"
        //                     >
        //                         <span className="text-sm font-medium">5</span>
        //                     </div>

        //                     <div>
        //                         <h3 className="text-sm font-medium">
        //                             Paso 5 – Invitar equipo
        //                         </h3>
        //                         <p className="text-xs text-ui-secondary">
        //                             Invita a otros usuarios a gestionar el inventario contigo.
        //                         </p>
        //                     </div>
        //                 </div>

        //                 <button
        //                     className="px-4 py-2 rounded-lg bg-white dark:bg-slate-800
        //                border border-slate-200 dark:border-slate-600
        //                text-sm font-medium hover:border-ui-primary
        //                hover:text-ui-primary transition-colors"
        //                 >
        //                     Invitar equipo
        //                 </button>
        //             </div>
        //         </div>

        //         {/* <!-- Card Footer --> */}
        //         <div
        //             className="p-6 bg-slate-50 dark:bg-slate-800/50 border-t
        //         border-slate-100 dark:border-slate-700
        //         flex flex-col items-center gap-2 text-center"
        //         >
        //             <button
        //                 className="text-ui-primary hover:text-ui-primary-dark
        //             text-sm font-medium hover:underline transition-colors"
        //             >
        //                 Finalizar onboarding
        //             </button>

        //             <p className="text-xs text-ui-secondary dark:text-slate-500">
        //                 Puedes completar estos pasos más adelante desde el dashboard.
        //             </p>
        //         </div>
        //     </div>

        //     <div className="flex justify-center">
        //         <p
        //             className="text-center text-ui-secondary dark:text-slate-500
        //         text-xs font-medium flex items-center gap-1"
        //         >
        //             <span className="material-symbols-outlined text-[14px]">
        //                 schedule
        //             </span>
        //             Esto solo tomará un par de minutos.
        //         </p>
        //     </div>
        // </>
    )
}