import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, FormHelperText, RadioGroupProps } from '@mui/material';
import { FieldValues, useController, UseControllerProps } from 'react-hook-form';

type Props<T extends FieldValues> = {
    items: { text: string, value: string | number }[];
    label?: string;
} & UseControllerProps<T> & Partial<RadioGroupProps>;

export default function RadioInput<T extends FieldValues>( props: Props<T>) {
    const { items, label, ...controllerProps } = props;
    const { field, fieldState } = useController(controllerProps);

    return (
        <FormControl component="fieldset" error={!!fieldState.error}>
            {label && <FormLabel component="legend">{label}</FormLabel>}
            <RadioGroup
                {...field}
                row
                value={field.value ?? ''}
                onChange={(e) => field.onChange(e.target.value)}
            >
                {items.map((item) => (
                    <FormControlLabel
                        key={item.value}
                        value={item.value}
                        control={<Radio size="small" />}
                        label={item.text}
                    />
                ))}
            </RadioGroup>
            {fieldState.error && (
                <FormHelperText>{fieldState.error.message}</FormHelperText>
            )}
        </FormControl>
    );
}
