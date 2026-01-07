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