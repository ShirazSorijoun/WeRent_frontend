import { api } from '@/api';
import { CredentialResponse } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { LoginFormData } from '../../loginFormBody/formUtils';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { ILoginResponse } from '@/models/login';
import { useAppDispatch } from '@/hooks/store';
import { handleLocalStorageLogin } from '@/utils/auth';
import { userLogin } from '@/stores/user';

interface IUseHandleLogin {
  handleValidFormData: (formData: LoginFormData) => Promise<void>;
  handleGoogleLoginFailure: () => void;
  handleWrongFormData: () => void;
  handleGoogleLoginSuccess: (
    credentialResponse: CredentialResponse,
  ) => Promise<void>;
  isButtonLoading: boolean;
}

export const useHandleLogin = (): IUseHandleLogin => {
  const dispatch = useAppDispatch();

  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const onLoginSuccess = async (data: ILoginResponse) => {
    await dispatch(userLogin(data.userId));
    toast.success('התחברת בהצלחה');
    setIsButtonLoading(false);
    navigate('/');
  };

  const handleValidFormData = async (formData: LoginFormData) => {
    setIsButtonLoading(true);

    const { email, password } = formData;
    try {
      const response: ILoginResponse = await api.auth.loginUser({
        email,
        password,
      });

      handleLocalStorageLogin(response);
      onLoginSuccess(response);
    } catch (error: any) {
      setIsButtonLoading(false);

      toast.error(
        error.response.status === 401
          ? 'Invalid username or password'
          : 'error during login please try again',
      );
    }
  };

  const handleGoogleLoginFailure = () => {
    toast.error('error during google login please try again');
  };

  const handleGoogleLoginSuccess = async (
    credentialResponse: CredentialResponse,
  ): Promise<void> => {
    try {
      const response: ILoginResponse =
        await api.auth.googleLogin(credentialResponse);

      handleLocalStorageLogin(response);
      if (response.isNeedMoreData) {
        navigate('/postGoogleRegister');
      } else onLoginSuccess(response);
    } catch (error: any) {
      handleGoogleLoginFailure();
    }
  };

  const handleWrongFormData = (): void => {
    toast.error('please fill the proper login info');
  };

  return {
    isButtonLoading,
    handleGoogleLoginFailure,
    handleGoogleLoginSuccess,
    handleValidFormData,
    handleWrongFormData,
  };
};
