import { DateArg, format } from "date-fns";
import { ca } from "date-fns/locale";
import { z } from 'zod'



export function formatDate(date: DateArg<Date>) {
    return format(date, "dd MMMMMM yyyy, HH:mm", {locale: ca});
}

export const requiredString = () => z
    .string({required_error: 'Camp obligatori'})
    .min(1, { message: 'Camp obligatori' })