import { api } from '@/api';
import { ICoordinates } from '@/models/addressCheck';
import { IApartment } from '@/models/apartment.model';
import { EditApartmentFormData } from '@@/editApartment/formUtils';

import { useCallback, useState } from 'react';
import { UseFormSetError } from 'react-hook-form';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import { ApartmentFormData, EApartmentFields } from '../formUtils';

type TGetApartmentForFormRes = Promise<ApartmentFormData>;
interface IUseEditApartment {
  getApartmentForForm: () => TGetApartmentForFormRes;
  handleSave: (editableApartment: ApartmentFormData) => Promise<boolean>;
  handleWrongFormData: () => void;
  isButtonLoading: boolean;
}

export const useEditApartment = (
  setFormError: UseFormSetError<ApartmentFormData>,
): IUseEditApartment => {
  const { apartmentId } = useParams();

  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);

  const getApartmentForForm = useCallback(async (): TGetApartmentForFormRes => {
    if (!apartmentId) return {};

    const apartment: IApartment =
      await api.apartment.getApartmentById(apartmentId);

    return {
      [EApartmentFields.CITY]: apartment.city,
      [EApartmentFields.ADDRESS]: apartment.address,
      [EApartmentFields.TYPE]: apartment.type,
      [EApartmentFields.FLOOR]: apartment.floor,
      [EApartmentFields.NUM_OF_FLOORS]: apartment.numberOfFloors,
      [EApartmentFields.SIZE_IN_SQ_METER]: apartment.sizeInSqMeters,
      [EApartmentFields.PRICE]: apartment.price,
      [EApartmentFields.ENTRY_DATE]: new Date(apartment.entryDate),
      [EApartmentFields.FURNITURE]: apartment.furniture,
      [EApartmentFields.DESCRIPTION]: apartment.description,
      [EApartmentFields.PHONE]: apartment.phone,
    };
  }, [apartmentId]);

  const handleSave = useCallback(
    async (editableApartment: EditApartmentFormData): Promise<boolean> => {
      let coordinatesRes: ICoordinates;
      try {
        coordinatesRes = await api.apartment.getAddressCoordinates(
          editableApartment[EApartmentFields.ADDRESS]!,
          editableApartment[EApartmentFields.CITY]!,
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
        return false;
      }

      setIsButtonLoading(true);
      try {
        if (apartmentId) {
          const apartmentToSend = {
            ...editableApartment,
          } as IApartment;

          if (coordinatesRes) {
            apartmentToSend.coordinate = coordinatesRes;
          }
          await api.apartment.updateApartment(apartmentId, apartmentToSend);
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
