import { z } from "zod";
import { requiredString } from "../util/util";

export const requestSchema = z.object({
    type: z.coerce.number({ message: 'Camp obligatori' }).int(),
    message: requiredString(),
    activityId: z.coerce.string().optional()
})

export type RequestSchema = z.infer<typeof requestSchema>;