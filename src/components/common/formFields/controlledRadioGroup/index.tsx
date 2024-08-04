import React from 'react';
import {
  Grid,
  Typography,
  SxProps,
  Theme,
  FormControlLabel,
  FormControl,
  FormHelperText,
  RadioGroup,
  Radio,
} from '@mui/material';
import { FieldValues, Controller, Control } from 'react-hook-form';
import { IControlledSelectArray, IFormField } from '@/models/forms';

interface IControlledRadioGroupProps {
  fieldData: IFormField;
  control: Control<FieldValues, any>;
  options: IControlledSelectArray;
  formControlSX?: SxProps<Theme>;
}

export const ControlledRadioGroup: React.FC<IControlledRadioGroupProps> = ({
  fieldData,
  control,
  options,
  formControlSX,
}) => {
  return (
    <Grid container direction="column">
      <Grid item>
        <Typography>{fieldData.label}</Typography>
      </Grid>
      <Grid item>
        <Controller
          control={control}
          name={fieldData.fieldName}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <FormControl sx={formControlSX} margin="none" variant="outlined">
              <RadioGroup value={value} onChange={onChange}>
                {options.map((option) => (
                  <FormControlLabel
                    key={option.value}
                    control={<Radio />}
                    label={option.display}
                  />
                ))}
              </RadioGroup>
              <FormHelperText error={!!error}>{error?.message}</FormHelperText>
            </FormControl>
          )}
        />
      </Grid>
    </Grid>
  );
};
