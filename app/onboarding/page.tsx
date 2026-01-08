"use client";

import { useState } from "react";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type OnboardingStep = {
    id: string;
    title: string;
    description: string;
    actionLabel: string;
    completed: boolean;
    href?: string
};

const initialSteps: OnboardingStep[] = [
    {
        id: "create_category",
        title: "Paso 1 – Crear categorías",
        description: "Organiza tus productos creando categorías.",
        actionLabel: "Crear categorías",
        completed: false,
        href: "/onboarding/categories"
    },
    {
        id: "create_template",
        title: "Paso 2 – Crear plantillas",
        description: "Define estructuras reutilizables para tus productos.",
        actionLabel: "Crear plantillas",
        completed: false,
        href: "/onboarding/templates"
    },
    {
        id: "create_atribute",
        title: "Paso 4 – Crear atributo",
        description: "Agrega atributos a tus plantillas",
        actionLabel: "Crear atributo",
        completed: false,
    },
    {
        id: "asignar_atributo",
        title: "Paso 5 – Asigna atributos a tus plantillas",
        description: "Agrega atributos a plantillas",
        actionLabel: "Asignar atribut",
        completed: false,
    },
    {
        id: "create_product",
        title: "Paso 6 – Crear productos",
        description: "Agrega tus primeros productos al sistema.",
        actionLabel: "Crear producto",
        completed: false,
    },
];

export default function OnboardingPage() {

    const router = useRouter()

    const [steps, setSteps] = useState<OnboardingStep[]>(initialSteps);

    const activeIndex = steps.findIndex((s) => !s.completed);

    const toggleStep = (index: number) => {
        setSteps((prev) =>
            prev.map((step, i) =>
                i === index ? { ...step, completed: !step.completed } : step
            )
        );
    };

    const completedCount = steps.filter((s) => s.completed).length;
    const progress = Math.round((completedCount / steps.length) * 100);

    return (

        <>
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 p-8 sm:p-10 flex flex-col gap-8">
                {/* Header */}
                <div className="">
                    <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                        <div
                            className="shrink-0 size-14 rounded-full bg-blue-50 dark:bg-blue-900/20
                        flex items-center justify-center text-ui-primary"
                        >
                            <span className="material-symbols-outlined text-[28px]">
                                rocket_launch
                            </span>
                        </div>
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold text-ui-main dark:text-white mb-1">
                                Completa la configuración inicial
                            </h2>
                            <p className="text-ui-secondary dark:text-slate-400 text-sm leading-relaxed max-w-xl">
                                Te guiamos paso a paso para dejar tu cuenta lista. Puedes completar
                                todo ahora o continuar más tarde.
                            </p>
                        </div>
                    </div>

                    {/* Progress */}
                    <div className="mt-6">
                        <div className="flex justify-between text-sm font-medium mb-2">
                            <span>Completado {completedCount} de {steps.length}</span>
                            <span>{progress}% completado</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                                className="bg-ui-primary h-2 rounded-full transition-all"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                </div>


                {/* Steps */}
                <div className="divide-y divide-gray-100 dark:divide-gray-700">
                    {steps.map((step, index) => {
                        const isActive = index === activeIndex;
                        const isCompleted = step.completed;

                        return (
                            <div
                                key={step.id}
                                className={clsx(
                                    "p-6 flex flex-col sm:flex-row gap-4 sm:items-center justify-between transition-colors",
                                    isActive &&
                                    "bg-blue-50/30 dark:bg-blue-900/10 border-l-4 border-ui-primary"
                                )}
                            >
                                <div className="flex gap-4 items-start">
                                    {/* Icon */}
                                    <div
                                        className={clsx(
                                            "mt-1 shrink-0 size-8 flex items-center justify-center rounded-full",
                                            isCompleted &&
                                            "bg-green-50 dark:bg-green-900/20 text-green-500",
                                            !isCompleted &&
                                            isActive &&
                                            "bg-white dark:bg-gray-800 border border-blue-200 dark:border-blue-800 text-ui-primary",
                                            !isCompleted &&
                                            !isActive &&
                                            "border border-gray-300 dark:border-gray-600 text-gray-400"
                                        )}
                                    >
                                        {isCompleted ? (
                                            <span className="material-symbols-outlined text-lg">
                                                check
                                            </span>
                                        ) : (
                                            <span className="text-sm font-bold">{index + 1}</span>
                                        )}
                                    </div>

                                    {/* Text */}
                                    <div>
                                        <h3
                                            className={clsx(
                                                "text-base font-semibold mb-1",
                                                isCompleted &&
                                                "line-through opacity-60 text-ui-main dark:text-white",
                                                isActive && "text-ui-primary",
                                                !isCompleted && !isActive && "text-ui-main dark:text-white"
                                            )}
                                        >
                                            {step.title}
                                        </h3>
                                        <p
                                            className={clsx(
                                                "text-sm",
                                                isCompleted
                                                    ? "opacity-60 text-ui-secondary dark:text-gray-400"
                                                    : "text-ui-secondary dark:text-gray-400"
                                            )}
                                        >
                                            {step.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Action */}
                                <Button
                                    onClick={() => {
                                        if (step.href) {
                                            router.push(step.href)
                                        } else {
                                            toggleStep(index)
                                        }
                                    }}
                                    variant={
                                        isCompleted
                                            ? "secondary"
                                            : isActive
                                                ? "default"
                                                : "outline"
                                    }
                                    disabled={isCompleted}
                                    className={clsx(
                                        "px-5 py-2 text-sm font-medium rounded-lg transition-all",
                                        isCompleted && "text-gray-400 dark:text-gray-500",
                                        isActive &&
                                        "bg-ui-primary hover:bg-ui-primary-dark text-white shadow-md",
                                        !isActive &&
                                        !isCompleted &&
                                        "border-gray-300 dark:border-gray-600 text-ui-main dark:text-gray-300 hover:border-ui-primary"
                                    )}
                                >
                                    {isCompleted ? "Completado" : step.actionLabel}
                                </Button>
                            </div>
                        );
                    })}
                </div>

                {/* Footer */}
                <div className="p-6 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-700 text-center">
                    <button className="text-ui-primary hover:text-ui-primary-dark text-sm font-medium hover:underline">
                        Finalizar onboarding
                    </button>
                    <p className="text-xs text-ui-secondary dark:text-gray-500 mt-2">
                        Puedes completar estos pasos más adelante desde el dashboard.
                    </p>
                </div>
            </div>
        </>

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