import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import { SelectInputProps } from "@mui/material/Select/SelectInput";
import { FieldValues, useController, UseControllerProps } from "react-hook-form";
import { useProfiles } from "../../../lib/hooks/useProfiles";

type Props<T extends FieldValues> = {
  label: string;
} & UseControllerProps<T> & Partial<SelectInputProps>;

export default function MultiSelectInput<T extends FieldValues>(props: Props<T>) {
  const { profiles } = useProfiles(); // només carrego els profiles aquí i no sempre 
  const { field, fieldState } = useController({ ...props });
  
  return (
    <FormControl fullWidth error={!!fieldState.error}>
      <InputLabel>{props.label}</InputLabel>
      <Select
        multiple
        value={field.value || []}
        label={props.label}
        onChange={field.onChange}
      >
        {profiles?.map(profile => (
          <MenuItem key={profile.id} value={profile.id}>
            {profile.displayName}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{fieldState.error?.message}</FormHelperText>
    </FormControl>
  );
}
