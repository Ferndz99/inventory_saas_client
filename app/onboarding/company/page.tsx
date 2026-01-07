'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreateCompanyFormValues, createCompanySchema } from '@/schemas/onboarding.schema'
import { Button } from '@/components/ui/button'
import { Controller } from 'react-hook-form'


// Elimina todo lo que no sea número o la letra K
export const cleanRut = (value: string) => {
    return value.replace(/[^0-9kK]/g, "");
};

// Aplica el formato 11.111.111-1
export const formatRut = (value: string) => {
    const cleaned = cleanRut(value);
    if (cleaned.length <= 1) return cleaned;

    const dv = cleaned.slice(-1);
    const body = cleaned.slice(0, -1);

    return body.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + "-" + dv;
};

export default function CreateCompanyPage() {
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        control
    } = useForm<CreateCompanyFormValues>({
        resolver: zodResolver(createCompanySchema),
    })

    const onSubmit = async (data: CreateCompanyFormValues) => {
        try {
            // TODO: conectar con tu API real
            // await api.post('/onboarding/company', data)
            console.log("company data:", data)
            // router.push('/onboarding')
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            {/* <div className="flex flex-col gap-2 px-1">
                <div className="flex justify-between items-center">
                    <span className="text-ui-main dark:text-white text-sm font-medium">Paso 1 de 3</span>
                    <span className="text-ui-secondary dark:text-slate-400 text-xs">33% completado</span>
                </div>
                <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-ui-primary w-1/3 rounded-full"></div>
                </div>
            </div> */}

            <div
                className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 p-8 sm:p-10 flex flex-col gap-8">
                <div className="flex flex-col gap-2 text-center sm:text-left">
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
                        <label htmlFor="companyName" className="text-sm font-medium text-ui-main">
                            Nombre de la empresa
                        </label>
                        <input
                            id="companyName"
                            type="text"
                            placeholder="Ej: Test Store"
                            className="w-full h-11 px-4 rounded-lg bg-white border border-gray-200
                        text-ui-main placeholder-gray-400 text-sm
                        focus:outline-none focus:ring-2 focus:ring-ui-primary
                        focus:border-ui-primary transition-all duration-200"
                            {...register("company_name")}
                        />
                        {errors.company_name && (
                            <p className="text-xs text-red-500">{errors.company_name.message}</p>
                        )}
                        <p className="text-text-secondary dark:text-slate-500 text-xs leading-normal">
                            Este será el nombre que verás en el dashboard y en tus documentos.
                        </p>
                    </div>

                    {/* RUT de la empresa */}
                    <div className="space-y-2">
                        <label htmlFor="companyRut" className="text-sm font-medium text-ui-main">
                            RUT de la empresa
                        </label>
                        <div className="relative">
                            <Controller
                                name="company_rut"
                                control={control}
                                defaultValue=""
                                render={({ field: { onChange, value } }) => (
                                    <input
                                        id="companyRut"
                                        type="text"
                                        placeholder="Ej: 11.111.111-2"
                                        className="w-full h-11 px-4 pr-12 rounded-lg bg-white border border-gray-200
                        text-ui-main placeholder-gray-400 text-sm
                        focus:outline-none focus:ring-2 focus:ring-ui-primary
                        focus:border-ui-primary transition-all duration-200"
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
                        <p className="text-ui-secondary dark:text-slate-500 text-xs leading-normal">
                            Ingresa el RUT oficial de la empresa.
                        </p>
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
                        {isSubmitting ? "Creando..." : "Crear empresa"}
                        <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                            arrow_forward
                        </span>
                    </Button>

                    <p className="text-center text-text-secondary dark:text-slate-500 text-xs">
                        Podrás completar el resto de la configuración más adelante.
                    </p>
                </form>
            </div>
            <div className="flex justify-center">
                <p className="text-center text-ui-secondary dark:text-slate-500 text-xs font-medium flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px] align-text-bottom">
                        timer
                    </span>
                    Esto solo tomará un par de minutos.
                </p>
            </div>

        </>
    )
}
