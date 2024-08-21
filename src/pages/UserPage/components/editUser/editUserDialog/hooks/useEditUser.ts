import { api } from '@/api';
import { useCallback, useState } from 'react';
import { UseFormSetError } from 'react-hook-form';
import { toast } from 'react-toastify';
import { EditUserFormData, EEditUserFields } from '../../formUtils';
import { IEditUser } from '@/models';
import { useAppDispatch } from '@/hooks';
import { updateUser } from '@/stores/user';

interface IUseEditUser {
  handleSave: (newUserData: EditUserFormData) => Promise<boolean>;
  handleWrongFormData: () => void;
  isButtonLoading: boolean;
}

export const useEditUser = (
  setFormError: UseFormSetError<EditUserFormData>,
): IUseEditUser => {
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleSave = useCallback(
    async (newUserData: EditUserFormData): Promise<boolean> => {
      try {
        await api.apartment.getAddressCoordinates(
          newUserData[EEditUserFields.ADDRESS]!,
          newUserData[EEditUserFields.CITY]!,
        );
      } catch (error) {
        const errorMsg = 'הכתובת או העיר אינם תקניים';
        setFormError(EEditUserFields.ADDRESS, {
          type: 'manual',
          message: errorMsg,
        });
        setFormError(EEditUserFields.CITY, {
          type: 'manual',
          message: errorMsg,
        });
        return false;
      }

      setIsButtonLoading(true);

      const { [EEditUserFields.IMAGE]: imageToUpload, ...userData } =
        newUserData;

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
      } as IEditUser;

      try {
        await api.user.updateOwnProfile(userToSend);

        toast.success('המידע נשמר בהצלחה');

        dispatch(updateUser(userToSend));
        setIsButtonLoading(false);
        return true;
      } catch (error) {
        toast.error('הייתה שגיאה בשמירת המידע');
        return false;
      }
    },
    [dispatch, setFormError],
  );

  const handleWrongFormData = (): void => {
    toast.error('קיימת שגיאה במילוי הטופס');
  };

  return {
    handleSave,
    handleWrongFormData,
    isButtonLoading,
  };
};
