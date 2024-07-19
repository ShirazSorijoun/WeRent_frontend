import { ApartmentProps } from '@/types/types';
import { axiosInstance } from '../api';
import { addressAPIData, addressCheckRes } from '@/models/adressCheck';

const APARTMENT_API_KEY = '/apartment';

export const getAllApartments = async (): Promise<ApartmentProps[]> =>
  (await axiosInstance.get(APARTMENT_API_KEY)).data;

export const postApartment = async (
  apartmentData: ApartmentProps,
): Promise<ApartmentProps> =>
  (
    await axiosInstance.post(`${APARTMENT_API_KEY}/create`, {
      apartment: apartmentData,
    })
  ).data;

export const getApartmentById = async (id: string): Promise<ApartmentProps> =>
  (await axiosInstance.get(`${APARTMENT_API_KEY}/${id}`)).data;

export const updateApartment = async (
  id: string,
  updatedApartment: Partial<ApartmentProps>,
): Promise<ApartmentProps> =>
  (
    await axiosInstance.patch(`${APARTMENT_API_KEY}/update`, {
      id,
      updatedApartment,
    })
  ).data;

export const deleteApartment = async (apartmentId: string) =>
  (await axiosInstance.delete(`${APARTMENT_API_KEY}/delete/${apartmentId}`))
    .data;

export const checkTamaCloseToApartment = async (
  apartmentId: string,
): Promise<boolean> =>
  new Promise((resolve, reject) => {
    resolve(true);
  });

export const getAddressCoordinates = async (
  address: string,
): Promise<addressAPIData> => {
  const res = await fetch(
    `https://es.govmap.gov.il/TldSearch/api/DetailsByQuery?query=${address}&lyrs=1&gid=govmap`,
  );

  const resData: addressCheckRes = await res.json();

  if (resData.Error) {
    throw new Error();
  } else {
    return resData.data.ADDRESS[0];
  }
};

export const apartmentAPI = {
  getAllApartments,
  postApartment,
  getApartmentById,
  updateApartment,
  deleteApartment,
  checkTamaCloseToApartment,
  getAddressCoordinates,
};
