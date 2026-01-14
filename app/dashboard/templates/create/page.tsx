"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Lightbulb, Plus, RefreshCw, Save } from "lucide-react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { buttonBaseClasses, inputBaseClasses } from "@/lib/ui/input-classes";
import { useState } from "react";
import { TemplateFormValues, templateSchema } from "@/schemas/onboarding.schema";
import { onboardingService } from "@/services/onboardingService";

import { useRouter } from "next/navigation";
import { TemplateAttributesList } from "../TemplateAttributesList";
import { AttributeModal } from "../AttributeModal";


export interface Root {
    id: number
    name: string
    description: string
    company: number
    is_active: boolean
    template_attributes: TemplateAttribute[]
    attribute_count: string
    product_count: string
    created_at: string
    updated_at: string
}

export interface TemplateAttribute {
    id: number
    custom_attribute: number
    global_attribute: number
    is_required: boolean
    order: number
    default_value: string
    is_active: boolean
    attribute_name: string
    attribute_slug: string
    attribute_type: string
    attribute_unit: string
    attribute_description: string
}



export default function TemplateCreatePage() {

    const router = useRouter()
    const [template, setTemplate] = useState<Root | null>(null)
    const [templateAttributes, setTemplateAttributes] = useState<TemplateAttribute[]>([])
    const canManageAttributes = Boolean(template);
    const [isAttributeModalOpen, setIsAttributeModalOpen] = useState(false);

    const {
        register,
        control,
        handleSubmit,
        setError,
        setFocus,
        reset,
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

    const onSubmit = async (data: TemplateFormValues) => {
        //console.log("Template data:", data);
        if (template) return;
        try {
            const res = await onboardingService.createTemplate(data)
            console.log(res)
            setTemplate(res);
            setTemplateAttributes(res.template_attributes ?? [])
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
                        setError(error.field as keyof TemplateFormValues, {
                            type: "server",
                            message: error.message,
                        });
                    }
                );

                setFocus(firstErrorField as keyof TemplateFormValues);
            }
        }
    };

    const handleCreateAnother = () => {
        setTemplate(null);
        setTemplateAttributes([]);
        reset();
    };

    // Función para cancelar y volver
    const handleCancel = () => {
        router.push("/dashboard"); // Ajusta esta ruta según tu estructura
    };

    // Función para volver después de guardar
    const handleBackToDashboard = () => {
        router.push("/dashboard"); // Ajusta esta ruta según tu estructura
    };

    return (
        <Card className="bg-gray-50">
            {/* HEADER PRINCIPAL */}
            <CardHeader className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                <div className="max-w-2xl space-y-2">
                    <CardTitle className="text-4xl font-black tracking-tight text-ui-main">
                        Crear plantilla
                    </CardTitle>
                    <CardDescription className="text-ui-secondary">
                        Define la estructura base de tus productos asignando atributos reutilizables
                    </CardDescription>
                </div>

                <div className="flex gap-3">
                    {/* Si NO hay template guardado, mostrar Cancelar y Guardar */}
                    {!template ? (
                        <>
                            <Button
                                variant="outline"
                                onClick={handleCancel}
                                className={cn(buttonBaseClasses, "w-auto bg-red-500! hover:bg-red-600! text-white!")}
                            >
                                Cancelar
                            </Button>
                            <Button
                                onClick={handleSubmit(onSubmit)}
                                disabled={isSubmitting}
                                className={cn(buttonBaseClasses, "w-auto")}
                            >
                                <Save className="size-4" />
                                {isSubmitting ? "Guardando..." : "Guardar plantilla"}
                            </Button>
                        </>
                    ) : (
                        /* Si YA hay template guardado, mostrar Crear otra y Volver */
                        <>
                            <Button
                                variant="outline"
                                onClick={handleCreateAnother}
                                className={cn(buttonBaseClasses, "w-auto")}
                            >
                                <RefreshCw className="size-4" />
                                Crear otra plantilla
                            </Button>
                            <Button
                                onClick={handleBackToDashboard}
                                className={cn(buttonBaseClasses, "w-auto")}
                            >
                                <ArrowLeft className="size-4" />
                                Volver al dashboard
                            </Button>
                        </>
                    )}
                </div>

                {/* <div className="flex gap-3">
                    <Button className={cn(buttonBaseClasses, "w-auto bg-red-500!")}>Cancelar</Button>
                    <Button
                        onClick={handleSubmit(onSubmit)}
                        disabled={isSubmitting || !!template}
                        className={cn(buttonBaseClasses, "w-auto")}
                    >
                        <Save className="size-4" />
                        {isSubmitting
                            ? "Guardando..."
                            : template
                                ? "Guardado"
                                : "Guardar plantilla"}
                    </Button>
                </div> */}
            </CardHeader>

            {/* CONTENIDO PRINCIPAL */}
            <CardContent className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Columna izquierda */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Card: Detalles */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Detalles de la plantilla</CardTitle>
                            <CardDescription>
                                Información básica para identificar esta estructura de productos.
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                {/* Nombre */}
                                <div className="space-y-2">
                                    <Label className={cn(errors.name && "text-red-500")}>
                                        Nombre de la plantilla
                                    </Label>

                                    <Input
                                        placeholder="Ej. Electrónicos de Consumo"
                                        {...register("name")}
                                        className={cn(inputBaseClasses, errors.name && "border-red-500! focus-visible:ring-red-500! focus-visible:border-red-500!")}
                                    />

                                    {errors.name && (
                                        <p className="text-xs text-red-500 font-medium">
                                            {errors.name.message}
                                        </p>
                                    )}
                                </div>

                                {/* Descripción */}
                                <div className="space-y-2">
                                    <Label>
                                        Descripción
                                    </Label>

                                    <Textarea
                                        placeholder="Describe el propósito de esta plantilla para el resto del equipo..."
                                        className={cn(
                                            "min-h-24 px-4 py-3 rounded-lg resize-none",
                                            "bg-white! dark:bg-ui-dark!",
                                            "border-gray-200! dark:border-gray-700!",
                                            "text-ui-main! dark:text-white!",
                                            "placeholder:text-gray-400! dark:placeholder:text-slate-500!",
                                            "focus:border-ui-primary! focus:ring-2! focus:ring-ui-primary!"
                                        )}
                                        {...register("description")}
                                    />

                                    {errors.description && (
                                        <p className="text-xs text-red-500 font-medium">
                                            {errors.description.message}
                                        </p>
                                    )}
                                </div>

                                {/* Activa */}
                                <div className="flex items-center justify-between rounded-lg border p-4">
                                    <div>
                                        <p className="text-sm font-bold text-ui-main">
                                            Plantilla activa
                                        </p>
                                        <p className="text-xs text-ui-secondary">
                                            Disponible para asignar a productos
                                        </p>
                                    </div>

                                    <Controller
                                        control={control}
                                        name="is_active"
                                        render={({ field }) => (
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                                className="
        data-[state=checked]:bg-ui-primary
        data-[state=unchecked]:bg-gray-200
        dark:data-[state=unchecked]:bg-slate-700
    "
                                            />
                                        )}
                                    />
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Atributos */}
                    {/* <div className="space-y-4">
                        <div className="flex items-center justify-between px-2">
                            <h3 className="text-xl font-bold text-ui-main">
                                Atributos de Producto
                            </h3>
                            <span className="text-sm font-semibold text-ui-secondary">
                                0 atributos
                            </span>
                        </div>

                        <Card className="border-dashed">
                            <CardContent className="flex flex-col items-center py-10 gap-4">
                                <Button variant="outline">
                                    <Plus className="size-4" />
                                    Agregar atributo
                                </Button>
                                <p className="text-xs text-ui-secondary text-center max-w-sm">
                                    Crea atributos personalizados como texto, números o listas de selección.
                                </p>
                            </CardContent>
                        </Card>
                    </div> */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between px-2">
                            <h3 className="text-xl font-bold text-ui-main">
                                Atributos de Producto
                            </h3>
                            <span className="text-sm font-semibold text-ui-secondary">
                                {templateAttributes.length} atributos
                            </span>
                        </div>

                        <TemplateAttributesList
                            attributes={templateAttributes}
                            maxHeight={280}
                        />


                        <Card className="border-dashed">
                            <CardContent className="flex flex-col items-center py-10 gap-4">
                                <Button
                                    variant="outline"
                                    disabled={!canManageAttributes}
                                    onClick={() => setIsAttributeModalOpen(true)}
                                >
                                    <Plus className="size-4" />
                                    Agregar atributo
                                </Button>

                                {!canManageAttributes && (
                                    <p className="text-xs text-ui-secondary text-center max-w-sm">
                                        Guarda la plantilla para comenzar a agregar atributos
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Columna derecha */}
                <div className="space-y-6">
                    {/* Consejo */}
                    <Card className="bg-ui-primary text-white">
                        <CardContent className="p-6 space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
                                    <Lightbulb className="h-5 w-5 text-white" />
                                </div>

                                <h4 className="font-bold text-lg">
                                    Consejo Pro
                                </h4>
                            </div>

                            <p className="text-sm text-white/80 leading-relaxed">
                                Los atributos que definas aquí aparecerán automáticamente en todos
                                los productos asociados a esta plantilla.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Resumen */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Resumen de plantilla</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm">
                            <div className="flex justify-between">
                                <span className="text-ui-secondary">Total atributos</span>
                                <span className="font-bold">{templateAttributes.length}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-ui-secondary">Estado</span>
                                <span className="font-bold text-amber-600">Sin guardar</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </CardContent>
            <AttributeModal
                open={isAttributeModalOpen}
                onClose={() => setIsAttributeModalOpen(false)}
                templateId={template?.id}
                onAttributeAdded={(newAttribute) => {
                    setTemplateAttributes((prev) => [...prev, newAttribute]);
                }}
            />

        </Card>

    );
}
