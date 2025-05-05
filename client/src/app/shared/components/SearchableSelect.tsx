import { Autocomplete, TextField } from "@mui/material";
import { FieldValues, useController, UseControllerProps } from "react-hook-form";

type Item = { text: string; value: string | number };

type Props<T extends FieldValues> = {
  items: Item[];
  label?: string;
} & UseControllerProps<T>;

export default function SearchableSelect<T extends FieldValues>(props: Props<T>) {
  const { field, fieldState } = useController({ ...props });
  const current = props.items.find(i => i.value === field.value) ?? null;

  return (
    <Autocomplete
      options={props.items}
      getOptionLabel={option => option.text}
      isOptionEqualToValue={(opt, val) => opt.value === val.value}
      value={current}
      onChange={(_, newVal) => field.onChange(newVal ? newVal.value : null)}
      renderInput={params => (
        <TextField
          {...params}
          label={props.label}
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
        />
      )}
      fullWidth
    />
  );
}
