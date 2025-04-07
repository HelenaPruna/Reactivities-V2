import { z } from 'zod'
import { requiredString } from '../util/util';

export const recurrenceSchema = z.object({
    date: requiredString().regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: "La data ha de ser en format YYYY-MM-DD"
    }),
    timeStart: requiredString().regex(/^\d{2}:\d{2}(:\d{2})?$/, {
        message: "L'hora d'inici ha de ser en format HH:mm o HH:mm:ss"
    }),
    timeEnd: requiredString().regex(/^\d{2}:\d{2}(:\d{2})?$/, {
        message: "L'hora de final ha de ser en format HH:mm o HH:mm:ss"
    })
}).superRefine((data, ctx) => {
    const startDateTime = new Date(`${data.date}T${(data.timeStart)}`);
    const endDateTime = new Date(`${data.date}T${(data.timeEnd)}`);
    if (endDateTime <= startDateTime) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "L'hora de final ha de ser posterior a l'hora d'inici",
            path: ["timeEnd"],
        });
    }
});

export type RecurrenceSchema = z.infer<typeof recurrenceSchema>;