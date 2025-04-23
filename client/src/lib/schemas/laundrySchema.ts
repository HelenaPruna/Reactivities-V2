import { z } from 'zod'
import { requiredString } from '../util/util'

export const laundrySchema = z.object({
    name: requiredString(),
    start: z.coerce.date({
        message: 'Camp obligatori'
    }),
    isRecurrent: z.coerce.boolean().default(false)
}).superRefine((data, ctx) => {
    const date = data.start
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const tooEarly = hours < 9
    const tooLate = hours > 17 || (hours === 17 && minutes > 30)
    if (tooEarly || tooLate) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "L'hora sel·leccionada no és vàlida (9:00-17:30).",
            path: ["start"],
        });
    }
});

export type LaundrySchema = z.infer<typeof laundrySchema>;