import { useCallback, useState } from 'react';
import { api } from '@/api';
import { leaseAgreementFormData } from '../../formUtils';
import { toast } from 'react-toastify';
import { ILeaseAgreementForm } from '@/models/leaseAgreement';

interface IUseLeaseAgreementForm {
  handleSave: (
    formData: leaseAgreementFormData,
    matchId: string,
  ) => Promise<boolean>;
  handleWrongFormData: () => void;
  isButtonLoading: boolean;
}

export const useLeaseAgreementForm = (): IUseLeaseAgreementForm => {
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);

  const handleSave = useCallback(
    async (
      formData: leaseAgreementFormData,
      matchId: string,
    ): Promise<boolean> => {
      setIsButtonLoading(true);

      try {
        let dataForSave = {};
        Object.values(formData).forEach((step) => {
          dataForSave = { ...dataForSave, ...step };
        });

        await api.leaseAgreement.postLeaseAgreementForm(
          dataForSave as ILeaseAgreementForm,
          matchId,
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
    [],
  );

  const handleWrongFormData = (): void => {
    toast.error('בבקשה מלא את החוזה בצורה תקינה');
  };

  return {
    handleSave,
    handleWrongFormData,
    isButtonLoading,
  };
};
