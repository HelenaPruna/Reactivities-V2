import { z } from 'zod'
import { requiredString } from '../util/util';


export const activitySchema = z.object({
    title: requiredString(),
    description: requiredString(),
    room: requiredString(),
    maxParticipants: z.coerce.number({
        message: 'Camp obligatori'
    }).int().positive({ message: 'El número màxim de participants ha de ser postiu' }),
    allowedMissedDays: z.coerce.number({
        message: 'Camp obligatori'
    }).int().positive({ message: 'El número màxim de faltes ha de ser postiu' }).default(1),

    // Date validation in YYYY-MM-DD format
    dateStart: requiredString().regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: "La data d'inici ha de ser en format YYYY-MM-DD"
    }),
    dateEnd: requiredString().regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: "La data de final ha de ser en format YYYY-MM-DD"
    }).optional(),
    // Time validation in HH:mm or HH:mm:ss format
    timeStart: requiredString().regex(/^\d{2}:\d{2}(:\d{2})?$/, {
        message: "L'hora d'inici ha de ser en format HH:mm o HH:mm:ss"
    }),
    timeEnd: requiredString().regex(/^\d{2}:\d{2}(:\d{2})?$/, {
        message: "L'hora de final ha de ser en format HH:mm o HH:mm:ss"
    }),
    interval: z.coerce.number().int().nonnegative(
        { message: "L'interval de dates ha de ser positiu" }
    ).default(1),
    isOneDay: z.coerce.boolean().default(false)

}).superRefine((data, ctx) => {
    // Only compare if dateEnd is provided
    if (data.dateEnd) {
        // Convert ISO date strings to Date objects for comparison
        const start = new Date(data.dateStart);
        const end = new Date(data.dateEnd);
        if (end < start) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "La data de final no pot ser abans de la data d'inici",
                path: ['dateEnd']
            });
        }
    }
    // Validate that interval > 0 if isOneDay is false
    if (!data.isOneDay && data.interval <= 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "L'interval ha de ser major a 0 dies",
          path: ['intervalVal']
        });
      }
});


export type ActivitySchema = z.infer<typeof activitySchema>;