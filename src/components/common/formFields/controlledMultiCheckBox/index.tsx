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
import { Controller, Control } from 'react-hook-form';
import { IControlledMultiCheckBoxOptions, IFormField } from '@/models/forms';

interface IControlledMultiCheckedBoxProps {
  fieldData: IFormField;
  control: Control<any>;
  options: IControlledMultiCheckBoxOptions;
  optionsColumns?: number;
  formControlSX?: SxProps<Theme>;
  gridSx?: SxProps<Theme>;
}

export const ControlledMultiCheckedBox: React.FC<
  IControlledMultiCheckedBoxProps
> = ({
  fieldData,
  control,
  options,
  formControlSX,
  optionsColumns = 1,
  gridSx = { direction: 'rtl', paddingBottom: '20px' },
}) => (
  <Grid container direction="column" sx={gridSx}>
    <Grid item>
      <Typography>{fieldData.label}</Typography>
    </Grid>
    <Grid item>
      <Controller
        control={control}
        name={fieldData.fieldName}
        render={({
          field: { value, onChange, disabled },
          fieldState: { error },
        }) => (
          <FormControl
            sx={formControlSX}
            margin="none"
            variant="outlined"
            disabled={disabled}
          >
            <Grid container columns={optionsColumns}>
              {options.map(({ field, display }) => (
                <Grid item key={field} xs={1}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={value?.[field] ?? false}
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
                </Grid>
              ))}
            </Grid>

            <FormHelperText error={!!error}>{error?.message}</FormHelperText>
          </FormControl>
        )}
      />
    </Grid>
  </Grid>
);
