import { z } from 'zod'
import { requiredString } from "../util/util";

export const registerSchema = z.object({
    email: z.string({required_error: 'Camp obligatori'}).email({message: 'Correu invàlid'}),
    displayName: requiredString(),
    password: requiredString(),
    role: requiredString()

})

export type RegisterSchema = z.infer<typeof registerSchema>;
