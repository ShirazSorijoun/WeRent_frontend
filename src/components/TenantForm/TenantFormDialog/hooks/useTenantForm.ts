import { useCallback, useState } from 'react';
import { api } from '@/api';
import { TenantQuestionnaireFormData } from '../../formUtils';

interface IUseTenantForm {
  saveTenantForm: (formData: TenantQuestionnaireFormData) => Promise<boolean>;
  isButtonLoading: boolean;
}

export const useTenantForm = (): IUseTenantForm => {
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);

  const saveTenantForm = useCallback(
    async (formData: TenantQuestionnaireFormData): Promise<boolean> => {
      setIsButtonLoading(true);
      try {
        const updatedFormData = { ...formData, owner: '' };
        await api.tenantForm.postTeantForm(updatedFormData);
        setIsButtonLoading(false);
        return true;
      } catch (error) {
        console.error('Error saving tenant form:', error);
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
