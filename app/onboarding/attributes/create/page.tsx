"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { AttributeFormValues, attributeSchema } from "@/schemas/onboarding.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";

export default function AttributesCreatePage() {
    const {
        register,
        control,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<AttributeFormValues>({
        resolver: zodResolver(attributeSchema),
        defaultValues: {
            name: "",
            data_type: "text",
            unit_of_measure: "",
            description: "",
            is_active: true,
        },
    });

    const onSubmit = (data: AttributeFormValues) => {
        console.log("CREATE ATTRIBUTE", data);
        // POST /api/v1/custom-attributes/
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
                                    settings
                                </span>
                            </div>

                            <div className="space-y-3">
                                <h1 className="text-2xl sm:text-[28px] font-bold tracking-tight text-ui-main dark:text-white">
                                    Crear atributo
                                </h1>
                                <p className="text-ui-secondary dark:text-slate-400 text-sm leading-relaxed max-w-sm">
                                    Los atributos definen las características que podrán tener tus
                                    productos dentro de una plantilla.
                                </p>
                            </div>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                            {/* Nombre */}
                            <div className="space-y-2">
                                <Label htmlFor="name">Nombre del atributo</Label>
                                <Input
                                    id="name"
                                    placeholder="Ej: Memoria RAM"
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
                                    Nombre visible que se usará al crear productos.
                                </p>
                            </div>

                            {/* Tipo de dato */}
                            <div className="space-y-2">
                                <Label>Tipo de dato</Label>

                                <Controller
                                    name="data_type"
                                    control={control}
                                    render={({ field }) => (
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger
                                                className={cn(
                                                    "h-11 rounded-lg w-full",
                                                    "bg-white! dark:bg-ui-dark!",
                                                    "border-gray-200! dark:border-gray-700!",
                                                    "text-ui-main! dark:text-white!",
                                                    "focus:border-ui-primary! focus:ring-2! focus:ring-ui-primary!"
                                                )}
                                            >
                                                <SelectValue placeholder="Selecciona un tipo" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="text">Texto</SelectItem>
                                                <SelectItem value="number">Número</SelectItem>
                                                <SelectItem value="decimal">Decimal</SelectItem>
                                                <SelectItem value="boolean">Booleano</SelectItem>
                                                <SelectItem value="date">Fecha</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />

                                {errors.data_type && (
                                    <p className="text-xs text-red-500">
                                        {errors.data_type.message}
                                    </p>
                                )}

                                <p className="text-xs text-ui-secondary dark:text-slate-500">
                                    Define qué tipo de valor aceptará este atributo.
                                </p>
                            </div>

                            {/* Unidad de medida */}
                            <div className="space-y-2">
                                <Label htmlFor="unit_of_measure">Unidad de medida</Label>
                                <Input
                                    id="unit_of_measure"
                                    placeholder="Ej: GB, pulgadas, kg"
                                    {...register("unit_of_measure")}
                                    className={cn(
                                        "h-11 px-4 pr-12 rounded-lg",
                                        "bg-white! dark:bg-ui-dark!",
                                        "border-gray-200! dark:border-gray-700!",
                                        "text-ui-main! dark:text-white!",
                                        "placeholder:text-gray-400! dark:placeholder:text-slate-500!",
                                        "focus:border-ui-primary! focus:ring-2! focus:ring-ui-primary!"
                                    )}
                                />
                                <p className="text-xs text-ui-secondary dark:text-slate-500">
                                    Opcional. Útil para atributos numéricos o decimales.
                                </p>
                            </div>

                            {/* Descripción */}
                            <div className="space-y-2">
                                <Label htmlFor="description">Descripción</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Ej: Cantidad de memoria RAM del dispositivo"
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
                                    Ayuda a tu equipo a entender el propósito del atributo.
                                </p>
                            </div>

                            {/* Switch */}
                            <div className="flex items-start justify-between gap-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 p-4">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-ui-main dark:text-white">
                                        Atributo activo
                                    </p>
                                    <p className="text-xs text-ui-secondary dark:text-slate-500">
                                        Los atributos inactivos no podrán asignarse a plantillas.
                                    </p>
                                </div>

                                <Switch
                                    checked={watch("is_active")}
                                    onCheckedChange={(value) => setValue("is_active", value)}
                                    className="
                data-[state=checked]:bg-ui-primary
                data-[state=unchecked]:bg-gray-200
                dark:data-[state=unchecked]:bg-slate-700
                "
                                />
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col gap-4 mt-2">
                                <Button
                                    type="submit"
                                    // disabled={isSubmitting}
                                    className="w-full h-11 bg-ui-primary hover:bg-ui-primary-dark
                active:bg-[#0c3ca3] disabled:opacity-60
                text-white text-sm font-bold rounded-lg
                transition-all duration-200
                shadow-[0_4px_14px_rgba(19,91,236,0.25)]
                hover:shadow-[0_6px_20px_rgba(19,91,236,0.35)]
                flex items-center justify-center gap-2 mt-1"
                                >
                                    Crear atributo
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

            {/* Footer meta */}
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