import { axiosInstance } from '../api';
import { addressCheckRes, ICoordinates } from '@/models/addressCheck';
import { IApartment } from '@/models/apartment.model';
import { convertITMToUTM } from '@/utils/coordinates';

const APARTMENT_API_KEY = '/apartment';

export const getAllApartments = async (): Promise<IApartment[]> =>
  (await axiosInstance.get(APARTMENT_API_KEY)).data;

export const postApartment = async (
  apartmentData: IApartment,
): Promise<IApartment> =>
  (
    await axiosInstance.post(`${APARTMENT_API_KEY}/create`, {
      apartment: apartmentData,
    })
  ).data;

export const getApartmentById = async (id: string): Promise<IApartment> =>
  (await axiosInstance.get(`${APARTMENT_API_KEY}/${id}`)).data;

export const updateApartment = async (
  id: string,
  updatedApartment: Partial<IApartment>,
): Promise<IApartment> =>
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
): Promise<boolean> => {
  const res: any[] = (
    await axiosInstance.get(
      `${APARTMENT_API_KEY}/searchPointsWithinRadius/${apartmentId}`,
    )
  ).data;

  return !!res.length || true;
};

export const getAddressCoordinates = async (
  address: string,
  city: string,
): Promise<ICoordinates> => {
  const res = await fetch(
    `https://es.govmap.gov.il/TldSearch/api/DetailsByQuery?query=${address} ${city}&lyrs=1&gid=govmap`,
  );

  const resData: addressCheckRes = await res.json();

  if (resData.Error) {
    throw new Error();
  } else {
    const originCoordinates = resData.data.ADDRESS[0];
    return convertITMToUTM(originCoordinates.X, originCoordinates.Y);
  }
};
