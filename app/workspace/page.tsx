"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { companyService } from "@/services/companyService"


export default function WorkspaceEntry() {
    const router = useRouter()

    useEffect(() => {
        // TODO: reemplazar por ruta de verificacion evitando el validar por codigo 403
        const verifyCompany = async () => {
            try {
                await companyService.getCompany()
                router.replace("/dashboard")
            } catch (error: any) {
                if (error.response?.status === 403) {
                    router.replace("/onboarding/company")
                } else {
                    // error real
                }
            }
        }

        verifyCompany()
    }, [router])

    return (
        <div className="flex min-h-screen items-center justify-center">
            <span className="material-symbols-outlined animate-spin">
                progress_activity
            </span>
        </div>
    )
}
