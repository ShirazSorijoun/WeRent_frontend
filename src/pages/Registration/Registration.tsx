/* eslint-disable @typescript-eslint/no-explicit-any */
import './Registration.css';
import img from '../../assets/img.jpg';
import { GoogleLogin } from '@react-oauth/google';
import './Registration.css';
import {
  defaultRegisterFormData,
  IRegisterFormData,
  schema,
} from './formUtils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRegister } from './hooks/useRegister';
import { RegisterFormBody } from './components';
import { LoadingButton } from '@mui/lab';
import { Stack } from '@mui/material';

export const RegistrationPage = () => {
  const { handleSubmit, control, setError } = useForm<IRegisterFormData>({
    resolver: zodResolver(schema),
    defaultValues: defaultRegisterFormData,
  });

  const {
    handleSave,
    handleWrongFormData,
    isButtonLoading,
    onGoogleLoginFailure,
    onGoogleLoginSuccess,
  } = useRegister(setError);

  return (
    <div className="container">
      <div className="row" style={{ marginBottom: '120px', marginTop: '50px' }}>
        <div className="col-md-5 d-flex align-items-center justify-content-center">
          <img
            src={img}
            className="img-fluid"
            alt="Preview"
            style={{ height: '730px', width: '700px' }}
          ></img>
        </div>

        <div className="col-md-7 d-flex">
          <div className="vstack col-md-7 mx-auto">
            <h1 className="register-title d-flex justify-content-center position-relative">
              הרשמה
            </h1>
            <p className="register d-flex justify-content-center position-relative">
              שמחים שבחרת להצטרף!, רק חסר מילוי של מספר פרטים לפני
            </p>

            <RegisterFormBody control={control} />

            <Stack direction="row" sx={{ width: '100%' }} spacing={3}>
              <GoogleLogin
                onSuccess={onGoogleLoginSuccess}
                onError={onGoogleLoginFailure}
                shape="circle"
                type="standard"
                width="100px"
                text="signup_with"
                logo_alignment="center"
                locale="en_CN"
              />
              <LoadingButton
                sx={{ borderRadius: '40px', flex: 3 }}
                loading={isButtonLoading}
                role="progressbar"
                variant="contained"
                color="info"
                onClick={handleSubmit(handleSave, handleWrongFormData)}
              >
                <span>הרשם</span>
              </LoadingButton>
            </Stack>
          </div>
        </div>
      </div>
    </div>
  );
};
