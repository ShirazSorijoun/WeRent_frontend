import { Controller } from 'react-hook-form';
import { IControlledBasicFieldTypeProps } from '../utils';
import { Switch, FormHelperText } from '@mui/material';

export const ControlledSwitch: React.FC<IControlledBasicFieldTypeProps> = ({
  fieldData,
  control,
  sxStyle,
}) => {
  return (
    <Controller
      control={control}
      name={fieldData.fieldName}
      render={({ field: { value, onChange, ref }, fieldState: { error } }) => (
        <>
          <Switch
            checked={value ?? false}
            onChange={onChange}
            inputProps={{ 'aria-label': 'controlled' }}
            inputRef={ref}
            sx={sxStyle}
          />

          <FormHelperText error={!!error}>{error?.message}</FormHelperText>
        </>
      )}
    />
  );
};
