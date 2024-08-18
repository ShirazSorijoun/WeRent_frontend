import { axiosInstance } from '../api';
import { LeaseAgreementFormProps } from '@/types/types';

const API_KEY = '/leaseAgreement';

export const postLeaseAgreementForm = async (
  formData: LeaseAgreementFormProps,
  matchId: string,
): Promise<LeaseAgreementFormProps> =>
  (console.log('formData', formData),
  await axiosInstance.post(`${API_KEY}/create`, {
    leaseAgreement: formData,
    matchId,
  })).data;
