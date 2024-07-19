import { IControlledSelectArray } from '@/models';
import { ControlledSelect } from '../../controlledSelect';
import { IControlledBasicFieldTypeProps } from '../utils';

const booleanSelectFieldValues: IControlledSelectArray = [
  { display: 'Yes', value: 'Yes' },
  { display: 'No', value: 'No' },
];

export const ControlledBoolean: React.FC<IControlledBasicFieldTypeProps> = ({
  fieldData,
  control,
  sxStyle,
  otherProps,
}) => {
  return (
    <ControlledSelect
      valuesArray={booleanSelectFieldValues}
      control={control}
      fieldData={fieldData}
      noPlaceHolder={otherProps?.noPlaceHolder ?? false}
      formControlSX={sxStyle}
    />
  );
};
