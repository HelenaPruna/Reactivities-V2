import { string, z } from 'zod'
import { requiredString } from '../util/util'

export const attendeeSchema = z.object({
    identifier: requiredString(),
    comments: string().optional()
})

export type AttendeeSchema = z.infer<typeof attendeeSchema>;