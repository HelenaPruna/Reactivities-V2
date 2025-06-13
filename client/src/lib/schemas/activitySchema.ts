import { z } from 'zod'
import { requiredString } from '../util/util';


export const activitySchema = z.object({
    title: requiredString(),
    description: z.coerce.string().optional(),
    maxParticipants: z.coerce
        .number({ message: 'Camp obligatori' }).int()
        .positive({ message: 'El nombre de participants ha de ser postiu' })
        .max(40, { message: 'El nombre màxim de participants és de 40 persones' }),
    allowedMissedDays: z.coerce.number({
        message: 'Camp obligatori'
    }).int().positive({ message: 'El número màxim de faltes ha de ser postiu' }).optional(),
    dateStart: requiredString().regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: "La data d'inici ha de ser en format YYYY-MM-DD"
    }),
    dateEnd: requiredString().regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: "La data de final ha de ser en format YYYY-MM-DD"
    }).optional(),
    timeStart: requiredString().regex(/^\d{2}:\d{2}(:\d{2})?$/, {
        message: "L'hora d'inici ha de ser en format HH:mm o HH:mm:ss"
    }),
    timeEnd: requiredString().regex(/^\d{2}:\d{2}(:\d{2})?$/, {
        message: "L'hora de final ha de ser en format HH:mm o HH:mm:ss"
    }),
    interval: z.coerce.number().int().positive(
        { message: "L'interval de dies ha de ser positiu" }
    ).optional(),
    isOneDay: z.coerce.boolean().default(false)

}).superRefine((data, ctx) => {
    if (data.dateEnd && !data.isOneDay) {
        const start = new Date(data.dateStart);
        const end = new Date(data.dateEnd);
        if (end <= start) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "La data de final no pot ser la mateixa o anterior a l'inicial",
                path: ['dateEnd']
            });
        }
    }
    if (!data.isOneDay) {
        if (data.allowedMissedDays === undefined || data.allowedMissedDays === null) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "El nombre màxim de faltes és obligatori quan l'activitat no és d'un sol dia",
                path: ["allowedMissedDays"],
            });
        }
        if (data.interval === undefined || data.interval === null) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "L'interval en dies és obligatori quan l'activitat no és d'un sol dia",
                path: ["interval"],
            });
        }
        if (data.dateEnd === undefined || data.dateEnd === null) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "L'interval en dies és obligatori quan l'activitat no és d'un sol dia",
                path: ["dateEnd"],
            });
        }
    }

    const startDateTime = new Date(`${data.dateStart}T${(data.timeStart)}`);
    const endDateTime = new Date(`${data.dateStart}T${(data.timeEnd)}`);
    if (endDateTime <= startDateTime) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "L'hora de final ha de ser posterior a l'hora d'inici",
            path: ["timeEnd"],
        });
    }
});


export type ActivitySchema = z.infer<typeof activitySchema>;