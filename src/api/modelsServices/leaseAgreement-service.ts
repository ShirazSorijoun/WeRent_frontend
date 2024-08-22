import { ILeaseAgreement, ILeaseAgreementForm } from '@/models/leaseAgreement';
import { axiosInstance } from '../api';

const API_KEY = '/leaseAgreement';

export const postLeaseAgreementForm = async (
  formData: ILeaseAgreementForm,
  tenantId: string,
  apartmentId: string,
): Promise<ILeaseAgreementForm> =>
  (console.log('formData', formData),
  await axiosInstance.post(`${API_KEY}/create`, {
    leaseAgreement: formData,
    tenantId,
    apartmentId,
  })).data;

export const updateLeaseAgreement = async (
  formData: ILeaseAgreementForm,
  leaseId: string,
): Promise<ILeaseAgreementForm> =>
  (
    await axiosInstance.patch(`${API_KEY}/update`, {
      updatedLeaseAgreement: formData,
      leaseId,
    })
  ).data;

export const getLeaseAgreement = async (
  tenantId: string,
  apartmentId: string,
): Promise<ILeaseAgreement> =>
  (await axiosInstance.get(`${API_KEY}/${tenantId}/${apartmentId}`)).data;

export const getLeaseAgreementList = async (): Promise<ILeaseAgreement[]> =>
  (await axiosInstance.get(`${API_KEY}/list`)).data;
