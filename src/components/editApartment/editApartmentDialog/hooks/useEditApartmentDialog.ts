import { api } from '@/api';
import { ApartmentProps } from '@/types/types';
import {
  EEditApartmentFields,
  EditApartmentFormData,
} from '@@/editApartment/formUtils';
import { useCallback, useState } from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';

type TGetApartmentForFormRes = Promise<EditApartmentFormData>;
interface IUseEditApartment {
  getApartmentForForm: () => TGetApartmentForFormRes;
  handleSave: (editableApartment: EditApartmentFormData) => Promise<boolean>;
  handleWrongFormData: () => void;
  isButtonLoading: boolean;
}

export const useEditApartment = (): IUseEditApartment => {
  const { apartmentId } = useParams();

  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);

  const getApartmentForForm = useCallback(async (): TGetApartmentForFormRes => {
    if (!apartmentId) return {};

    const apartment: ApartmentProps =
      await api.apartment.getApartmentById(apartmentId);

    return {
      [EEditApartmentFields.CITY]: apartment.city,
      [EEditApartmentFields.ADDRESS]: apartment.address,
      [EEditApartmentFields.TYPE]: apartment.type,
      [EEditApartmentFields.FLOOR]: apartment.floor,
      [EEditApartmentFields.NUM_OF_FLOORS]: apartment.numberOfFloors,
      [EEditApartmentFields.SIZE_IN_SQ_METER]: apartment.sizeInSqMeters,
      [EEditApartmentFields.PRICE]: apartment.price,
      [EEditApartmentFields.ENTRY_DATE]: new Date(apartment.entryDate),
      [EEditApartmentFields.FURNITURE]: apartment.furniture,
      [EEditApartmentFields.DESCRIPTION]: apartment.description,
      [EEditApartmentFields.PHONE]: apartment.phone,
    };
  }, [apartmentId]);

  const handleSave = useCallback(
    async (editableApartment: EditApartmentFormData): Promise<boolean> => {
      setIsButtonLoading(true);
      try {
        if (apartmentId) {
          await api.apartment.updateApartment(
            apartmentId,
            editableApartment as ApartmentProps,
          );
        }

        setIsButtonLoading(false);
        toast.success('the apartment was successfully updated');

        return true;
      } catch (error) {
        console.error('Error updating apartment:', error);
        setIsButtonLoading(false);
        toast.error('there was an error during the update');

        return false;
      }
    },
    [apartmentId],
  );

  const handleWrongFormData = (): void => {
    toast.error('please fill the form properly');
  };

  return {
    handleSave,
    handleWrongFormData,
    getApartmentForForm,
    isButtonLoading,
  };
};
