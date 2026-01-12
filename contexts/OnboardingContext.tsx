"use client"

export type OnboardingTemplate = {
    id: number
    name: string
}

export type OnboardingCategory = {
    id: number
    name: string
}


import { createContext, useContext, useEffect, useState } from "react"

export type OnboardingContextState = {
    template: OnboardingTemplate | null
    category: OnboardingCategory | null

    setTemplate: (template: OnboardingTemplate) => void
    setCategory: (category: OnboardingCategory) => void

    resetOnboarding: () => void
}

const OnboardingContext = createContext<OnboardingContextState | null>(null)

OnboardingContext.displayName = "OnboardingContext";

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
    const [template, setTemplate] = useState<OnboardingTemplate | null>(null)
    const [category, setCategory] = useState<OnboardingCategory | null>(null)

    const resetOnboarding = () => {
        setTemplate(null)
        setCategory(null)
    }

    useEffect(() => {
        if (template) {
            sessionStorage.setItem("onboarding_template", JSON.stringify(template))
        }
    }, [template])

    useEffect(() => {
        if (category) {
            sessionStorage.setItem("onboarding_category", JSON.stringify(category))
        }
    }, [category])

    useEffect(() => {
        const storedTemplate = sessionStorage.getItem("onboarding_template")
        const storedCategory = sessionStorage.getItem("onboarding_category")

        if (storedTemplate) {
            setTemplate(JSON.parse(storedTemplate))
        }

        if (storedCategory) {
            setCategory(JSON.parse(storedCategory))
        }
    }, [])

    return (
        <OnboardingContext.Provider
            value={{
                template,
                category,
                setTemplate,
                setCategory,
                resetOnboarding,
            }}
        >
            {children}
        </OnboardingContext.Provider>
    )
}

export function useOnboarding() {
    const ctx = useContext(OnboardingContext)
    if (!ctx) throw new Error("useOnboarding must be used inside OnboardingProvider")
    return ctx
}
