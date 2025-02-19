import { z } from 'zod'
import { requiredString } from '../util/util';

    
export const activitySchema = z.object({
    title: requiredString(),
    description: requiredString(),
    category: requiredString(),
    date: z.coerce.date({
        message: 'Camp obligatori'
    }),
    room: requiredString()
})

export type ActivitySchema = z.infer<typeof activitySchema>;