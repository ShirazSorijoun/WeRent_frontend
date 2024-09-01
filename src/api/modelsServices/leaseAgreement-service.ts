import { ILeaseAgreement, ILeaseAgreementForm } from '@/models/leaseAgreement';
import { axiosInstance } from '../api';

export const LEASE_API_KEY = '/leaseAgreement';

export const postLeaseAgreementForm = async (
  formData: ILeaseAgreementForm,
  tenantId: string,
  apartmentId: string,
): Promise<ILeaseAgreementForm> =>
  (console.log('formData', formData),
  await axiosInstance.post(`${LEASE_API_KEY}/create`, {
    leaseAgreement: formData,
    tenantId,
    apartmentId,
  })).data;

export const updateLeaseAgreement = async (
  formData: ILeaseAgreementForm,
  leaseId: string,
): Promise<ILeaseAgreementForm> =>
  (
    await axiosInstance.patch(`${LEASE_API_KEY}/update`, {
      updatedLeaseAgreement: formData,
      leaseId,
    })
  ).data;

export const getLeaseAgreementByApartmentAndTenant = async (
  tenantId: string,
  apartmentId: string,
): Promise<ILeaseAgreement> =>
  (
    await axiosInstance.get(`${LEASE_API_KEY}/byApartmentAndTenant`, {
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
      `${LEASE_API_KEY}/byApartment/${apartment}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching lease agreement:', error);
    throw error;
  }
};

export const getLeaseAgreementList = async (): Promise<ILeaseAgreement[]> =>
  (await axiosInstance.get(`${LEASE_API_KEY}/list`)).data;

export const getLeaseAgreementById = async (
  leaseId: string,
): Promise<ILeaseAgreement> =>
  (await axiosInstance.get(`${LEASE_API_KEY}/id/${leaseId}`)).data;

export const addSignatureToLease = async (
  signatureUrl: string,
  leaseId: string,
): Promise<ILeaseAgreement> =>
  (
    await axiosInstance.post(`${LEASE_API_KEY}/addSignature`, {
      signatureUrl,
      leaseId,
    })
  ).data;
