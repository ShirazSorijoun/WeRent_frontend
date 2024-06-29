import { api } from '@/api';
import { CredentialResponse } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { LoginFormData } from '../../loginFormBody/formUtils';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { ILoginResponse } from '@/models/login';
import { useAuth } from '@@/Navbar/authContext';

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
  const { login } = useAuth();

  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const onLoginSuccess = async (data: ILoginResponse) => {
    console.log('User logged in');

    localStorage.setItem('accessToken', data.token.accessToken);
    localStorage.setItem('refreshToken', data.token.refreshToken);
    localStorage.setItem('userId', data.userId);
    localStorage.setItem('roles', data.userRole);
    console.log('roles', localStorage.getItem('roles'));
    toast.success('successfully login');
    setIsButtonLoading(false);
    login();
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
  ) => {
    try {
      const response = await api.auth.googleLogin(credentialResponse);
      onLoginSuccess(response);
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
