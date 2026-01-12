"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";



import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { TemplateFormValues, templateSchema } from "@/schemas/onboarding.schema";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { onboardingService } from "@/services/onboardingService";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { buttonBaseClasses } from "@/lib/ui/input-classes";
import { Controller } from "react-hook-form";




type TemplateOption = {
    id: number
    name: string
}

export default function CreateTemplatePage() {

    const router = useRouter()
    const { setTemplate } = useOnboarding()

    const [templates, setTemplates] = useState<TemplateOption[]>([])
    const [selectedTemplateId, setSelectedTemplateId] = useState<number | null>(null)

    useEffect(() => {
        const loadTemplates = async () => {
            try {
                const data = await onboardingService.getTemplates()
                console.log(data)
                setTemplates(data.results)
            } catch (error) {
                console.error("Error loading templates", error)
            }
        }

        loadTemplates()
    }, [])


    const {
        register,
        handleSubmit,
        setValue,
        watch,
        control,
        formState: { errors, isSubmitting },
    } = useForm<TemplateFormValues>({
        resolver: zodResolver(templateSchema),
        defaultValues: {
            name: "",
            description: "",
            is_active: true,
            selected_template_id: "",
        },
    });


    const isActive = watch("is_active");

    const [mode, setMode] = useState<"create" | "select">("create")



    const onSubmit = async (data: TemplateFormValues) => {
        try {
            if (mode === "create") {
                const template = await onboardingService.createTemplate(data)

                setTemplate({
                    id: template.id,
                    name: template.name,
                })
            }

            if (mode === "select") {
                if (!data.selected_template_id) {
                    throw new Error("No se seleccionó un template")
                }

                const template = templates.find(
                    (t) => t.id === Number(data.selected_template_id)
                )

                if (!template) {
                    throw new Error("Template no encontrado")
                }

                setTemplate({
                    id: template.id,
                    name: template.name,
                })
            }

            router.replace("/onboarding")
        } catch (error) {
            console.error(error)
        }

    };

    return (
        <>
            <div className="w-full max-w-135 mx-auto">
                <Card className="border-slate-200/60 dark:border-slate-800 shadow-lg">
                    <CardContent className="p-8 sm:px-12 sm:py-10 flex flex-col gap-8">
                        {/* Header */}
                        <div className="flex flex-col items-center text-center gap-5">
                            <div className="h-16 w-16 rounded-full bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-ui-primary border border-blue-100 dark:border-blue-500/20">
                                <span className="material-symbols-outlined text-[32px]">
                                    view_list
                                </span>
                            </div>

                            <div className="space-y-3">
                                <h1 className="text-2xl sm:text-[28px] font-bold tracking-tight text-ui-main dark:text-white">
                                    Crea tu primer template
                                </h1>
                                <p className="text-ui-secondary dark:text-slate-400 text-sm leading-relaxed max-w-sm">
                                    Los templates te permiten definir la estructura base de tus
                                    productos, como campos, atributos y organización.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <Button
                                type="button"
                                onClick={() => setMode("create")}
                                className={cn(buttonBaseClasses, mode == "create" && "bg-ui-primary-dark")}
                            >
                                Crear nuevo
                            </Button>

                            <Button
                                type="button"
                                onClick={() => setMode("select")}
                                className={cn(buttonBaseClasses, mode == "select" && "bg-ui-primary-dark")}
                            >
                                Usar existente
                            </Button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">

                            {mode === "create" && (
                                <>
                                    {/* Nombre */}
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Nombre del template</Label>
                                        <Input
                                            id="name"
                                            placeholder="Ej: Smartphone estándar"
                                            {...register("name")}
                                            className={cn(
                                                "h-11 px-4 pr-12 rounded-lg",
                                                "bg-white! dark:bg-ui-dark!",
                                                "border-gray-200! dark:border-gray-700!",
                                                "text-ui-main! dark:text-white!",
                                                "placeholder:text-gray-400! dark:placeholder:text-slate-500!",
                                                "focus:border-ui-primary! focus:ring-2! focus:ring-ui-primary!"
                                            )}
                                        />
                                        {errors.name && (
                                            <p className="text-xs text-red-500">
                                                {errors.name.message}
                                            </p>
                                        )}
                                        <p className="text-xs text-ui-secondary dark:text-slate-500">
                                            Este nombre te ayudará a identificar el template más adelante.
                                        </p>
                                    </div>

                                    {/* Descripción */}
                                    <div className="space-y-2">
                                        <Label htmlFor="description">Descripción</Label>
                                        <Textarea
                                            id="description"
                                            placeholder="Ej: Template para teléfonos móviles con especificaciones técnicas"
                                            {...register("description")}
                                            className={cn(
                                                "min-h-24 px-4 py-3 rounded-lg resize-none",
                                                "bg-white! dark:bg-ui-dark!",
                                                "border-gray-200! dark:border-gray-700!",
                                                "text-ui-main! dark:text-white!",
                                                "placeholder:text-gray-400! dark:placeholder:text-slate-500!",
                                                "focus:border-ui-primary! focus:ring-2! focus:ring-ui-primary!"
                                            )}
                                        />

                                        <p className="text-xs text-ui-secondary dark:text-slate-500">
                                            Opcional, pero recomendado para dar más contexto a tu equipo.
                                        </p>
                                    </div>

                                    {/* Switch activo */}
                                    <div className="flex items-start justify-between gap-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 p-4">
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium text-ui-main dark:text-white">
                                                Template activo
                                            </p>
                                            <p className="text-xs text-ui-secondary dark:text-slate-500">
                                                Solo los templates activos pueden usarse para crear productos.
                                            </p>
                                        </div>

                                        <Switch
                                            checked={isActive}
                                            onCheckedChange={(value) =>
                                                setValue("is_active", value)
                                            }
                                            className="
        data-[state=checked]:bg-ui-primary
        data-[state=unchecked]:bg-gray-200
        dark:data-[state=unchecked]:bg-slate-700
    "
                                        />
                                    </div>
                                </>
                            )}
                            {mode === "select" && (
                                <div className="space-y-2">
                                    <Label>Selecciona un template</Label>


                                    <Controller
                                        name="selected_template_id"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Elige un template existente" />
                                                </SelectTrigger>

                                                <SelectContent>
                                                    {templates.map((template) => (
                                                        <SelectItem
                                                            key={template.id}
                                                            value={template.id.toString()}
                                                        >
                                                            {template.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />


                                    <p className="text-xs text-ui-secondary">
                                        Este template se usará para definir los atributos del producto.
                                    </p>
                                </div>
                            )}


                            {/* Actions */}
                            <div className="flex flex-col gap-4 mt-2">
                                <Button
                                    type="submit"
                                    disabled={mode === "select" && !watch("selected_template_id")}
                                    className={cn(buttonBaseClasses)}
                                >
                                    {mode === "create" ? "Crear template" : "Continuar"}
                                    <span className="material-symbols-outlined text-[18px]">
                                        arrow_forward
                                    </span>
                                </Button>

                                <button
                                    type="button"
                                    className="text-sm text-ui-secondary hover:text-ui-primary transition-colors"
                                >
                                    Este paso es opcional, puedes continuar más adelante.
                                </button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
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
    );
}
