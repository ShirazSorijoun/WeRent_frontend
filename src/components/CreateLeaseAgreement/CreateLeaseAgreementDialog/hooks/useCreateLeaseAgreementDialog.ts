import { useCallback, useEffect, useState } from 'react';
import { api } from '@/api';
import { leaseAgreementFormData } from '../../formUtils';
import { toast } from 'react-toastify';
import { ILeaseAgreementForm } from '@/models/leaseAgreement';
import { defaultUserData, IUserData } from '@/models';
import { IApartment, defaultApartment } from '@/models/apartment.model';

interface IUseLeaseAgreementForm {
  handleSave: (formData: leaseAgreementFormData) => Promise<boolean>;
  handleWrongFormData: () => void;
  isButtonLoading: boolean;
  apartment: IApartment;
  tenantData: IUserData;
}

export const useLeaseAgreementForm = (
  tenantId: string,
  apartmentId: string,
): IUseLeaseAgreementForm => {
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);
  const [apartment, setApartment] = useState<IApartment>(defaultApartment);
  const [tenantData, setTenantData] = useState<IUserData>(defaultUserData);

  useEffect(() => {
    const fetchApartmentData = async (): Promise<void> => {
      if (apartmentId) {
        try {
          const apartmentData =
            await api.apartment.getApartmentById(apartmentId);
          setApartment(apartmentData);
        } catch (error) {
          console.error('Error fetching tenant data for lease form', error);
        }
      }
    };
    fetchApartmentData();
  }, [apartmentId]);

  useEffect(() => {
    const fetchOwnerData = async () => {
      if (tenantId) {
        try {
          const owner = await api.user.getUserById(tenantId);
          setTenantData(owner);
        } catch (error) {
          console.error('Error fetching user data', error);
        }
      }
    };

    fetchOwnerData();
  }, [tenantId]);

  const handleSave = useCallback(
    async (formData: leaseAgreementFormData): Promise<boolean> => {
      setIsButtonLoading(true);

      try {
        let dataForSave = {};
        Object.values(formData).forEach((step) => {
          dataForSave = { ...dataForSave, ...step };
        });

        await api.leaseAgreement.postLeaseAgreementForm(
          dataForSave as ILeaseAgreementForm,
          tenantId,
          apartmentId,
        );

        setIsButtonLoading(false);
        toast.success('החוזה נשמר בהצלחה');
        return true;
      } catch (err) {
        console.error('Error saving lease:', err);
        setIsButtonLoading(false);
        toast.error('התרחשה שגיאה בשמירת החוזה');

        return false;
      }
    },
    [apartmentId, tenantId],
  );

  const handleWrongFormData = (): void => {
    toast.error('בבקשה מלא את החוזה בצורה תקינה');
  };

  return {
    handleSave,
    handleWrongFormData,
    isButtonLoading,
    apartment,
    tenantData,
  };
};
