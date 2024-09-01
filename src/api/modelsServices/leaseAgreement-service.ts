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

export const getLeaseAgreementByApartmentAndTenant = async (
  tenantId: string,
  apartmentId: string,
): Promise<ILeaseAgreement> =>
  (
    await axiosInstance.get(`${API_KEY}/byApartmentAndTenant`, {
      params: { tenantId, apartmentId },
    })
  ).data;

export const getLeaseAgreementByApartmentId = async (
  apartment: string,
): Promise<ILeaseAgreement> => {
  // Print the apartmentId to the console
  console.log('Fetching lease agreement for apartmentId:', apartment);

  try {
    const response = await axiosInstance.get(
      `${API_KEY}/byApartment/${apartment}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching lease agreement:', error);
    throw error;
  }
};

export const getLeaseAgreementList = async (): Promise<ILeaseAgreement[]> =>
  (await axiosInstance.get(`${API_KEY}/list`)).data;

export const getLeaseAgreementById = async (
  leaseId: string,
): Promise<ILeaseAgreement> =>
  (await axiosInstance.get(`${API_KEY}/id/${leaseId}`)).data;

export const addSignatureToLease = async (
  signatureUrl: string,
  leaseId: string,
): Promise<ILeaseAgreement> =>
  (
    await axiosInstance.post(`${API_KEY}/addSignature`, {
      signatureUrl,
      leaseId,
    })
  ).data;
