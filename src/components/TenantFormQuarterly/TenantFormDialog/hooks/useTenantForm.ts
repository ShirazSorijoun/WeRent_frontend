import { useCallback, useState } from 'react';
import { api } from '@/api';
import { QuarterlyTenantQuestionnaireFormData } from '../../formUtils';
import axios from 'axios';

interface IUseTenantForm {
  saveTenantForm: (
    formData: QuarterlyTenantQuestionnaireFormData,
  ) => Promise<boolean>;
  isButtonLoading: boolean;
}

export const useTenantForm = (): IUseTenantForm => {
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);

  const saveTenantForm = useCallback(
    async (
      formData: QuarterlyTenantQuestionnaireFormData,
    ): Promise<boolean> => {
      setIsButtonLoading(true);
      try {
        const updatedFormData = {
          ...formData,
        };

        await api.tenantForm.postTenantFormQuarterly(updatedFormData);

        setIsButtonLoading(false);
        return true;
      } catch (error) {
        console.error('Error saving tenant form:', error);
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
    saveTenantForm,
    isButtonLoading,
  };
};
