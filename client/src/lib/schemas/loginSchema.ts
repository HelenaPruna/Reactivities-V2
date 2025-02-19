import { z } from "zod";

export const loginSchema = z.object({
    email: z.string({required_error: 'Camp obligatori'}).email({message: 'Correu invàlid'}),
    password: z.string({required_error: 'Camp obligatori'})
})

export type LoginSchema = z.infer<typeof loginSchema>;