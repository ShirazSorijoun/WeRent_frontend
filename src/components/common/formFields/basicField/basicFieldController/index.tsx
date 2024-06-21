import React, { useMemo } from 'react';
import { Grid, Typography } from '@mui/material';
import { IControlledBasicFieldTypeProps } from '../utils';
import { EBasicFieldType } from '@/models/forms';
import { ControlledDateTime } from '../controlledDateTime';
import { ControlledFloatField } from '../controlledFloatField';
import { ControlledIntField } from '../controlledIntField';
import { ControlledTextArray } from '../controlledTextArray';
import { ControlledBasicTextField } from '../controlledBasicTextField';
import { ControlledCoordinateInput } from '../controlledCoordinateInput';

interface IBasicFieldControllerProps extends IControlledBasicFieldTypeProps {
  type?: EBasicFieldType;
}

export const BasicFieldController: React.FC<IBasicFieldControllerProps> = ({
  fieldData,
  control,
  sxStyle,
  isWithLabel = false,
  otherProps,
  type,
}) => {
  const componentToUse = useMemo(() => {
    switch (type) {
      case EBasicFieldType.date:
        return (
          <ControlledDateTime
            control={control}
            fieldData={fieldData}
            sxStyle={sxStyle}
            isWithLabel={isWithLabel}
            otherProps={otherProps}
          />
        );
      case EBasicFieldType.float:
        return (
          <ControlledFloatField
            control={control}
            fieldData={fieldData}
            sxStyle={sxStyle}
            isWithLabel={isWithLabel}
            otherProps={otherProps}
          />
        );
      case EBasicFieldType.int:
        return (
          <ControlledIntField
            control={control}
            fieldData={fieldData}
            sxStyle={sxStyle}
            isWithLabel={isWithLabel}
            otherProps={otherProps}
          />
        );
      case EBasicFieldType.textArray:
        return (
          <ControlledTextArray
            control={control}
            fieldData={fieldData}
            sxStyle={sxStyle}
            isWithLabel={isWithLabel}
            otherProps={otherProps}
          />
        );
      case EBasicFieldType.multiLineText:
        return (
          <ControlledBasicTextField
            control={control}
            fieldData={fieldData}
            sxStyle={sxStyle}
            isWithLabel={isWithLabel}
            otherProps={otherProps}
            isMultiline
          />
        );
      case EBasicFieldType.coordinate:
        return (
          <ControlledCoordinateInput
            control={control}
            fieldData={fieldData}
            sxStyle={sxStyle}
            isWithLabel={isWithLabel}
            otherProps={otherProps}
          />
        );
      default:
        return (
          <ControlledBasicTextField
            control={control}
            fieldData={fieldData}
            sxStyle={sxStyle}
            isWithLabel={isWithLabel}
            otherProps={otherProps}
          />
        );
    }
  }, [control, fieldData, isWithLabel, otherProps, sxStyle, type]);

  return (
    <Grid container direction="column">
      <Grid item>
        <Typography>{fieldData.label}</Typography>
      </Grid>
      <Grid item>{componentToUse}</Grid>
    </Grid>
  );
};
