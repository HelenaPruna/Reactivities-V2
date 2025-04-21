import dayjs from "dayjs";
import { z } from 'zod'

/**
 * 
 * @param dateOnly 
 * @param format format opcional:  
 *  - el default: 14 de Gener del 2025 / 14 d'Abril del 2025
 *  - "withWeekday": Dilluns, 14 de Gener del 2025 / Dilluns, 14 d'Abril del 2025
 *  - format diferent acceptat
 * @returns retorna la data en el format especificat o el default
 */
export function formatDateOnly(dateOnly: string, format?: string) {
    if (!dateOnly) return "Invalid date";
    const date = dayjs(dateOnly);
    if (!date.isValid()) {
        console.error("Error formatting date:", dateOnly);
        return "Invalid date";
    }
    const month = date.format("MMMM");
    const preposition = ['a', 'o'].includes(month[0].toLowerCase()) ? "d'" : "de "; // mes d'abril, agost i octubre

    const formatType = format === undefined
        ? `DD [${preposition}]MMMM [del] YYYY`
        : format === "withWeekday"
            ? `dddd[,] DD [${preposition}]MMMM [del] YYYY`
            : format

    return date.locale("ca").format(formatType);
}

export function dateInformation(dateOnlyStart:string, isOneTime: boolean, dateOnlyEnd: string) {
    if (isOneTime) return formatDateOnly(dateOnlyStart, "withWeekday");
    return `${formatDateOnly(dateOnlyStart)} - ${formatDateOnly(dateOnlyEnd)}`;
}

export function timeInformation(timeStart: string, timeEnd: string, dateStart: string, isOneTime: boolean) {
    const timeLabel = `${trimSeconds(timeStart)} - ${trimSeconds(timeEnd)}`;
    if (isOneTime) return timeLabel;
    return `${getWeekday(dateStart)}, ${timeLabel}`;
}

export function trimSeconds(time: string) {
    if (!/^\d\d:\d\d:\d\d$/.test(time)) {
        return time
    }
    return time.slice(0, 5)
}

export function getWeekday(dateOnly: string) {
    const rawWeekday = new Date(dateOnly).toLocaleDateString('ca-ES', { weekday: 'long' });
    const weekday = rawWeekday.charAt(0).toUpperCase() + rawWeekday.slice(1);
    return weekday;
}

export function getMonday(d: dayjs.Dayjs) {
    const dayIndex = d.day(); 
    const offset = dayIndex === 0 ? 6 : dayIndex - 1;
    return d.subtract(offset, "day").startOf("day");
}

export function getMinutes(time: string){
    const [hourStr, minuteStr] = time.split(':');
    return parseInt(hourStr, 10) * 60 + parseInt(minuteStr, 10);
};

export const requiredString = () => z
    .string({ required_error: 'Camp obligatori' })
    .min(1, { message: 'Camp obligatori' })


export function stringToColor(string: string) {
    let hash = 0;
    let i;
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
}

export function stringAvatar(name: string) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: name.split(' ').map(n => n[0]).join('').slice(0, 2), // Handles single-word names
    };
}