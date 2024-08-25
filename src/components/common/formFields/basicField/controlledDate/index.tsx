import { Controller } from 'react-hook-form';
import { IControlledBasicFieldTypeProps } from '../utils';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DATE_TEXT_FORMAT } from '@/utils/date';

export const ControlledDate: React.FC<IControlledBasicFieldTypeProps> = ({
  fieldData,
  control,
  sxStyle,
  isWithLabel = false,
}) => {
  return (
    <Controller
      control={control}
      name={fieldData.fieldName}
      render={({
        field: { value, onChange, ref, disabled },
        fieldState: { error },
      }) => (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            disabled={disabled}
            inputRef={ref}
            label={isWithLabel ? fieldData.label : ''}
            sx={{ width: '100%', ...sxStyle }}
            slotProps={{ textField: { error: !!error } }}
            onChange={onChange}
            value={value ?? {}}
            format={DATE_TEXT_FORMAT}
          />
        </LocalizationProvider>
      )}
    />
  );
};
