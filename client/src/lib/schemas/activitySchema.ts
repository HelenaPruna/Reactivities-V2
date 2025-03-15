import { z } from 'zod'
import { requiredString } from '../util/util';

    
export const activitySchema = z.object({
    title: requiredString(),
    description: requiredString(),
    category: requiredString(),
    date: z.coerce.date({
        message: 'Camp obligatori'
    }),
    room: requiredString(),
    maxParticipants: z.coerce.number({
        message: 'Camp obligatori'
    }).int().positive({message: 'El número màxim de participants ha de ser postiu'}),
    allowedMissedDays: z.coerce.number({
        message: 'Camp obligatori'
    }).int().positive({message: 'El número màxim de faltes ha de ser postiu'})   
})

export type ActivitySchema = z.infer<typeof activitySchema>;