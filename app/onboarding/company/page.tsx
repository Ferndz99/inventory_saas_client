'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreateCompanyFormValues, createCompanySchema } from '@/schemas/onboarding.schema'
import { Button } from '@/components/ui/button'
import { Controller } from 'react-hook-form'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { buttonBaseClasses, inputBaseClasses } from '@/lib/ui/input-classes'
import { onboardingService } from '@/services/onboardingService'
import { toast } from 'sonner'
import { formatRut } from '@/lib/rut'


export default function CreateCompanyPage() {
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        control,
        setError,
        setFocus,
    } = useForm<CreateCompanyFormValues>({
        resolver: zodResolver(createCompanySchema),
    })

    const onSubmit = async (data: CreateCompanyFormValues) => {
        try {
            // TODO: probar implementacion con toast.promise para integra mejor las notificaciones
            await onboardingService.createCompany(data)
            console.log("company data:", data)
            toast.success("Empresa creada correctamente", {
                description: "Continuemos con la configuración inicial",
            })
            router.push('/onboarding')
        } catch (error: any) {
            const apiError = error?.response?.data;
            if (!apiError) return;

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
                        setError(error.field as keyof CreateCompanyFormValues, {
                            type: "server",
                            message: error.message,
                        });
                    }
                );

                setFocus(firstErrorField as keyof CreateCompanyFormValues);
            }
        }
    }

    return (
        <>
            <div
                className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 p-8 sm:p-10 flex flex-col gap-8">
                <div className="flex flex-col gap-2 text-center sm:text-left cursor-default">
                    <div
                        className="w-12 h-12 rounded-full bg-blue-50 dark:bg-slate-700 flex items-center justify-center mb-2 self-center sm:self-start">
                        <span className="material-symbols-outlined text-ui-primary text-2xl">storefront</span>
                    </div>
                    <h1 className="text-ui-main dark:text-white text-2xl sm:text-3xl font-bold tracking-tight leading-tight">
                        Crea tu empresa</h1>
                    <p className="text-ui-secondary dark:text-slate-400 text-sm leading-relaxed">
                        Configura tu negocio para empezar a gestionar productos e inventario de forma eficiente.
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                    {/* Nombre de la empresa */}
                    <div className="space-y-2">
                        <Label htmlFor="companyName" className={cn(errors.company_name && "text-red-500")}>
                            Nombre de la empresa
                        </Label>
                        <Input
                            id="companyName"
                            type="text"
                            placeholder="Ej: Test Store"
                            className={cn(inputBaseClasses, errors.company_name && "border-red-500! focus-visible:ring-red-500! focus-visible:border-red-500!")}
                            {...register("company_name")}
                        />
                        {errors.company_name && (
                            <p className="text-xs text-red-500">{errors.company_name.message}</p>
                        )}
                        <p className="text-text-secondary dark:text-slate-500 text-xs leading-normal cursor-default">
                            Este será el nombre que verás en el dashboard y en tus documentos.
                        </p>
                    </div>

                    {/* RUT de la empresa */}
                    <div className="space-y-2">
                        <Label htmlFor="companyRut" className={cn(errors.company_name && "text-red-500")}>
                            RUT de la empresa
                        </Label>
                        <div className="relative">
                            <Controller
                                name="company_rut"
                                control={control}
                                defaultValue=""
                                render={({ field: { onChange, value } }) => (
                                    <Input
                                        id="companyRut"
                                        type="text"
                                        placeholder="Ej: 11.111.111-2"
                                        className={cn(inputBaseClasses, errors.company_rut && "border-red-500! focus-visible:ring-red-500! focus-visible:border-red-500!")}
                                        value={value}
                                        onChange={(e) => {
                                            const formatted = formatRut(e.target.value);
                                            onChange(formatted);
                                        }}
                                    />
                                )}
                            />
                            <div className="absolute right-0 top-0 h-full flex items-center px-3 text-gray-400 pointer-events-none">
                                <span className="material-symbols-outlined text-[20px]">badge</span>
                            </div>
                        </div>
                        {errors.company_rut && (
                            <p className="text-xs text-red-500">{errors.company_rut.message}</p>
                        )}
                        <p className="text-ui-secondary dark:text-slate-500 text-xs leading-normal cursor-default">
                            Ingresa el RUT oficial de la empresa.
                        </p>
                    </div>

                    {/* Submit */}
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className={cn(buttonBaseClasses)}
                    >
                        {isSubmitting ? "Creando..." : "Crear empresa"}
                        <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                            arrow_forward
                        </span>
                    </Button>

                    <p className="text-center text-text-secondary dark:text-slate-500 text-xs cursor-default">
                        Podrás completar el resto de la configuración más adelante.
                    </p>
                </form>
            </div>
            <div className="flex justify-center">
                <p className="text-center text-ui-secondary dark:text-slate-500 text-xs font-medium flex items-center gap-1 cursor-default">
                    <span className="material-symbols-outlined text-[14px] align-text-bottom">
                        timer
                    </span>
                    Esto solo tomará un par de minutos.
                </p>
            </div>

        </>
    )
}
