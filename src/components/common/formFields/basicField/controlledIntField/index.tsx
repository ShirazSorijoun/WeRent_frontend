import React, { useMemo } from 'react';
import { InputBaseComponentProps, TextField } from '@mui/material';
import { IControlledBasicFieldTypeProps } from '../utils';
import { Controller } from 'react-hook-form';

interface ControlledIntFieldProps extends IControlledBasicFieldTypeProps {
  step?: number;
}

export const ControlledIntField: React.FC<ControlledIntFieldProps> = ({
  fieldData,
  control,
  sxStyle,
  isWithLabel = false,
  otherProps,
  step = 1,
}) => {
  const inputProps = useMemo(() => {
    const props: InputBaseComponentProps = { step };
    if (otherProps?.maxValue) props.max = otherProps?.maxValue;
    if (otherProps?.minValue) props.min = otherProps?.minValue;
    return props;
  }, [otherProps, step]);

  return (
    <Controller
      control={control}
      name={fieldData.fieldName}
      render={({ field: { value, onChange, ref }, fieldState: { error } }) => (
        <TextField
          inputRef={ref}
          sx={sxStyle}
          error={!!error}
          FormHelperTextProps={{ style: { textAlign: 'right' } }}
          placeholder={`enter ${fieldData.label}`}
          label={isWithLabel ? fieldData.label : ''}
          helperText={error?.message ?? ''}
          value={value ?? 0}
          type="number"
          InputProps={{ inputProps }}
          onChange={(e) => onChange(+e.target.value)}
          variant="outlined"
          fullWidth
        />
      )}
    />
  );
};
