import React, { useMemo } from 'react';
import { Grid, Typography } from '@mui/material';
import { IControlledBasicFieldTypeProps } from '../utils';
import { EBasicFieldType } from '@/models/forms';
import { ControlledDateTime } from '../controlledDateTime';
import { ControlledIntField } from '../controlledIntField';
import { ControlledTextArray } from '../controlledTextArray';
import { ControlledBasicTextField } from '../controlledBasicTextField';
import { ControlledCoordinateInput } from '../controlledCoordinateInput';
import { ControlledDate } from '../controlledDate';

interface IBasicFieldControllerProps extends IControlledBasicFieldTypeProps {
  type?: EBasicFieldType;
  hideTitle?: boolean;
}

export const BasicFieldController: React.FC<IBasicFieldControllerProps> = ({
  fieldData,
  control,
  sxStyle,
  isWithLabel = false,
  otherProps,
  type = EBasicFieldType.text,
  hideTitle = false,
}) => {
  const componentToUse = useMemo(() => {
    switch (type) {
      case EBasicFieldType.dateTime:
        return (
          <ControlledDateTime
            control={control}
            fieldData={fieldData}
            sxStyle={sxStyle}
            isWithLabel={isWithLabel}
            otherProps={otherProps}
          />
        );
      case EBasicFieldType.date:
        return (
          <ControlledDate
            control={control}
            fieldData={fieldData}
            sxStyle={sxStyle}
            isWithLabel={isWithLabel}
            otherProps={otherProps}
          />
        );
      case EBasicFieldType.float:
        return (
          <ControlledIntField
            control={control}
            fieldData={fieldData}
            sxStyle={sxStyle}
            isWithLabel={isWithLabel}
            otherProps={otherProps}
            step={0.01}
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
            type={type}
          />
        );
    }
  }, [control, fieldData, isWithLabel, otherProps, sxStyle, type]);

  return (
    <Grid container direction="column">
      {!hideTitle && (
        <Grid item>
          <Typography>{fieldData.label}</Typography>
        </Grid>
      )}
      <Grid item>{componentToUse}</Grid>
    </Grid>
  );
};

export default BasicFieldController;
