import { DatePicker, DatePickerProps } from "@mui/x-date-pickers"
import { FieldValues, useController, UseControllerProps } from "react-hook-form"
import dayjs, { Dayjs } from "dayjs";
import { isWeekend } from "../../../lib/util/util";


type Props<T extends FieldValues> = {} & UseControllerProps<T> & DatePickerProps<Dayjs>

export default function DateInput<T extends FieldValues>(props: Props<T>) {
    const { field, fieldState } = useController({ ...props });
    return (
        <DatePicker
            {...props}
            value={field.value ? dayjs(field.value) : null}
            onChange={value => {
                field.onChange(value ? value.format('YYYY-MM-DD') : '')
            }}
            sx={{ width: '100%' }}
            slotProps={{
                textField: {
                    onBlur: field.onBlur,
                    error: !!fieldState.error,
                    helperText: fieldState.error?.message
                }
            }}
            shouldDisableDate={isWeekend}
            dayOfWeekFormatter={(weekday) => `${weekday.format('dd')}.`}
        />
    )
}