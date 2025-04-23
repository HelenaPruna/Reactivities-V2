import { TimePicker, TimePickerProps } from "@mui/x-date-pickers";
import { FieldValues, useController, UseControllerProps } from "react-hook-form";
import dayjs, { Dayjs } from "dayjs";

type Props<T extends FieldValues> = {} & UseControllerProps<T> & TimePickerProps<Dayjs>;

export default function TimeInput<T extends FieldValues>(props: Props<T>) {
    const { name, ...restProps } = props;
    const { field, fieldState } = useController({ name, ...restProps });
    const minTime = dayjs("2020-10-10 8:00")
    const maxTime = dayjs("2020-10-10 21:00")
    return (
        <TimePicker
            label={restProps.label}
            value={field.value ? dayjs(field.value, "HH:mm:ss") : null}
            onChange={(value) => {
                field.onChange(value ? value.format("HH:mm:ss") : "");
            }}
            sx={{ width: "100%" }}
            slotProps={{
                textField: {
                    onBlur: field.onBlur,
                    error: !!fieldState.error,
                    helperText: fieldState.error?.message,
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
            minTime={minTime}
            maxTime={maxTime}
            skipDisabled={true}
            ampm={false} 
        />
    );
}