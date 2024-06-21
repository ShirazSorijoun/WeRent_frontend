import { IFormField } from '@/models/forms';
import { SxProps, Theme } from '@mui/material';
import { Control, FieldValues } from 'react-hook-form';

export interface IControlledBasicFieldTypeProps {
  fieldData: IFormField;
  control: Control<FieldValues, any>;
  sxStyle?: SxProps<Theme>;
  isWithLabel?: boolean;
  otherProps?: any;
}
