import React from 'react';
import {
  Grid,
  Typography,
  SxProps,
  Theme,
  Checkbox,
  FormControlLabel,
  FormControl,
  FormHelperText,
} from '@mui/material';
import { FieldValues, Controller, Control } from 'react-hook-form';
import { IControlledCheckBoxOptions, IFormField } from '@/models/forms';

interface IControlledMultiCheckedBoxProps {
  fieldData: IFormField;
  control: Control<FieldValues, any>;
  options: IControlledCheckBoxOptions;
  formControlSX?: SxProps<Theme>;
}

export const ControlledMultiCheckedBox: React.FC<
  IControlledMultiCheckedBoxProps
> = ({ fieldData, control, options, formControlSX }) => {
  return (
    <Grid container direction="column">
      <Grid item>
        <Typography>{fieldData.label}</Typography>
      </Grid>
      <Grid item>
        <Controller
          control={control}
          name={fieldData.fieldName}
          render={({
            field: { value, ref, onChange },
            fieldState: { error },
          }) => (
            <FormControl sx={formControlSX} margin="none" variant="outlined">
              {options.map(({ field, display }) => (
                <FormControlLabel
                  key={field}
                  control={
                    <Checkbox
                      inputRef={ref}
                      value={value ? value[field] : false}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>,
                      ) => {
                        const newVal = {
                          ...value,
                          [field]: event.target.checked,
                        };
                        onChange(newVal);
                      }}
                    />
                  }
                  label={display}
                />
              ))}

              <FormHelperText error={!!error}>{error?.message}</FormHelperText>
            </FormControl>
          )}
        />
      </Grid>
    </Grid>
  );
};
