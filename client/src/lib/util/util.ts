import { DateArg, format } from "date-fns";
import {ca} from "date-fns/locale";


export function formatDate(date: DateArg<Date>) {
    return format(date, "dd MMMMMM yyyy, HH:mm", {locale: ca});
}