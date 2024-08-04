import { ApartmentProps, IMatch } from '@/types/types';
import { axiosInstance } from '../api';
import { addressCheckRes, ICoordinates } from '@/models/addressCheck';
import { convertITMToUTM } from '@/utils/coorrdinates';

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

export const acceptMatch = async (matchId: string): Promise<void> =>
  axiosInstance.put(`${APARTMENT_API_KEY}/match/accept`, {
    matchId,
  });

export const getMatchingList = async (apartmentId: string): Promise<IMatch[]> =>
  (await axiosInstance.get(`${APARTMENT_API_KEY}/match/${apartmentId}`)).data;

export const matchApartment = async (
  apartmentId: string,
  userId: string,
): Promise<void> =>
  axiosInstance.post(`${APARTMENT_API_KEY}/match`, {
    apartmentId,
    userId,
  });

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
): Promise<ICoordinates> => {
  const res = await fetch(
    `https://es.govmap.gov.il/TldSearch/api/DetailsByQuery?query=${address}&lyrs=1&gid=govmap`,
  );

  const resData: addressCheckRes = await res.json();

  if (resData.Error) {
    throw new Error();
  } else {
    const originCoordinates = resData.data.ADDRESS[0];
    return convertITMToUTM(originCoordinates.X, originCoordinates.Y);
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
  matchApartment,
  getMatchingList,
  acceptMatch,
};
