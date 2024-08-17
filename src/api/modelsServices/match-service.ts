import { axiosInstance } from '../api';
import { IMatch } from '@/types/types';

const MATCH_API_KEY = '/match';

export const acceptMatch = async (matchId: string): Promise<void> =>
  axiosInstance.put(`${MATCH_API_KEY}/accept`, {
    matchId,
  });

export const getMatchingList = async (apartmentId: string): Promise<IMatch[]> =>
  (await axiosInstance.get(`${MATCH_API_KEY}/${apartmentId}`)).data;

export const getMatchStatus = async (apartmentId: string): Promise<boolean> =>
  (await axiosInstance.get(`${MATCH_API_KEY}/status/${apartmentId}`)).data;

export const matchApartment = async (
  apartmentId: string,
  userId: string,
): Promise<void> =>
  axiosInstance.post(`${MATCH_API_KEY}`, {
    apartmentId,
    userId,
  });
