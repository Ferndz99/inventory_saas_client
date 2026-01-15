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
import { onboardingService } from "@/services/onboardingService";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { inputBaseClasses } from "@/lib/ui/input-classes";
import { toast } from "sonner";




export default function CreateProductOnboardingPage() {

    const { template, category } = useOnboarding();
    const router = useRouter();
    const [attributes, setAttributes] = useState<any[]>([])
    const [loadingAttributes, setLoadingAttributes] = useState(false)

    useEffect(() => {
        if (!template?.id) return

        const fetchAttributes = async () => {
            try {
                setLoadingAttributes(true)
                const data = await onboardingService.getAttributesFortemplate(
                    template.id
                )
                setAttributes(data.attributes)
            } catch (error) {
                console.error("Error loading attributes", error)
            } finally {
                setLoadingAttributes(false)
            }
        }

        fetchAttributes()
    }, [template?.id])

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        setError,
        setFocus,
        formState: { errors },
    } = useForm<ProductOnboardingForm>({
        resolver: zodResolver(productOnboardingSchema),
        defaultValues: {
            price_includes_tax: false,
            is_active: true,
        },
    });

    useEffect(() => {
        if (template?.id) {
            setValue("template", template.id);
        }

        if (category?.id) {
            setValue("category", category.id);
        }
    }, [template, category, setValue]);


    const onSubmit = async (data: ProductOnboardingForm) => {
        console.log("PRODUCT DATA", data);
        try {
            const payload = {
                template: data.template,
                specifications: data.specifications,
                name: data.name,
                price: data.price,
                category: data.category,
                sku: data.sku
            }

            // 1️⃣ Validar primero
            await onboardingService.validateSpecifications(payload)

            // 2️⃣ Si pasa, crear producto
            await onboardingService.createProduct(data)

            toast.success("Producto creado correctamente")
            router.replace("/dashboard")
        } catch (error: any) {
            const apiError = error?.response?.data;
            console.log(apiError)
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
                        setError(error.field as keyof ProductOnboardingForm, {
                            type: "server",
                            message: error.message,
                        });
                    }
                );

                setFocus(firstErrorField as keyof ProductOnboardingForm);
            }
        }
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
                                        <Label htmlFor="name" className={cn(errors.name && "text-red-500")}>Nombre del producto</Label>
                                        <Input id="name" {...register("name")} placeholder="Ej: Camiseta algodón premium" className={cn(inputBaseClasses, errors.name && "border-red-500! focus-visible:ring-red-500! focus-visible:border-red-500!")} />
                                        {errors.name && (
                                            <p className="text-xs text-red-500">{errors.name.message}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="sku" className={cn(errors.sku && "text-red-500")}>SKU</Label>
                                        <Input id="sku" {...register("sku")} placeholder="Ej: CAM-BLK-001" className={cn(inputBaseClasses, errors.sku && "border-red-500! focus-visible:ring-red-500! focus-visible:border-red-500!")} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="barcode" className={cn(errors.barcode && "text-red-500")}>Código de barras</Label>
                                        <Input id="barcode" {...register("barcode")} placeholder="Ej: 123456789" className={cn(inputBaseClasses, errors.barcode && "border-red-500! focus-visible:ring-red-500! focus-visible:border-red-500!")} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="price" className={cn(errors.price && "text-red-500")}>Precio de venta</Label>
                                        <Input id="price" type="number" {...register("price", { valueAsNumber: true })} placeholder="0.00" className={cn(inputBaseClasses, errors.price && "border-red-500! focus-visible:ring-red-500! focus-visible:border-red-500!")} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="cost" className={cn(errors.cost && "text-red-500")}>Costo</Label>
                                        <Input id="cost" type="number" {...register("cost", { valueAsNumber: true })} placeholder="0.00" className={cn(inputBaseClasses, errors.cost && "border-red-500! focus-visible:ring-red-500! focus-visible:border-red-500!")} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="minimun_stock" className={cn(errors.minimum_stock && "text-red-500")}>Stock mínimo</Label>
                                        <Input id="minimun_stock" type="number" {...register("minimum_stock", { valueAsNumber: true })} placeholder="Ej: 10" className={cn(inputBaseClasses, errors.minimum_stock && "border-red-500! focus-visible:ring-red-500! focus-visible:border-red-500!")} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="unit_of_measure" className={cn(errors.unit_of_measure && "text-red-500")}>Unidad de medida</Label>
                                        <Input id="unit_of_measure" {...register("unit_of_measure")} placeholder="Ej: Unidad, Kg" className={cn(inputBaseClasses, errors.unit_of_measure && "border-red-500! focus-visible:ring-red-500! focus-visible:border-red-500!")} />
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

                            {/* Clasificación */}
                            <section className="space-y-6  dark:bg-slate-900/40 rounded-xl">
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
                                        <Input
                                            disabled
                                            value={category?.name ?? ""}
                                            className={inputBaseClasses}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Template</Label>
                                        <Input
                                            disabled
                                            value={template?.name ?? ""}
                                            className={inputBaseClasses}
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* Especificaciones (placeholders) */}
                            {/* <section className="space-y-6">
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
                                    <Input disabled placeholder="Ej: Peso (KG)" className={inputBaseClasses} />
                                    <Input disabled placeholder="Ej: Requiere embalaje especial" className={inputBaseClasses} />
                                    <Input disabled placeholder="Ej: GSM" className={inputBaseClasses} />
                                    <Input disabled placeholder="Ej: Fecha de lanzamiento" className={inputBaseClasses} />
                                </div>
                            </section> */}
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

                                {loadingAttributes && (
                                    <p className="text-sm text-ui-secondary">
                                        Cargando atributos del template...
                                    </p>
                                )}

                                {!loadingAttributes && attributes.length === 0 && (
                                    <p className="text-sm text-ui-secondary">
                                        Este template no tiene atributos configurados.
                                    </p>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {attributes.map((attr) => (
                                        <div key={attr.slug} className="space-y-2">
                                            <Label>
                                                {attr.name}
                                                {/* {attr.is_required && (
                                                    <span className="text-red-500 ml-1">*</span>
                                                )} */}
                                            </Label>

                                            <Input
                                                {...register(`specifications.${attr.slug}`)}
                                                defaultValue={attr.default_value ?? ""}
                                                placeholder={
                                                    attr.unit_of_measure
                                                        ? `${attr.name} (${attr.unit_of_measure})`
                                                        : attr.description || attr.name
                                                }
                                                // required={attr.is_required}
                                                className={inputBaseClasses}
                                            />
                                        </div>
                                    ))}
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
                    flex items-center gap-2 cursor-pointer"
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
