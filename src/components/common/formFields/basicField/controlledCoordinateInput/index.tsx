import React, { useMemo } from 'react';
import { Grid, InputBaseComponentProps } from '@mui/material';
import { IControlledBasicFieldTypeProps } from '../utils';
import { ControlledBasicTextField } from '../controlledBasicTextField';
import { IFormField } from '@/models/forms';

export const ControlledCoordinateInput: React.FC<
  IControlledBasicFieldTypeProps
> = ({ fieldData, control, sxStyle, isWithLabel }) => {
  const coordinateFields: IFormField[] = useMemo(
    () =>
      ['X', 'Y'].map((labelChar, index) => ({
        fieldName: `${fieldData?.fieldName}.${index}`,
        label: `${labelChar} נ.צ`,
      })),
    [fieldData],
  );

  const inputProps = useMemo(() => {
    const props: InputBaseComponentProps = { step: '0.000001', min: 0 };
    return props;
  }, []);

  return (
    <Grid container spacing={2}>
      {coordinateFields.map((coordinateField, index) => (
        <Grid item key={index}>
          <ControlledBasicTextField
            control={control}
            fieldData={coordinateField}
            isWithLabel={isWithLabel}
            type="number"
            sxStyle={sxStyle}
            inputProps={inputProps}
          />
        </Grid>
      ))}
    </Grid>
  );
};
