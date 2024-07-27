import { axiosInstance } from '../api';
import { TenantFormProps } from '@/types/types';

const FORM_API_KEY = '/tenantForm';

export const postTeantForm = async (
  formData: TenantFormProps,
): Promise<TenantFormProps> =>
  (console.log('formData', formData),
  await axiosInstance.post(`${FORM_API_KEY}/initial/create`, {
    tenantForm: formData,
  })).data;

export const getTenantFormByOwnerId = async (
  ownerId: string,
): Promise<TenantFormProps | string> => {
  console.log('ownerId', ownerId);
  const response = await axiosInstance.get(
    `${FORM_API_KEY}/initial/${ownerId}`,
  );
  return response.data;
};

export const postTeantFormQuarterly = async (
  formData: TenantFormProps,
): Promise<TenantFormProps> =>
  (console.log('formData', formData),
  await axiosInstance.post(`${FORM_API_KEY}/quarterly/create`, {
    tenantForm: formData,
  })).data;

export const getTenantFormQuarterlyByOwnerId = async (
  ownerId: string,
): Promise<TenantFormProps | string> => {
  console.log('ownerId', ownerId);
  const response = await axiosInstance.get(
    `${FORM_API_KEY}/quarterly/${ownerId}`,
  );
  return response.data;
};

export const tenantFormAPI = {
  postTeantForm,
  getTenantFormByOwnerId,
  postTeantFormQuarterly,
  getTenantFormQuarterlyByOwnerId,
};
