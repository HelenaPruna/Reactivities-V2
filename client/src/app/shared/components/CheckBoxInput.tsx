import { FormControlLabel } from '@mui/material';
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';
import { FieldValues, useController, UseControllerProps } from "react-hook-form"

type Props<T extends FieldValues> = {
    label: string;
} & UseControllerProps<T> & CheckboxProps

export default function CheckBoxInput<T extends FieldValues>(props: Props<T>) {
    const { field } = useController({ ...props });
    return (
        <FormControlLabel
            control={
                <Checkbox
                    {...props}
                    {...field}
                    defaultChecked={field.value || false}
                />
            }
            label={props.label}
        />
    )
}