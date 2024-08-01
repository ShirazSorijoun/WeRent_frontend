import { ApartmentProps } from '@/types/types';
import { IUser, IUserData, UpdateOwnProfileData } from '@/models';
import { axiosInstance } from '../api';

const USER_API_KEY = '/user';

const getUserById = async (userId: string): Promise<IUserData> => {
  const response = await axiosInstance.get(`${USER_API_KEY}/id/${userId}`);

  return response.data;
};

const getUserApartments = async (): Promise<ApartmentProps[]> =>
  (await axiosInstance.get(`${USER_API_KEY}/apartments`)).data;

const updateOwnProfile = async (user: UpdateOwnProfileData): Promise<string> =>
  (
    await axiosInstance.patch(`${USER_API_KEY}/updateOwnProfile`, {
      user,
    })
  ).data;

const updateUserPass = async (
  oldPassword: string,
  newPassword: string,
): Promise<string> =>
  (
    await axiosInstance.post(`${USER_API_KEY}/updateUserPass`, {
      oldPassword,
      newPassword,
    })
  ).data;

const getAllUsers = async (): Promise<IUser[]> =>
  (await axiosInstance.get(USER_API_KEY)).data;

const deleteUser = async (userId: string): Promise<void> => {
  await axiosInstance.get(`${USER_API_KEY}/delete/${userId}`);
};

export const userAPI = {
  getUserById,
  getUserApartments,
  updateOwnProfile,
  updateUserPass,
  getAllUsers,
  deleteUser,
};
