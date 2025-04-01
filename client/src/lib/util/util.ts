import dayjs from "dayjs";
import { z } from 'zod'


export function formatDateOnly(dateOnly: string) {
    if (!dateOnly) return "Invalid date";

    const date = dayjs(dateOnly);
    if (!date.isValid()) {
      console.error("Error formatting date:", dateOnly);
      return "Invalid date";
    }
    return date.locale("ca").format("DD [de] MMMM [del] YYYY");
}


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