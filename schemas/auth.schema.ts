import * as z from "zod";


export const loginSchema = z.object({
    email: z.email("Email inválido"),

    password: z
        .string()
        .min(8, "La contraseña debe tener al menos 8 caracteres"),
});

export const registerSchema = z.object({
    email: z
        .string()
        .email("Email inválido"),

    password: z
        .string()
        .min(8, "La contraseña debe tener al menos 8 caracteres"),
    re_password: z
        .string()
        .min(8, "La confirmación es obligatoria"),
}).refine((data) => data.password === data.re_password, {
    message: "Las contraseñas no coinciden",
    path: ["re_password"],
});;

export type RegisterFormValues = z.infer<typeof registerSchema>;