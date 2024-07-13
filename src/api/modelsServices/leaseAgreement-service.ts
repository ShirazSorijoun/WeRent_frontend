import { axiosInstance } from '../api';
import { LeaseAgreementFormProps } from '@/types/types';


const API_KEY = '/leaseAgreementForm';

export const postLeaseAgreementForm = async (
  formData: LeaseAgreementFormProps,
): Promise<LeaseAgreementFormProps> =>
  (console.log('formData', formData),
  await axiosInstance.post(`${API_KEY}/create`, {
    leaseAgreementForm: formData,
  })).data;

export const leaseAgreementAPI = {
  postLeaseAgreementForm,
};