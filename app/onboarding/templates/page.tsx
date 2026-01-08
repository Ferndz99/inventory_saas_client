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
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


const templates = [
    {
        id: "1",
        name: "template base"
    }
]


export default function CreateTemplatePage() {

    const router = useRouter()

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<TemplateFormValues>({
        resolver: zodResolver(templateSchema),
        defaultValues: {
            name: "",
            description: "",
            is_active: true,
        },
    });

    const isActive = watch("is_active");

    const [mode, setMode] = useState<"create" | "select">("create")
    const [selectedTemplate, setSelectedTemplate] = useState<string>("")

    const onSubmit = async (data: TemplateFormValues) => {
        console.log("Template data:", data);
        // POST /templates
        // luego redirect al wizard
        router.push("/onboarding")
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
                                className={` bg-ui-primary hover:bg-ui-primary-dark
                        active:bg-[#0c3ca3] disabled:opacity-60
                        text-white text-sm font-bold rounded-lg
                        transition-all duration-200
                        shadow-[0_4px_14px_rgba(19,91,236,0.25)]
                        hover:shadow-[0_6px_20px_rgba(19,91,236,0.35)]
                        flex items-center justify-center gap-2 mt-1 cursor-pointer ${mode == "create" && "bg-ui-primary-dark"}`}
                            >
                                Crear nuevo
                            </Button>

                            <Button
                                type="button"
                                onClick={() => setMode("select")}
                                className={` bg-ui-primary hover:bg-ui-primary-dark
                        active:bg-[#0c3ca3] disabled:opacity-60
                        text-white text-sm font-bold rounded-lg
                        transition-all duration-200
                        shadow-[0_4px_14px_rgba(19,91,236,0.25)]
                        hover:shadow-[0_6px_20px_rgba(19,91,236,0.35)]
                        flex items-center justify-center gap-2 mt-1 cursor-pointer ${mode == "select" && "bg-ui-primary-dark"}`}
                            >
                                Usar existente
                            </Button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                            {/* Nombre */}
                            {/* <div className="space-y-2">
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
                            </div> */}

                            {/* Descripción */}
                            {/* <div className="space-y-2">
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
                            </div> */}

                            {/* Switch */}
                            {/* <div className="flex items-start justify-between gap-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 p-4">
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
                            </div> */}



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

                                    <Select onValueChange={(value) => setSelectedTemplate(value)}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Elige un template existente" />
                                        </SelectTrigger>

                                        <SelectContent>
                                            {templates.map((template) => (
                                                <SelectItem key={template.id} value={template.id.toString()}>
                                                    {template.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                    <p className="text-xs text-ui-secondary">
                                        Este template se usará para definir los atributos del producto.
                                    </p>
                                </div>
                            )}



                            {/* Actions */}
                            <div className="flex flex-col gap-4 mt-2">
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
                <p className="text-center text-ui-secondary dark:text-slate-500 text-xs font-medium flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px] align-text-bottom">
                        timer
                    </span>
                    Esto solo tomará un par de minutos.
                </p>
            </div>
        </>
    );
}
