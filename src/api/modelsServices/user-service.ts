import { IUser, IUserData, UpdateOwnProfileData } from '@/models';
import { axiosInstance } from '../api';
import { IApartment } from '@/models/apartment.model';

const USER_API_KEY = '/user';

export const getUserById = async (userId: string): Promise<IUserData> => {
  const response = await axiosInstance.get(`${USER_API_KEY}/id/${userId}`);

  return response.data;
};

export const getUserApartments = async (): Promise<IApartment[]> =>
  (await axiosInstance.get(`${USER_API_KEY}/apartments`)).data;

export const updateOwnProfile = async (
  user: UpdateOwnProfileData,
): Promise<string> =>
  (
    await axiosInstance.patch(`${USER_API_KEY}/updateOwnProfile`, {
      user,
    })
  ).data;

export const updateUserPass = async (
  oldPassword: string,
  newPassword: string,
): Promise<string> =>
  (
    await axiosInstance.post(`${USER_API_KEY}/updateUserPass`, {
      oldPassword,
      newPassword,
    })
  ).data;

export const getAllUsers = async (): Promise<IUser[]> =>
  (await axiosInstance.get(USER_API_KEY)).data;

export const deleteUser = async (userId: string): Promise<void> => {
  await axiosInstance.get(`${USER_API_KEY}/delete/${userId}`);
};
