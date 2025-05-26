import { Autocomplete, Checkbox, ListItemText, TextField } from "@mui/material";
import { SelectInputProps } from "@mui/material/Select/SelectInput";
import { FieldValues, useController, UseControllerProps } from "react-hook-form";
import { useProfiles } from "../../../lib/hooks/useProfiles";

type Props<T extends FieldValues> = {
  label: string;
} & UseControllerProps<T> & Partial<SelectInputProps>;

export default function MultiSelectInput<T extends FieldValues>(props: Props<T>) {
  const { profiles } = useProfiles(); // només carrego els profiles aquí i no sempre 
  const { field, fieldState } = useController({ ...props });
  const selectedProfiles = profiles?.filter(p => (field.value).includes(p.id)) || [];

  return (
    <Autocomplete
      multiple
      options={profiles || []}
      disableCloseOnSelect
      getOptionLabel={option => option.displayName}
      value={selectedProfiles}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      onChange={(_, newValue) => {
        field.onChange(newValue.map(p => p.id));
      }}
      renderOption={(props, option, { selected }) => {
        const { key, ...rest } = props;
        return (
          <li key={key} {...rest}>
            <Checkbox
              style={{ marginRight: 8 }}
              checked={selected}
            />
            <ListItemText primary={option.displayName} />
          </li>
        );
      }}
      renderInput={params => (
        <TextField
          {...params}
          label={props.label}
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
        />
      )}
    />
  );
}
