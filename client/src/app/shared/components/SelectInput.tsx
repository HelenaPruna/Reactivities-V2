import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import { SelectInputProps } from "@mui/material/Select/SelectInput";
import { FieldValues, useController, UseControllerProps } from "react-hook-form"

type Props<T extends FieldValues> = {
    items: { text: string, value: string | number }[];
    label?: string;
    size?: boolean
} & UseControllerProps<T> & Partial<SelectInputProps>

export default function SelectInput<T extends FieldValues>(props: Props<T>) {
    const size = props.size ? "medium" : "small" 
    const {field, fieldState} = useController({...props});
    return (
        <FormControl fullWidth error={!!fieldState.error} size={size}>
            <InputLabel>{props.label}</InputLabel>
            <Select
                value={field.value ?? ""}
                label={props.label}
                onChange={field.onChange}
            >
                {props.items.map(item => (
                    <MenuItem key={item.value} value={item.value}>
                        {item.text}
                    </MenuItem>
                ))}
            </Select>
            <FormHelperText>{fieldState.error?.message}</FormHelperText>
        </FormControl>   

    )
}