import { ILeaseAgreementForm } from '@/models/leaseAgreement';
import { axiosInstance } from '../api';

const API_KEY = '/leaseAgreement';

export const postLeaseAgreementForm = async (
  formData: ILeaseAgreementForm,
): Promise<ILeaseAgreementForm> =>
  (console.log('formData', formData),
  await axiosInstance.post(`${API_KEY}/create`, {
    leaseAgreement: formData,
  })).data;

export const leaseAgreementAPI = {
  postLeaseAgreementForm,
};
