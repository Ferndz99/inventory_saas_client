"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateCategoryForm, createCategorySchema } from "@/schemas/onboarding.schema";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useRouter } from "next/navigation";
import { onboardingService } from "@/services/onboardingService";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { inputBaseClasses } from "@/lib/ui/input-classes";
import { toast } from "sonner";





export default function OnboardingPage() {

    const router = useRouter()
    const { setCategory } = useOnboarding()

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<CreateCategoryForm>({
        resolver: zodResolver(createCategorySchema),
        defaultValues: {
            name: "",
            is_active: true,
        },
    });

    const isActive = watch("is_active");

    const onSubmit = async (data: CreateCategoryForm) => {
        console.log("CREATE CATEGORY", data);
        const category = await onboardingService.createCategory(data)
        toast.success("Categoría creada correctamente")
        setCategory({
            id: category.id,
            name: category.name,
        })
        router.replace("/onboarding")
    };

    return (
        <>
            <div className="w-full max-w-135 mx-auto flex flex-col gap-6">
                {/* Card */}
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 p-8 sm:p-10 flex flex-col gap-8">
                    {/* Header */}
                    <div className="flex flex-col items-center text-center gap-4">
                        <div className="size-16 rounded-full bg-ui-primary/10 flex items-center justify-center text-ui-primary">
                            <span className="material-symbols-outlined text-[32px]">
                                folder_open
                            </span>
                        </div>

                        <div className="space-y-2">
                            <h1 className="text-2xl font-bold text-ui-text-main">
                                Crea tu primera categoría
                            </h1>
                            <p className="text-ui-secondary text-sm max-w-sm mx-auto">
                                Las categorías te ayudan a organizar tus productos y
                                mantener tu inventario ordenado.
                            </p>
                        </div>
                    </div>

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col gap-6"
                    >
                        {/* Nombre */}
                        <div className="space-y-2">
                            <Label htmlFor="name" className={cn(errors.name && "text-red-500")}>
                                Nombre de la categoría
                            </Label>

                            <div className="relative">
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Ej: Electrónica"
                                    className={cn(inputBaseClasses)}
                                    {...register("name")}
                                />

                                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-[20px] pointer-events-none">
                                    edit
                                </span>
                            </div>

                            {errors.name && (
                                <p className="text-xs text-red-500">
                                    {errors.name.message}
                                </p>
                            )}

                            <p className="text-xs text-ui-secondary flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">
                                    info
                                </span>
                                Puedes cambiar o crear más categorías más adelante.
                            </p>
                        </div>

                        {/* Activa */}
                        <div className="flex items-center justify-between rounded-lg border border-gray-200 dark:border-slate-600 p-4">
                            <div className="flex items-center gap-3">
                                <div className="size-10 rounded-full border border-gray-200 dark:border-slate-600 flex items-center justify-center text-ui-primary">
                                    <span className="material-symbols-outlined">
                                        toggle_on
                                    </span>
                                </div>

                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-ui-text-main">
                                        Categoría activa
                                    </span>
                                    <span className="text-xs text-ui-secondary">
                                        Las activas pueden usarse en productos.
                                    </span>
                                </div>
                            </div>

                            <Switch
                                checked={isActive}
                                onCheckedChange={(value) =>
                                    setValue("is_active", value)
                                }
                            />
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-4 pt-2">
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="h-11 bg-ui-primary hover:bg-ui-primary-dark
                                text-white font-bold rounded-lg
                                shadow-[0_4px_14px_rgba(19,91,236,0.25)]
                                hover:shadow-[0_6px_20px_rgba(19,91,236,0.35)]
                                flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? "Creando..." : "Crear categoría"}
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
                </div>

                {/* Footer */}
                <div className="flex justify-center">
                    <p className="flex items-center gap-1 text-xs text-ui-secondary">
                        <span className="material-symbols-outlined text-[16px]">
                            schedule
                        </span>
                        Esto solo tomará un par de minutos.
                    </p>
                </div>
            </div>
        </>
    )
}