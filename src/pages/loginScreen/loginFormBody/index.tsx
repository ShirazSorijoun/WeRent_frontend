import { FC } from 'react';
import { Control } from 'react-hook-form';
import { ELoginFields, loginFormDataObject } from './formUtils';
import { BasicFieldController } from '@@/common/formFields';
import { EBasicFieldType } from '@/models';
import { Grid } from '@mui/material';

interface Props {
  control: Control<any>;
}

export const LoginFormBody: FC<Props> = ({ control }) => {
  return (
    <Grid container direction="column" spacing={2} sx={{ padding: '15px 0px' }}>
      <Grid item>
        <BasicFieldController
          control={control}
          type={EBasicFieldType.text}
          fieldData={loginFormDataObject[ELoginFields.EMAIL]}
          isWithLabel
          hideTitle
        />
      </Grid>
      <Grid item>
        <BasicFieldController
          control={control}
          fieldData={loginFormDataObject[ELoginFields.PASSWORD]}
          type={EBasicFieldType.password}
          isWithLabel
          hideTitle
        />
      </Grid>
    </Grid>
  );
};
