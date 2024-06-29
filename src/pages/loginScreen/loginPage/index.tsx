import { zodResolver } from '@hookform/resolvers/zod';
import { Container, Typography } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import React from 'react';
import { useForm } from 'react-hook-form';
import {
  LoginFormData,
  defaultFormValues,
  schema,
} from '../loginFormBody/formUtils';
import { LoginFormBody } from '../loginFormBody';
import { useHandleLogin } from './hooks';
import { LoadingButton } from '@mui/lab';

export const LoginPage: React.FC = () => {
  const {
    handleGoogleLoginFailure,
    handleGoogleLoginSuccess,
    handleValidFormData,
    isButtonLoading,
    handleWrongFormData,
  } = useHandleLogin();

  const { handleSubmit, control } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
    defaultValues: defaultFormValues,
    resetOptions: {
      keepDirtyValues: false,
    },
  });

  return (
    <Container maxWidth="sm" sx={{ padding: '30px' }}>
      <Typography variant="h3">login</Typography>
      <LoginFormBody control={control} />
      <GoogleLogin
        onSuccess={handleGoogleLoginSuccess}
        onError={handleGoogleLoginFailure}
      />

      <LoadingButton
        loading={isButtonLoading}
        role="progressbar"
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleSubmit(handleValidFormData, handleWrongFormData)}
        style={{ marginTop: '20px' }}
      >
        <span>login</span>
      </LoadingButton>
    </Container>
  );
};
