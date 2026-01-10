"use client"

import { createContext, useContext, useState } from "react"

export type OnboardingContextState = {
    activeTemplateId: number | null
    setActiveTemplateId: (id: number) => void
}

const OnboardingContext = createContext<OnboardingContextState | null>(null)

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
    const [activeTemplateId, setActiveTemplateId] = useState<number | null>(null)

    return (
        <OnboardingContext.Provider value={{ activeTemplateId, setActiveTemplateId }}>
            {children}
        </OnboardingContext.Provider>
    )
}

export function useOnboarding() {
    const ctx = useContext(OnboardingContext)
    if (!ctx) throw new Error("useOnboarding must be used inside OnboardingProvider")
    return ctx
}
