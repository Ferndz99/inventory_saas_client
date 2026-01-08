// app/onboarding/company/schema.ts
import { z } from 'zod'

export const createCompanySchema = z.object({
    company_name: z
        .string()
        .min(2, 'El nombre de la empresa es muy corto'),
    company_rut: z
        .string()
        .min(8, 'Ingresa un RUT válido'),
})

export type CreateCompanyFormValues = z.infer<
    typeof createCompanySchema
>

export const createCategorySchema = z.object({
    name: z
        .string()
        .min(2, "El nombre debe tener al menos 2 caracteres"),
    is_active: z.boolean().default(true).optional(),
});

export type CreateCategoryForm = z.infer<typeof createCategorySchema>;



export const templateSchema = z.object({
    name: z
        .string()
        .min(2, "El nombre debe tener al menos 2 caracteres"),
    description: z.string().optional(),
    is_active: z.boolean().default(true).optional(),
});

export type TemplateFormValues = z.infer<typeof templateSchema>;


export const attributeSchema = z.object({
    name: z.string().min(2, "El nombre es obligatorio"),
    data_type: z.enum(["text", "number", "decimal", "boolean", "date"]),
    unit_of_measure: z.string().optional(),
    description: z.string().optional(),
    is_active: z.boolean().default(true).optional(),
});

export type AttributeFormValues = z.infer<typeof attributeSchema>;


export const assignAttributeSchema = z
    .object({
        custom_attribute: z.number().nullable(),
        global_attribute: z.number().nullable(),
        is_required: z.boolean(),
        order: z.number().int().min(1),
        default_value: z.string().nullable(),
    })
    .refine(
        (data) => data.custom_attribute !== null || data.global_attribute !== null,
        {
            message: "Debes seleccionar al menos un atributo personalizado o global",
            path: ["custom_attribute"],
        }
    );

export type AssignAttributeFormValues = z.infer<
    typeof assignAttributeSchema
>;
