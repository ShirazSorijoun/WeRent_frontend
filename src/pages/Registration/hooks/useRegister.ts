import { api } from '@/api';
import { useCallback, useState } from 'react';
import { UseFormSetError } from 'react-hook-form';
import { toast } from 'react-toastify';
import { IUser } from '@/models';
import { useAppDispatch } from '@/hooks';
import { ERegisterFields, IRegisterFormData } from '../formUtils';
import { useNavigate } from 'react-router';
import { ILoginResponse } from '@/models/login';
import { userLogin } from '@/stores/user';
import { handleLocalStorageLogin } from '@/utils/auth';
import { CredentialResponse } from '@react-oauth/google';

interface IUseRegister {
  handleSave: (registerData: IRegisterFormData) => Promise<void>;
  handleWrongFormData: () => void;
  onGoogleLoginSuccess: (
    credentialResponse: CredentialResponse,
  ) => Promise<void>;
  onGoogleLoginFailure: () => void;
  isButtonLoading: boolean;
}

const userExistErrorMsg = 'משתמש עם מייל זה כבר';

export const useRegister = (
  setFormError: UseFormSetError<IRegisterFormData>,
): IUseRegister => {
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logUserAfterRegister = useCallback(
    async (data: ILoginResponse) => {
      handleLocalStorageLogin(data);

      if (data.isNeedMoreData) {
        navigate('/postGoogleRegister');
      } else {
        await dispatch(userLogin(data.userId));
        console.log('User logged in:', data);
        navigate('/rent');
      }
    },
    [dispatch, navigate],
  );

  const handleSave = useCallback(
    async (registerData: IRegisterFormData): Promise<void> => {
      try {
        await api.apartment.getAddressCoordinates(
          registerData[ERegisterFields.ADDRESS]!,
          registerData[ERegisterFields.CITY]!,
        );
      } catch (error) {
        const errorMsg = 'הכתובת או העיר אינם תקניים';
        setFormError(ERegisterFields.ADDRESS, {
          type: 'manual',
          message: errorMsg,
        });
        setFormError(ERegisterFields.CITY, {
          type: 'manual',
          message: errorMsg,
        });
        return;
      }

      setIsButtonLoading(true);

      const { [ERegisterFields.IMAGE]: imageToUpload, ...userData } =
        registerData;

      let imageUrl: string | undefined =
        typeof imageToUpload === 'string' ? imageToUpload : undefined;

      if (imageToUpload && !imageUrl) {
        const formData = new FormData();
        formData.append('file', imageToUpload);

        imageUrl = await api.file.uploadImage(imageToUpload as File);
      }

      const userToSend = {
        ...userData,
        profile_image: imageUrl,
      } as IUser;

      try {
        const registrationResponse = await api.auth.registerUser(userToSend);
        console.log('User registered:', registrationResponse);
        toast.error('ההרשמה נשמרה בהצלחה');

        // Log in the user immediately after successful registration
        const loginResponse = await api.auth.loginUser({
          email: userToSend.email,
          password: userToSend.password,
        });
        logUserAfterRegister(loginResponse);
      } catch (error: any) {
        console.error('Login failed:', error);

        if (error.response.status === 406) {
          toast.error(userExistErrorMsg);

          setFormError(ERegisterFields.ADDRESS, {
            type: 'manual',
            message: userExistErrorMsg,
          });
        } else {
          toast.error('הייתה שגיאה בשמירת המידע');
        }
      } finally {
        setIsButtonLoading(false);
      }
    },
    [logUserAfterRegister, setFormError],
  );

  const handleWrongFormData = (): void => {
    toast.error('קיימת שגיאה במילוי הטופס');
  };

  const onGoogleLoginSuccess = async (
    credentialResponse: CredentialResponse,
  ) => {
    console.log(credentialResponse);
    try {
      const res = await api.auth.googleLogin(credentialResponse);
      logUserAfterRegister(res);
    } catch (e) {
      console.log(e);
    }
  };

  const onGoogleLoginFailure = () => {
    toast.error('הייתהשגיאה בהתחברות באמצעות גוגל');
  };

  return {
    handleSave,
    handleWrongFormData,
    onGoogleLoginSuccess,
    onGoogleLoginFailure,
    isButtonLoading,
  };
};
