import { axiosInstance } from '../api';
import { TenantFormProps } from '@/types/types';

const FORM_API_KEY = '/tenantForm';

export const postTeantForm = async (
  formData: TenantFormProps,
): Promise<TenantFormProps> =>
  (console.log('formData', formData),
  await axiosInstance.post(`${FORM_API_KEY}/create`, {
    tenantForm: formData,
  })).data;

export const tenantFormAPI = {
  postTeantForm,
};
