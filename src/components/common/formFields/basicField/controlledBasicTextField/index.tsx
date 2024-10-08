import React, { HTMLInputTypeAttribute } from 'react';
import { InputBaseComponentProps, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { IControlledBasicFieldTypeProps } from '../utils';

interface ControlledBasicTextFieldProps extends IControlledBasicFieldTypeProps {
  type?: HTMLInputTypeAttribute;
  inputProps?: InputBaseComponentProps;
  isMultiline?: boolean;
}

export const ControlledBasicTextField: React.FC<
  ControlledBasicTextFieldProps
> = ({
  fieldData,
  control,
  sxStyle,
  isWithLabel = false,
  type = 'text',
  inputProps = {},
  isMultiline = false,
}) => {
  return (
    <Controller
      control={control}
      name={fieldData.fieldName}
      render={({
        field: { value, onChange, ref, disabled },
        fieldState: { error },
      }) => (
        <TextField
          disabled={disabled}
          inputRef={ref}
          sx={sxStyle}
          error={!!error}
          placeholder={`הכנס ${fieldData.label}`}
          label={isWithLabel ? fieldData.label : ''}
          helperText={error?.message ?? ''}
          value={value ?? ''}
          maxRows={4}
          multiline={isMultiline}
          type={type}
          InputProps={{ inputProps }}
          onChange={onChange}
          variant="outlined"
          fullWidth
        />
      )}
    />
  );
};
