import { IControlledSelectArray } from '@/models';
import { IControlledBasicFieldTypeProps } from '../utils';
import { ControlledRadioGroup } from '../../controlledRadioGroup';

const booleanSelectFieldValues: IControlledSelectArray = [
  { display: 'Yes', value: true },
  { display: 'No', value: false },
];

export const ControlledBoolean: React.FC<IControlledBasicFieldTypeProps> = ({
  fieldData,
  control,
  sxStyle,
}) => {
  return (
    <ControlledRadioGroup
      options={booleanSelectFieldValues}
      control={control}
      fieldData={fieldData}
      formControlSX={sxStyle}
    />
  );
};
