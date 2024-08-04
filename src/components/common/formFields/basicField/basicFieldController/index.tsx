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
import { ControlledRating } from '../controlledRating';
import { ControlledBoolean } from '../controlledBoolean';
import { ControlledSwitch } from '../controlledSwitch';

interface IBasicFieldControllerProps extends IControlledBasicFieldTypeProps {
  type?: EBasicFieldType;
  hideTitle?: boolean;
}

const extraProps: Partial<Record<EBasicFieldType, any>> = {
  [EBasicFieldType.float]: { step: 0.01 },
  [EBasicFieldType.multiLineText]: { isMultiline: true },
};

const fieldsMap: Partial<
  Record<EBasicFieldType, React.FC<IControlledBasicFieldTypeProps>>
> = {
  [EBasicFieldType.dateTime]: ControlledDateTime,
  [EBasicFieldType.date]: ControlledDate,
  [EBasicFieldType.float]: ControlledIntField,
  [EBasicFieldType.int]: ControlledIntField,
  [EBasicFieldType.textArray]: ControlledTextArray,
  [EBasicFieldType.multiLineText]: ControlledBasicTextField,
  [EBasicFieldType.coordinate]: ControlledCoordinateInput,
  [EBasicFieldType.rating]: ControlledRating,
  [EBasicFieldType.boolean]: ControlledBoolean,
  [EBasicFieldType.switch]: ControlledSwitch,
};

const typesWithOutLabel: EBasicFieldType[] = [EBasicFieldType.boolean];

export const BasicFieldController: React.FC<IBasicFieldControllerProps> = ({
  type = EBasicFieldType.text,
  hideTitle = false,
  ...fieldProps
}) => {
  const componentToUse = useMemo(() => {
    const Element = fieldsMap[type];
    return Element ? (
      <Element {...fieldProps} {...extraProps[type]} />
    ) : (
      <ControlledBasicTextField {...fieldProps} type={type} />
    );
  }, [fieldProps, type]);

  return (
    <Grid container direction="column">
      {!hideTitle && !typesWithOutLabel.includes(type) && (
        <Grid item>
          <Typography>{fieldProps.fieldData.label}</Typography>
        </Grid>
      )}
      <Grid item>{componentToUse}</Grid>
    </Grid>
  );
};
