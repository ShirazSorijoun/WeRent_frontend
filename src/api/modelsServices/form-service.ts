import { axiosInstance } from '../api';
import { TenantFormProps } from '@/types/types';

const FORM_API_KEY = '/tenantForm';

export const postTeantForm = async (
  formData: TenantFormProps,
): Promise<TenantFormProps> =>
  (
    await axiosInstance.post(`${FORM_API_KEY}/create`, {
      form: formData,
    })
  ).data;

export const tenantFormAPI = {
  postTeantForm,
};
