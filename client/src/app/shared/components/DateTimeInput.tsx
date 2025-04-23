import { FieldValues, useController, UseControllerProps } from "react-hook-form";
import{ DateTimePicker, DateTimePickerProps } from '@mui/x-date-pickers'
import dayjs, { Dayjs } from "dayjs";
import { isWeekend } from "../../../lib/util/util";

type Props<T extends FieldValues> = {} & UseControllerProps<T> & DateTimePickerProps<Dayjs>

export default function DateTimeInput<T extends FieldValues>(props:Props<T>) {
    const { field, fieldState } = useController({ ...props });
    const minTime = dayjs("2020-10-10 9:00")
    const maxTime = dayjs("2020-10-10 17:30")
    
    return (
        <DateTimePicker 
            {...props}
            timezone="UTC"
            value={field.value ? dayjs(field.value) : null}
            onChange={(value) => {
                field.onChange(value ? value : '')
            }}
            sx={{width: '100%'}}
            slotProps={{
                textField: {
                    onBlur: field.onBlur,
                    error: !!fieldState.error,
                    helperText: fieldState.error?.message
                },
                digitalClockSectionItem: {
                    sx: {
                        minWidth: 80, 
                    },
                },
                popper: {
                    sx: {
                        '& .MuiMultiSectionDigitalClockSection-root': {
                            minWidth: 80, 
                        },
                    },
                }
                
            }}
            shouldDisableDate={isWeekend}
            minTime={minTime}
            maxTime={maxTime}
            skipDisabled
            dayOfWeekFormatter={(weekday) => `${weekday.format('dd')}.`}
            ampm={false}
        />
    )

}