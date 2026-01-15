"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { onboardingService } from "@/services/onboardingService";
import { cn } from "@/lib/utils";
import { buttonBaseClasses } from "@/lib/ui/input-classes";
import OnboardingDebug from "./components/OnboardingDebug";


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

            <OnboardingDebug />
        </div>
    )
}