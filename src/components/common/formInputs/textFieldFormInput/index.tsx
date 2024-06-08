import { TextField } from "@mui/material";
import { FC } from "react";
import { Controller } from "react-hook-form";
import { IFormFieldInput } from "@/models/form";

interface ITextFieldFormInputProps extends IFormFieldInput {
  isMultiline?: boolean;
  type?: React.HTMLInputTypeAttribute;
  isDisabled?: boolean;
  labelOverride?: string;
}

export const TextFieldFormInput: FC<ITextFieldFormInputProps> = ({
  control,
  formData,
  isMultiline = false,
  type = "text",
  isDisabled = false,
  labelOverride,
}) => {
  return (
    <Controller
      name={formData.fieldName}
      control={control}
      render={({ field: { name, onChange, value }, fieldState: { error } }) => (
        <TextField
          variant="outlined"
          margin="dense"
          fullWidth
          type={type}
          maxRows={4}
          multiline={isMultiline}
          sx={formData.sxStyle}
          placeholder={formData.placeholder ?? ""}
          label={labelOverride || formData.label}
          name={name}
          disabled={isDisabled}
          value={value ?? ""}
          onChange={onChange}
          error={!!error}
          helperText={error?.message}
        />
      )}
    />
  );
};
