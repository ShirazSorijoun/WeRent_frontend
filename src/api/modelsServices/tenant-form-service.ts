import { axiosInstance } from '../api';
import { QuarterlyTenantFormProps, TenantFormProps } from '@/types/types';

const TENANT_FORM_API_KEY = '/tenantForm';

export const postTenantForm = async (
  formData: TenantFormProps,
  apartmentId: string,
): Promise<TenantFormProps> =>
  (console.log('apartmentId', apartmentId),
  await axiosInstance.post(`${TENANT_FORM_API_KEY}/initial/create`, {
    tenantForm: formData,
    apartment: apartmentId,
  })).data;

export const getTenantFormByOwnerId = async (
  ownerId: string,
  apartmentId: string,
): Promise<TenantFormProps | string> => {
  console.log('apartment', apartmentId);
  const response = await axiosInstance.get(
    `${TENANT_FORM_API_KEY}/initial/${ownerId}`,
    {
      params: {
        apartment: apartmentId,
      },
    },
  );
  return response.data;
};

export const postTenantFormQuarterly = async (
  formData: QuarterlyTenantFormProps,
  apartmentId: string,
): Promise<QuarterlyTenantFormProps> =>
  (console.log('formData', formData),
  await axiosInstance.post(`${TENANT_FORM_API_KEY}/quarterly/create`, {
    tenantForm: formData,
    apartment: apartmentId,
  })).data;

export const getTenantFormQuarterlyByOwnerId = async (
  ownerId: string,
  apartmentId: string,
): Promise<TenantFormProps | string> => {
  console.log('ownerId', ownerId);
  const response = await axiosInstance.get(
    `${TENANT_FORM_API_KEY}/quarterly/${ownerId}`,
    {
      params: {
        apartment: apartmentId,
      },
    },
  );
  return response.data;
};
