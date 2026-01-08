"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";



import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card";
import { ProductOnboardingForm, productOnboardingSchema } from "@/schemas/onboarding.schema";
import { cn } from "@/lib/utils";

const inputBaseClasses = cn(
    "h-11 px-4 pr-12 rounded-lg",
    "bg-white! dark:bg-ui-dark!",
    "border-gray-200! dark:border-gray-700!",
    "text-ui-main! dark:text-white!",
    "placeholder:text-gray-400! dark:placeholder:text-slate-500!",
    "focus:border-ui-primary! focus:ring-2! focus:ring-ui-primary!"
)


export default function CreateProductOnboardingPage() {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<ProductOnboardingForm>({
        resolver: zodResolver(productOnboardingSchema),
        defaultValues: {
            price_includes_tax: false,
            is_active: true,
        },
    });

    const onSubmit = (data: ProductOnboardingForm) => {
        console.log("PRODUCT DATA", data);
    };

    return (

        <>
            <div className="w-full max-w-170 mx-auto">
                <Card className="border-slate-200/60 dark:border-slate-800 shadow-lg">
                    <CardContent className="p-8 sm:px-12 sm:py-10 flex flex-col gap-8">

                        {/* Header */}
                        <div className="flex flex-col items-center text-center gap-5">
                            <div className="h-16 w-16 rounded-full bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-ui-primary border border-blue-100 dark:border-blue-500/20">
                                <span className="material-symbols-outlined text-[32px]">
                                    inventory_2
                                </span>
                            </div>

                            <div className="space-y-3">
                                <h1 className="text-2xl sm:text-[28px] font-bold tracking-tight text-ui-main dark:text-white">
                                    Crear producto
                                </h1>
                                <p className="text-ui-secondary dark:text-slate-400 text-sm leading-relaxed max-w-sm">
                                    Registra la información básica para comenzar a gestionar tu inventario.
                                </p>
                            </div>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">

                            {/* Información básica */}
                            <section className="space-y-6">
                                <h2 className="text-lg font-semibold text-ui-main dark:text-white">
                                    Información básica
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2 space-y-2">
                                        <Label>Nombre del producto</Label>
                                        <Input {...register("name")} placeholder="Ej: Camiseta algodón premium" className={inputBaseClasses}/>
                                        {errors.name && (
                                            <p className="text-xs text-red-500">{errors.name.message}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label>SKU</Label>
                                        <Input {...register("sku")} placeholder="Ej: CAM-BLK-001" className={inputBaseClasses} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Código de barras</Label>
                                        <Input {...register("barcode")} placeholder="Ej: 123456789" className={inputBaseClasses}/>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Precio de venta</Label>
                                        <Input type="number" {...register("price")} placeholder="0.00" className={inputBaseClasses}/>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Costo</Label>
                                        <Input type="number" {...register("cost")} placeholder="0.00" className={inputBaseClasses}/>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Stock mínimo</Label>
                                        <Input type="number" {...register("minimum_stock")} placeholder="Ej: 10" className={inputBaseClasses}/>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Unidad de medida</Label>
                                        <Input {...register("unit_of_measure")} placeholder="Ej: Unidad, Kg" className={inputBaseClasses}/>
                                    </div>
                                </div>
                            </section>

                            {/* Switches */}
                            <section className="space-y-4">
                                <div className="flex items-start justify-between gap-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 p-4">
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium text-ui-main dark:text-white">
                                            Precio incluye impuestos
                                        </p>
                                        <p className="text-xs text-ui-secondary dark:text-slate-500">
                                            Indica si el precio final ya considera impuestos.
                                        </p>
                                    </div>

                                    <Switch
                                        checked={watch("price_includes_tax")}
                                        onCheckedChange={(v) => setValue("price_includes_tax", v)}
                                        className="
                data-[state=checked]:bg-ui-primary
                data-[state=unchecked]:bg-gray-200
                dark:data-[state=unchecked]:bg-slate-700"
                                    />
                                </div>

                                <div className="flex items-start justify-between gap-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 p-4">
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium text-ui-main dark:text-white">
                                            Producto activo
                                        </p>
                                        <p className="text-xs text-ui-secondary dark:text-slate-500">
                                            El producto será visible inmediatamente.
                                        </p>
                                    </div>

                                    <Switch
                                        checked={watch("is_active")}
                                        onCheckedChange={(v) => setValue("is_active", v)}
                                        className="
                data-[state=checked]:bg-ui-primary
                data-[state=unchecked]:bg-gray-200
                dark:data-[state=unchecked]:bg-slate-700"
                                    />
                                </div>
                            </section>

                            {/* Clasificación (placeholders) */}
                            <section className="space-y-6  dark:bg-slate-900/40 rounded-xl">
                                {/* <h2 className="text-lg font-semibold text-ui-main dark:text-white">
                                    Clasificación
                                </h2> */}
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-ui-primary">
                                        category
                                    </span>

                                    <h2 className="text-lg font-semibold text-ui-main dark:text-white">
                                        Clasificación
                                    </h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label>Categoría</Label>
                                        <Input disabled placeholder="Seleccionada en el paso anterior" className={inputBaseClasses}/>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Template</Label>
                                        <Input disabled placeholder="Template asignado" className={inputBaseClasses}/>
                                    </div>
                                </div>
                            </section>

                            {/* Especificaciones (placeholders) */}
                            <section className="space-y-6">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-ui-primary dark:text-white">
                                            tune
                                        </span>

                                        <h2 className="text-lg font-semibold text-ui-main dark:text-white">
                                            Especificaciones
                                        </h2>
                                    </div>

                                    <p className="text-xs text-ui-secondary dark:text-slate-500">
                                        Campos generados dinámicamente según el template.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Input disabled placeholder="Ej: Peso (KG)" className={inputBaseClasses}/>
                                    <Input disabled placeholder="Ej: Requiere embalaje especial" className={inputBaseClasses}/>
                                    <Input disabled placeholder="Ej: GSM" className={inputBaseClasses}/>
                                    <Input disabled placeholder="Ej: Fecha de lanzamiento" className={inputBaseClasses}/>
                                </div>
                            </section>

                            {/* Actions */}
                            <div className="flex flex-col-reverse sm:flex-row justify-between gap-4">
                                <button
                                    type="button"
                                    className="text-sm text-ui-secondary hover:text-ui-primary transition-colors"
                                >
                                    Saltar onboarding
                                </button>

                                <Button
                                    type="submit"
                                    className="h-11 bg-ui-primary hover:bg-ui-primary-dark
                    text-white text-sm font-bold rounded-lg shadow-md
                    flex items-center gap-2"
                                >
                                    Crear producto
                                    <span className="material-symbols-outlined text-[18px]">
                                        arrow_forward
                                    </span>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>

            {/* Footer */}
            <div className="flex justify-center">
                <p className="text-xs text-ui-secondary dark:text-slate-500 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">
                        timer
                    </span>
                    Esto solo tomará un par de minutos.
                </p>
            </div>
        </>

    );
}
