import { api } from '@/api';
import { ICoordinates } from '@/models/addressCheck';
import {
  defaultApartment,
  IApartment,
  IApartmentForCreate,
} from '@/models/apartment.model';
import { useCallback, useMemo, useState } from 'react';
import { UseFormSetError } from 'react-hook-form';
import { toast } from 'react-toastify';
import { ApartmentFormData, EApartmentFields } from '../formUtils';
import { useNavigate, useParams } from 'react-router';

type TGetApartmentForFormRes = Promise<ApartmentFormData | object>;
interface IUseAddApartment {
  getApartmentForForm: () => TGetApartmentForFormRes;
  handleSave: (editableApartment: ApartmentFormData) => Promise<void>;
  handleWrongFormData: () => void;
  handleBackClick: () => void;
  isEdit: boolean;
  isButtonLoading: boolean;
}

export const useAddApartment = (
  setFormError: UseFormSetError<ApartmentFormData>,
): IUseAddApartment => {
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { apartmentId } = useParams();

  const isEdit = useMemo(() => !!apartmentId, [apartmentId]);
  const getApartmentForForm = useCallback(async (): TGetApartmentForFormRes => {
    if (!apartmentId) return defaultApartment;

    const apartment: IApartment =
      await api.apartment.getApartmentById(apartmentId);

    return {
      [EApartmentFields.ADDRESS]: apartment.address,
      [EApartmentFields.CITY]: apartment.city,
      [EApartmentFields.TYPE]: apartment.type,
      [EApartmentFields.FLOOR]: apartment.floor,
      [EApartmentFields.NUM_OF_FLOORS]: apartment.numberOfFloors,
      [EApartmentFields.NUM_OF_ROOMS]: apartment.rooms,
      [EApartmentFields.SIZE_IN_SQ_METER]: apartment.sizeInSqMeters,
      [EApartmentFields.PRICE]: apartment.price,
      [EApartmentFields.ENTRY_DATE]: new Date(apartment.entryDate),
      [EApartmentFields.FURNITURE]: apartment.furniture,
      [EApartmentFields.DESCRIPTION]: apartment.description,
      [EApartmentFields.FEATURES]: apartment.features,
      [EApartmentFields.IMAGE]: apartment.apartment_image,
    };
  }, [apartmentId]);

  const handleSave = useCallback(
    async (newApartment: ApartmentFormData): Promise<void> => {
      let coordinatesRes: ICoordinates;
      try {
        coordinatesRes = await api.apartment.getAddressCoordinates(
          newApartment[EApartmentFields.ADDRESS]!,
          newApartment[EApartmentFields.CITY]!,
        );
      } catch (error) {
        const errorMsg = 'הכתובת או העיר אינם תקניים';
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
      const { [EApartmentFields.IMAGE]: imageToUpload, ...apartmentData } =
        newApartment;

      let imageUrl: string | undefined =
        typeof imageToUpload === 'string' ? imageToUpload : undefined;

      if (imageToUpload && !imageUrl) {
        const formData = new FormData();
        formData.append('file', imageToUpload);

        imageUrl = await api.file.uploadImage(imageToUpload as File);
      }

      const fullApartmentData = {
        ...apartmentData,
        apartment_image: imageUrl,
        coordinate: coordinatesRes,
      } as IApartmentForCreate;

      try {
        const updatedApartment = isEdit
          ? await api.apartment.updateApartment(apartmentId!, fullApartmentData)
          : await api.apartment.postApartment(fullApartmentData);

        toast.success('הדירה נשמרה בהצלחה');

        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        isEdit
          ? navigate(-1)
          : navigate('/apartment-details/' + updatedApartment._id);
      } catch (error) {
        toast.error('הייתה שגיאה בשמירת הדירה');
      }
    },
    [apartmentId, isEdit, navigate, setFormError],
  );

  const handleWrongFormData = (): void => {
    toast.error('קיימת שגיאה במילוי הטופס');
  };

  const handleBackClick = (): void => {
    navigate(-1);
  };
  return {
    getApartmentForForm,
    handleSave,
    handleWrongFormData,
    handleBackClick,
    isButtonLoading,
    isEdit,
  };
};
