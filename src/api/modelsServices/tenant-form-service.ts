import { axiosInstance } from '../api';
import { QuarterlyTenantFormProps, TenantFormProps } from '@/types/types';

const TENANT_FORM_API_KEY = '/tenantForm';

export const postTenantForm = async (
  formData: TenantFormProps,
): Promise<TenantFormProps> =>
  (console.log('formData', formData),
  await axiosInstance.post(`${TENANT_FORM_API_KEY}/initial/create`, {
    tenantForm: formData,
  })).data;

export const getTenantFormByOwnerId = async (
  ownerId: string,
): Promise<TenantFormProps | string> => {
  console.log('ownerId', ownerId);
  const response = await axiosInstance.get(
    `${TENANT_FORM_API_KEY}/initial/${ownerId}`,
  );
  return response.data;
};

export const postTenantFormQuarterly = async (
  formData: QuarterlyTenantFormProps,
): Promise<QuarterlyTenantFormProps> =>
  (console.log('formData', formData),
  await axiosInstance.post(`${TENANT_FORM_API_KEY}/quarterly/create`, {
    tenantForm: formData,
  })).data;

export const getTenantFormQuarterlyByOwnerId = async (
  ownerId: string,
): Promise<TenantFormProps | string> => {
  console.log('ownerId', ownerId);
  const response = await axiosInstance.get(
    `${TENANT_FORM_API_KEY}/quarterly/${ownerId}`,
  );
  return response.data;
};
