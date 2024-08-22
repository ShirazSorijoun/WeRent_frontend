import React from 'react';
import { ERegisterFields, registerDataObject } from '../../formUtils';
import { EBasicFieldType } from '@/models/forms';
import { BasicFieldController } from '@@/common/formFields';
import { IControlProps } from '@/models/form';
import { Grid } from '@mui/material';
import { styleType } from '@/models';

const style: styleType = {
  rowItem: {
    width: '30%',
  },
};

export const RegisterFormBody: React.FC<IControlProps> = ({ control }) => {
  return (
    <Grid container direction="column">
      <Grid item>
        <BasicFieldController
          control={control}
          fieldData={registerDataObject[ERegisterFields.EMAIL]}
        />
      </Grid>
      <Grid item>
        <BasicFieldController
          control={control}
          type={EBasicFieldType.password}
          fieldData={registerDataObject[ERegisterFields.PASS]}
        />
      </Grid>

      <Grid item container direction="row" justifyContent="space-between">
        <Grid item sx={style.rowItem}>
          <BasicFieldController
            control={control}
            type={EBasicFieldType.text}
            fieldData={registerDataObject[ERegisterFields.FIRST_NAME]}
          />
        </Grid>
        <Grid item sx={style.rowItem}>
          <BasicFieldController
            control={control}
            type={EBasicFieldType.text}
            fieldData={registerDataObject[ERegisterFields.LAST_NAME]}
          />
        </Grid>
        <Grid item sx={style.rowItem}>
          <BasicFieldController
            control={control}
            fieldData={registerDataObject[ERegisterFields.PERSONAL_ID]}
          />
        </Grid>
      </Grid>

      <Grid item container direction="row" justifyContent="space-between">
        <Grid item sx={style.rowItem}>
          <BasicFieldController
            control={control}
            type={EBasicFieldType.text}
            fieldData={registerDataObject[ERegisterFields.PHONE]}
          />
        </Grid>
        <Grid item sx={style.rowItem}>
          <BasicFieldController
            control={control}
            type={EBasicFieldType.text}
            fieldData={registerDataObject[ERegisterFields.CITY]}
          />
        </Grid>
        <Grid item sx={style.rowItem}>
          <BasicFieldController
            control={control}
            type={EBasicFieldType.text}
            fieldData={registerDataObject[ERegisterFields.ADDRESS]}
          />
        </Grid>
      </Grid>

      <Grid item>
        <BasicFieldController
          control={control}
          type={EBasicFieldType.image}
          fieldData={registerDataObject[ERegisterFields.IMAGE]}
        />
      </Grid>
    </Grid>
  );
};
