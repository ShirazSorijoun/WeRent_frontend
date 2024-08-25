import React, { useMemo } from 'react';
import {
  MenuItem,
  FormControl,
  Select,
  FormHelperText,
  Grid,
  Typography,
  SxProps,
  Theme,
} from '@mui/material';
import { RefCallBack, FieldError, Controller, Control } from 'react-hook-form';
import { IControlledSelectArray, IFormField } from '@/models/forms';

interface ControlledSelectProps {
  fieldData: IFormField;
  control: Control<any>;
  valuesArray: IControlledSelectArray<any>;
  formControlSX?: SxProps<Theme>;
  menuSX?: SxProps<Theme>;
  gridSx?: SxProps<Theme>;
  noPlaceHolder?: boolean;
}

export const ControlledSelect: React.FC<ControlledSelectProps> = ({
  fieldData,
  control,
  valuesArray,
  formControlSX,
  noPlaceHolder = false,
  menuSX = { direction: 'rtl' },
  gridSx = { direction: 'rtl', paddingBottom: '20px' },
}) => {
  const placeholderText = useMemo(
    () =>
      noPlaceHolder ? (
        ''
      ) : (
        <div style={{ color: '#ababab' }}>בחר {fieldData.label}</div>
      ),
    [fieldData.label, noPlaceHolder],
  );

  const valuesToRender = useMemo(
    () =>
      valuesArray.map(({ value, display }, index) => (
        <MenuItem key={index} value={value}>
          {display}
        </MenuItem>
      )),
    [valuesArray],
  );

  const renderSelect = (
    value: any,
    onChange: any,
    ref?: RefCallBack,
    error?: FieldError,
    disabled?: boolean,
  ) => {
    const isError = !!error;
    const errorText = error?.message;
    return (
      <FormControl
        sx={formControlSX ?? { width: '100%' }}
        margin="none"
        variant="outlined"
      >
        <Select
          disabled={disabled}
          inputRef={ref}
          error={isError}
          value={value ?? ''}
          onChange={onChange}
          displayEmpty
          fullWidth
          renderValue={(selected) => {
            return selected
              ? valuesArray.find((item) => item.value === selected)?.display
              : placeholderText;
          }}
          MenuProps={{
            sx: menuSX,
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'center',
            },
          }}
        >
          {valuesToRender}
        </Select>
        <FormHelperText error={isError}>{errorText}</FormHelperText>
      </FormControl>
    );
  };

  return (
    <Grid container direction="column" sx={gridSx}>
      <Grid item>
        <Typography>{fieldData.label}</Typography>
      </Grid>
      <Grid item>
        <Controller
          control={control}
          name={fieldData.fieldName}
          render={({
            field: { value, onChange, ref, disabled },
            fieldState: { error },
          }) => renderSelect(value, onChange, ref, error, disabled)}
        />
      </Grid>
    </Grid>
  );
};
