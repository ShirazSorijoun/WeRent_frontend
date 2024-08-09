import { IControlledBasicFieldTypeProps } from '../utils';
import { Controller } from 'react-hook-form';
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
  FormControl,
} from '@mui/material';

export const ControlledBoolean: React.FC<IControlledBasicFieldTypeProps> = ({
  fieldData,
  control,
  sxStyle,
}) => {
  return (
    <Controller
      control={control}
      name={fieldData.fieldName}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <FormControl sx={sxStyle} margin="none" variant="outlined">
          <RadioGroup
            value={value}
            onChange={(e, selectedVal) => {
              onChange(selectedVal === 'true');
            }}
          >
            <FormControlLabel
              key="Yes"
              value={true}
              control={<Radio />}
              label="Yes"
            />
            <FormControlLabel
              key="No"
              value={false}
              control={<Radio />}
              label="No"
            />
          </RadioGroup>
          <FormHelperText error={!!error}>{error?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
};
