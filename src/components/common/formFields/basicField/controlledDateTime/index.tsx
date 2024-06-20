import { Controller } from 'react-hook-form';
import { IControlledBasicFieldTypeProps } from '../utils';
import { LocalizationProvider, DateTimeField } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DATE_TEXT_FORMAT } from '@/utils/date';

export const ControlledDateTime: React.FC<IControlledBasicFieldTypeProps> = ({
  fieldData,
  control,
  sxStyle,
  isWithLabel = false,
}) => {
  return (
    <Controller
      control={control}
      name={fieldData.fieldName}
      render={({ field: { value, onChange, ref }, fieldState: { error } }) => (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimeField
            fullWidth
            inputRef={ref}
            label={isWithLabel ? fieldData.label : ''}
            style={{ direction: 'ltr' }}
            sx={sxStyle}
            FormHelperTextProps={{
              error: !error,
              style: { textAlign: 'right' },
            }}
            slotProps={{ textField: { error: !!error } }}
            helperText={error?.message ?? ''}
            ampm={false}
            onChange={onChange}
            value={value}
            format={DATE_TEXT_FORMAT}
          />
        </LocalizationProvider>
      )}
    />
  );
};
