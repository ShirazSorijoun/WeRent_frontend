import React, { useMemo } from 'react';
import { InputBaseComponentProps } from '@mui/material';
import { IControlledBasicFieldTypeProps } from '../utils';
import { ControlledBasicTextField } from '../controlledBasicTextField';

export const ControlledIntField: React.FC<IControlledBasicFieldTypeProps> = ({
  fieldData,
  control,
  sxStyle,
  isWithLabel = false,
  otherProps,
}) => {
  const inputProps = useMemo(() => {
    const props: InputBaseComponentProps = {};
    if (otherProps?.maxValue) props.max = otherProps?.maxValue;
    if (otherProps?.minValue) props.min = otherProps?.minsValue;
    return props;
  }, [otherProps]);

  return (
    <ControlledBasicTextField
      control={control}
      fieldData={fieldData}
      isWithLabel={isWithLabel}
      type="number"
      sxStyle={sxStyle}
      inputProps={inputProps}
    />
  );
};
