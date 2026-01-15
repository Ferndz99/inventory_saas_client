"use client";

import { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { onboardingService } from "@/services/onboardingService";
import { AssignAttributeFormValues, assignAttributeSchema, AttributeFormValues, attributeSchema } from "@/schemas/onboarding.schema";


/* =======================
   PROPS
======================= */

interface AttributeModalProps {
    open: boolean;
    onClose: () => void;
    templateId?: number;
    onAttributeAdded: (attribute: any) => void;
}

/* =======================
   COMPONENT
======================= */

export function AttributeModal({
    open,
    onClose,
    templateId,
    onAttributeAdded,
}: AttributeModalProps) {

    const [mode, setMode] = useState<"create" | "select">("create");
    const [loading, setLoading] = useState(false);
    const [customAttributes, setCustomAttributes] = useState<any[]>([]);
    const [globalAttributes, setGlobalAttributes] = useState<any[]>([]);

    /* ---------- Forms ---------- */

    const createForm = useForm<AttributeFormValues>({
        resolver: zodResolver(attributeSchema),
        defaultValues: {
            name: "",
            data_type: "text",
            description: "",
            is_active: true,
            unit_of_measure: "",
        },
    });

    const assignForm = useForm<AssignAttributeFormValues>({
        resolver: zodResolver(assignAttributeSchema),
        defaultValues: {
            custom_attribute: undefined,
            global_attribute: undefined,
            default_value: "",
            is_required: false,
            order: 1,
        },
    });

    /* ---------- Load Custom Attributes ---------- */
    useEffect(() => {
        if (open && mode === "select") {
            loadCustomAttributes();
            loadGlobalAttributes()
        }
    }, [open, mode]);

    const loadCustomAttributes = async () => {
        try {
            // Asumiendo que tienes un método para obtener atributos
            const attributes = await onboardingService.getCustomAttributes();
            // setCustomAttributes(attributes);
            setCustomAttributes(attributes.results);
        } catch (error) {
            console.error("Error al cargar atributos:", error);
        }
    };

    const loadGlobalAttributes = async () => {
        try {
            // Asumiendo que tienes un método para obtener atributos
            const globalAttributes = await onboardingService.getGlobalAttributes();
            // setCustomAttributes(attributes);
            setGlobalAttributes(globalAttributes.results);
        } catch (error) {
            console.error("Error al cargar atributos:", error);
        }
    };


    const selectedCustom = assignForm.watch("custom_attribute")
    const selectedGlobal = assignForm.watch("global_attribute")

    useEffect(() => {
        if (selectedCustom) {
            assignForm.setValue("global_attribute", "")
        }
    }, [selectedCustom])

    useEffect(() => {
        if (selectedGlobal) {
            assignForm.setValue("custom_attribute", "")
        }
    }, [selectedGlobal])

    /* =======================
       SUBMIT FINAL
    ======================= */

    const handleSubmit = async () => {
        if (!templateId) return;

        try {
            setLoading(true);

            if (mode === "create") {
                /* 1️⃣ Crear atributo nuevo */
                const created = await onboardingService.createAttribute(
                    createForm.getValues()
                );

                /* 2️⃣ Asignar el atributo creado al template */
                const payload: AssignAttributeFormValues = {
                    custom_attribute: created.id.toString(),
                    global_attribute: undefined,
                    default_value: assignForm.getValues().default_value || "",
                    is_required: assignForm.getValues().is_required ?? false,
                    order: assignForm.getValues().order || 1,
                };

                const assigned = await onboardingService.assignAttribute(
                    templateId,
                    payload
                );
                console.log(assigned)

                onAttributeAdded(assigned);
            } else {
                /* Modo select: validar que haya seleccionado algo */
                const formValues = assignForm.getValues();

                if (!formValues.custom_attribute && !formValues.global_attribute) {
                    throw new Error("Debes seleccionar un atributo personalizado o global");
                }

                /* 2️⃣ Asignar atributo existente al template */
                const payload: AssignAttributeFormValues = {
                    custom_attribute: formValues.custom_attribute || undefined,
                    global_attribute: formValues.global_attribute || undefined,
                    default_value: formValues.default_value || "",
                    is_required: formValues.is_required ?? false,
                    order: formValues.order || 1,
                };

                const assigned = await onboardingService.assignAttribute(
                    templateId,
                    payload
                );
                console.log(assigned)

                onAttributeAdded(assigned);
            }

            /* 4️⃣ Reset + cerrar */
            createForm.reset();
            assignForm.reset();
            onClose();

        } catch (error) {
            console.error("Error al agregar atributo:", error);
        } finally {
            setLoading(false);
        }
    };

    // const handleSubmit = async () => {
    //     if (!templateId) return;

    //     try {
    //         setLoading(true);

    //         let attributeId: string;

    //         /* 1️⃣ Crear atributo si aplica */
    //         if (mode === "create") {
    //             const created = await onboardingService.createAttribute(
    //                 createForm.getValues()
    //             );
    //             attributeId = created.id.toString();
    //         } else {
    //             const customAttr = assignForm.getValues().custom_attribute;
    //             if (!customAttr) {
    //                 throw new Error("Debes seleccionar un atributo");
    //             }
    //             attributeId = customAttr;
    //         }

    //         /* 2️⃣ Asignar al template */
    //         const payload: AssignAttributeFormValues = {
    //             custom_attribute: attributeId,
    //             global_attribute: assignForm.getValues().global_attribute,
    //             default_value: assignForm.getValues().default_value || "",
    //             is_required: assignForm.getValues().is_required ?? false,
    //             order: assignForm.getValues().order || 1,
    //         };

    //         const assigned = await onboardingService.assignAttribute(
    //             templateId,
    //             payload
    //         );

    //         /* 3️⃣ Actualizar UI */
    //         onAttributeAdded(assigned);

    //         /* 4️⃣ Reset + cerrar */
    //         createForm.reset();
    //         assignForm.reset();
    //         onClose();

    //     } catch (error) {
    //         console.error("Error al agregar atributo:", error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    /* =======================
       RENDER
    ======================= */

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-xl">
                <DialogHeader>
                    <DialogTitle>Agregar atributo</DialogTitle>
                    <DialogDescription>
                        Crea un nuevo atributo o asigna uno existente a esta plantilla.
                    </DialogDescription>
                </DialogHeader>

                <Tabs value={mode} onValueChange={(v) => setMode(v as any)}>
                    <TabsList className="grid grid-cols-2 mb-6">
                        <TabsTrigger value="create">
                            Crear nuevo
                        </TabsTrigger>
                        <TabsTrigger value="select">
                            Usar existente
                        </TabsTrigger>
                    </TabsList>

                    {/* =======================
                        CREAR ATRIBUTO
                    ======================= */}
                    <TabsContent value="create" className="space-y-4">
                        <div className="space-y-2">
                            <Label>Nombre</Label>
                            <Input {...createForm.register("name")} />
                            {createForm.formState.errors.name && (
                                <p className="text-xs text-red-500 font-medium">
                                    {createForm.formState.errors.name.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label>Tipo de dato</Label>
                            <Controller
                                control={createForm.control}
                                name="data_type"
                                render={({ field }) => (
                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger className="h-11 rounded-lg">
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
                            {createForm.formState.errors.data_type && (
                                <p className="text-xs text-red-500 font-medium">
                                    {createForm.formState.errors.data_type.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label>Unidad de medida</Label>
                            <Input {...createForm.register("unit_of_measure")} />
                        </div>

                        <div className="space-y-2">
                            <Label>Descripción</Label>
                            <Textarea {...createForm.register("description")} />
                        </div>

                        <div className="flex items-center justify-between rounded-lg border p-4">
                            <div>
                                <p className="text-sm font-bold">
                                    Atributo activo
                                </p>
                            </div>

                            <Controller
                                control={createForm.control}
                                name="is_active"
                                render={({ field }) => (
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                )}
                            />
                        </div>
                    </TabsContent>

                    {/* =======================
                        ASIGNAR ATRIBUTO
                    ======================= */}
                    <TabsContent value="select" className="space-y-4">
                        <div className="space-y-2">
                            <Label>Atributo personalizado</Label>
                            <Controller
                                name="custom_attribute"
                                control={assignForm.control}
                                render={({ field }) => (
                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
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
                            {assignForm.formState.errors.custom_attribute && (
                                <p className="text-xs text-red-500 font-medium">
                                    {assignForm.formState.errors.custom_attribute.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label>Atributo global</Label>
                            <Controller
                                name="global_attribute"
                                control={assignForm.control}
                                render={({ field }) => (
                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger className="h-11 rounded-lg w-full">
                                            <SelectValue placeholder="Selecciona un atributo personalizado" />
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
                            {assignForm.formState.errors.global_attribute && (
                                <p className="text-xs text-red-500 font-medium">
                                    {assignForm.formState.errors.global_attribute.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label>Valor por defecto</Label>
                            <Input {...assignForm.register("default_value")} />
                        </div>

                        <div className="space-y-2">
                            <Label>Orden</Label>
                            <Input
                                type="number"
                                {...assignForm.register("order", {
                                    valueAsNumber: true,
                                })}
                            />
                            {assignForm.formState.errors.order && (
                                <p className="text-xs text-red-500 font-medium">
                                    {assignForm.formState.errors.order.message}
                                </p>
                            )}
                        </div>

                        <div className="flex items-center justify-between rounded-lg border p-4">
                            <Label>Requerido</Label>
                            <Controller
                                control={assignForm.control}
                                name="is_required"
                                render={({ field }) => (
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                )}
                            />
                        </div>
                    </TabsContent>
                </Tabs>

                <DialogFooter className="mt-6">
                    <Button variant="outline" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button onClick={handleSubmit} disabled={loading}>
                        {loading ? "Guardando..." : "Agregar atributo"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}