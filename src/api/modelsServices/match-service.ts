import { IMatch } from '@/models/match.model';
import { axiosInstance } from '../api';

const MATCH_API_KEY = '/match';

export const acceptMatch = async (
  matchId: string,
  status: boolean,
): Promise<void> =>
  axiosInstance.put(`${MATCH_API_KEY}/accept`, {
    matchId,
    status,
  });

export const getMatchingListByApartment = async (
  apartmentId: string,
): Promise<IMatch[]> =>
  (await axiosInstance.get(`${MATCH_API_KEY}/byApartment/${apartmentId}`)).data;

export const getMatchingListByUser = async (
  userId: string,
): Promise<IMatch[]> =>
  (await axiosInstance.get(`${MATCH_API_KEY}/byUser/${userId}`)).data;

export const getMatchStatus = async (
  apartmentId: string,
): Promise<boolean | undefined> =>
  (await axiosInstance.get(`${MATCH_API_KEY}/status/${apartmentId}`)).data;

export const matchApartment = async (apartmentId: string): Promise<void> =>
  axiosInstance.post(`${MATCH_API_KEY}`, { apartmentId });
