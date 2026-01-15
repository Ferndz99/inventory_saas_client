"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";



import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { AssignAttributeFormValues, assignAttributeSchema } from "@/schemas/onboarding.schema";
import { onboardingService } from "@/services/onboardingService";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function AssignAttributeForm() {

    const { template } = useOnboarding()
    const router = useRouter()
    const [customAttributes, setCustomAttributes] = useState<any[]>([])
    const [globalAttributes, setGlobalAttributes] = useState<any[]>([])
    const [loadingAttributes, setLoadingAttributes] = useState(true)

    useEffect(() => {
        const loadAttributes = async () => {
            try {
                const [custom, global] = await Promise.all([
                    onboardingService.getCustomAttributes(),
                    onboardingService.getGlobalAttributes(),
                ])

                setCustomAttributes(custom.results)
                setGlobalAttributes(global.results)
            } catch (error) {
                console.error(error)
                toast.error("No se pudieron cargar los atributos")
            } finally {
                setLoadingAttributes(false)
            }
        }

        loadAttributes()
    }, [])


    const {
        control,
        register,
        handleSubmit,
        setValue,
        watch,
        setError,
        setFocus,
        formState: { errors, isSubmitting },
    } = useForm<AssignAttributeFormValues>({
        resolver: zodResolver(assignAttributeSchema),
        defaultValues: {
            custom_attribute: "",
            global_attribute: "",
            is_required: true,
            order: 1,
            default_value: "",
        }
    });

    const selectedCustom = watch("custom_attribute")
    const selectedGlobal = watch("global_attribute")

    useEffect(() => {
        if (selectedCustom) {
            setValue("global_attribute", "")
        }
    }, [selectedCustom])

    useEffect(() => {
        if (selectedGlobal) {
            setValue("custom_attribute", "")
        }
    }, [selectedGlobal])


    const onSubmit = async (data: AssignAttributeFormValues) => {
        console.log(template)
        if (!template?.id) {
            toast.error("No hay una plantilla activa")
            return
        }

        if (!data.custom_attribute && !data.global_attribute) {
            toast.error("Debes seleccionar un atributo")
            return
        }

        try {
            console.log(template)
            await onboardingService.assignAttribute(template.id, {
                custom_attribute: data.custom_attribute,
                global_attribute: data.global_attribute,
                is_required: data.is_required,
                order: data.order,
                default_value: data.default_value,
            })

            toast.success("Atributo asignado correctamente")
            router.replace("/onboarding")

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
                        setError(error.field as keyof AssignAttributeFormValues, {
                            type: "server",
                            message: error.message,
                        });
                    }
                );

                setFocus(firstErrorField as keyof AssignAttributeFormValues);
            }
        }
    };

    return (
        <div className="w-full max-w-135 mx-auto">
            <Card className="border-slate-200/60 dark:border-slate-800 shadow-lg">
                <CardContent className="p-8 sm:px-12 sm:py-10 flex flex-col gap-8">
                    {/* Header */}
                    <div className="flex flex-col items-center text-center gap-5">
                        <div className="h-16 w-16 rounded-full bg-ui-primary/10 border border-ui-primary/20 flex items-center justify-center">
                            <span className="material-symbols-outlined text-[32px] text-ui-primary">
                                tune
                            </span>
                        </div>

                        <div className="space-y-3">
                            <h1 className="text-2xl sm:text-[28px] font-bold tracking-tight text-ui-main dark:text-white">
                                Asignar atributo a plantilla
                            </h1>
                            <p className="text-ui-secondary dark:text-slate-400 text-sm leading-relaxed max-w-md">
                                Configura cómo este atributo se comportará dentro de la plantilla
                                y al crear productos.
                            </p>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
                        {/* Atributos */}
                        <div className="rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 p-6 space-y-6">
                            {/* Custom attribute */}
                            <div className="space-y-2">
                                <Label>Atributo personalizado</Label>
                                <Controller
                                    name="custom_attribute"
                                    control={control}
                                    render={({ field }) => (
                                        <Select value={field.value}
                                            onValueChange={field.onChange}>

                                            <SelectTrigger className="h-11 rounded-lg w-full">
                                                <SelectValue placeholder="Selecciona un atributo personalizado" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                {customAttributes.length === 0 && (
                                                    <SelectItem disabled value="empty">
                                                        No hay atributos personalizados
                                                    </SelectItem>
                                                )}

                                                {customAttributes.map((attr) => (
                                                    <SelectItem key={attr.id} value={attr.id.toString()}>
                                                        {attr.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>

                                    )}
                                />
                            </div>

                            {/* Separator */}
                            <div className="relative flex items-center justify-center">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-slate-200 dark:border-slate-700" />
                                </div>
                                <span className="relative bg-slate-50 dark:bg-slate-900 px-3 text-xs text-ui-secondary">
                                    o selecciona uno global
                                </span>
                            </div>


                            {/* Global attribute */}
                            <div className="space-y-2">
                                <Label>Atributo global</Label>
                                <Controller
                                    name="global_attribute"
                                    control={control}
                                    render={({ field }) => (
                                        <Select value={field.value}
                                            onValueChange={field.onChange}>

                                            <SelectTrigger className="h-11 rounded-lg w-full">
                                                <SelectValue placeholder="Selecciona un atributo global" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                {globalAttributes.length === 0 && (
                                                    <SelectItem disabled value="empty">
                                                        No hay atributos globales
                                                    </SelectItem>
                                                )}

                                                {globalAttributes.map((attr) => (
                                                    <SelectItem key={attr.id} value={attr.id.toString()}>
                                                        {attr.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>

                                    )}
                                />
                            </div>

                            {errors.custom_attribute && (
                                <p className="text-xs text-red-500 flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">
                                        info
                                    </span>
                                    {errors.custom_attribute.message}
                                </p>
                            )}

                            <div className="flex items-center  gap-2 mt-1">
                                <span className="material-symbols-outlined text-[#f59e0b] text-lg mt-0.5">info</span>
                                <p className="text-xs text-[#64748b] dark:text-[#94a3b8] leading-tight">
                                    Debes seleccionar al menos una de las dos opciones anteriores para continuar.
                                </p>
                            </div>
                        </div>



                        {/* Required switch */}
                        <div className="flex items-start justify-between gap-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 p-4">
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-ui-main dark:text-white">
                                    Atributo obligatorio
                                </p>
                                <p className="text-xs text-ui-secondary dark:text-slate-500">
                                    Este atributo será obligatorio al crear productos.
                                </p>
                            </div>

                            <Switch
                                checked={watch("is_required")}
                                onCheckedChange={(value) =>
                                    setValue("is_required", value)
                                }
                                className="data-[state=checked]:bg-ui-primary"
                            />
                        </div>

                        {/* Order & default value */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label>Orden de visualización</Label>
                                <Input
                                    type="number"
                                    min={1}
                                    {...register("order", { valueAsNumber: true })}
                                    className="h-11 rounded-lg"
                                />
                                <p className="text-xs text-ui-secondary dark:text-slate-500">
                                    Define la posición del atributo en el formulario.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label>
                                    Valor por defecto{" "}
                                    <span className="text-xs text-ui-secondary">(opcional)</span>
                                </Label>
                                <Input
                                    placeholder="Ej: Azul marino"
                                    {...register("default_value")}
                                    className="h-11 rounded-lg"
                                />
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-4 mt-2">
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full h-11 bg-ui-primary hover:bg-ui-primary-dark text-white font-bold rounded-lg shadow-md flex items-center justify-center gap-2"
                            >
                                Asignar atributo
                                <span className="material-symbols-outlined text-[18px]">
                                    arrow_forward
                                </span>
                            </Button>

                            <button
                                type="button"
                                className="text-sm text-ui-secondary hover:text-ui-primary transition-colors"
                            >
                                Este paso es opcional, puedes hacerlo más adelante.
                            </button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {/* Footer onboarding */}
            <div className="flex justify-center mt-4">
                <p className="text-xs text-ui-secondary dark:text-slate-500 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">
                        timer
                    </span>
                    Esto solo tomará un par de minutos.
                </p>
            </div>
        </div>
    );
}
