import { api } from '@/api';
import { ICoordinates } from '@/models/addressCheck';
import { IApartment } from '@/models/apartment.model';

import { useCallback, useState } from 'react';
import { UseFormSetError } from 'react-hook-form';
import { toast } from 'react-toastify';
import { ApartmentFormData, EApartmentFields } from '../formUtils';
import { useNavigate } from 'react-router';

interface IUseEditApartment {
  handleSave: (editableApartment: ApartmentFormData) => Promise<void>;
  handleWrongFormData: () => void;
  isButtonLoading: boolean;
}

export const useEditApartment = (
  setFormError: UseFormSetError<ApartmentFormData>,
): IUseEditApartment => {
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSave = useCallback(
    async (newApartment: ApartmentFormData): Promise<void> => {
      let coordinatesRes: ICoordinates;
      try {
        coordinatesRes = await api.apartment.getAddressCoordinates(
          newApartment[EApartmentFields.ADDRESS]!,
          newApartment[EApartmentFields.CITY]!,
        );
      } catch (error) {
        const errorMsg = 'city or street are not valid';
        setFormError(EApartmentFields.ADDRESS, {
          type: 'manual',
          message: errorMsg,
        });
        setFormError(EApartmentFields.CITY, {
          type: 'manual',
          message: errorMsg,
        });
        return;
      }

      setIsButtonLoading(true);
      // let imageUrl: string | undefined = undefined;

      // if (uploadedFile) {
      //   const formData = new FormData();
      //   formData.append('file', uploadedFile);

      //   imageUrl = await api.file.uploadImage(uploadedFile);
      // }

      const fullApartmentData = {
        ...newApartment,
        // apartment_image: imageUrl || undefined,
        coordinate: coordinatesRes,
        owner: '',
      } as IApartment;

      try {
        const updatedApartment =
          await api.apartment.postApartment(fullApartmentData);
        toast.success('הדירה נוצרה בהצלחה');

        navigate('/apartment-details/' + updatedApartment._id);
      } catch (error) {
        toast.error('הייתה שגיאה ביצירת הדירה');
      }
    },
    [navigate, setFormError],
  );

  const handleWrongFormData = (): void => {
    toast.error('please fill the form properly');
  };

  return {
    handleSave,
    handleWrongFormData,
    isButtonLoading,
  };
};
