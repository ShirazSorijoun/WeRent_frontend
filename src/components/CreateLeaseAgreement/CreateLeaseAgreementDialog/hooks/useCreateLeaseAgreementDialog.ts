import { useCallback, useState } from 'react';
import { api } from '@/api';
import { leaseAgreementFormData } from '../../formUtils';
import axios from 'axios';

interface IUseLeaseAgreementForm {
  saveLeaseAgreementForm: (
    formData: leaseAgreementFormData,
  ) => Promise<boolean>;
  isButtonLoading: boolean;
}

export const useLeaseAgreementForm = (): IUseLeaseAgreementForm => {
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);

  const saveLeaseAgreementForm = useCallback(
    async (formData: leaseAgreementFormData): Promise<boolean> => {
      setIsButtonLoading(true);
      try {
        const updatedFormData = { ...formData };

        await api.leaseAgreement.postLeaseAgreementForm(updatedFormData, '');

        setIsButtonLoading(false);
        return true;
      } catch (error) {
        console.error('Error saving lease agreement form:', error);
        if (axios.isAxiosError(error)) {
          console.error('Error response:', error.response?.data);
          console.error('Status code:', error.response?.status);
          console.error('Headers:', error.response?.headers);
        }
        setIsButtonLoading(false);
        return false;
      }
    },
    [],
  );

  return {
    saveLeaseAgreementForm,
    isButtonLoading,
  };
};
