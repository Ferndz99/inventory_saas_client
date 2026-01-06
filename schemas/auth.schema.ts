import * as z from "zod";


export const loginSchema = z.object({
    email: z.email("Email inválido"),

    password: z
        .string()
        .min(8, "La contraseña debe tener al menos 8 caracteres"),
});