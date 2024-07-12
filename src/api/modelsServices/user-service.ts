import { ApartmentProps } from '@/types/types';
import { IUser, IUserData, UpdateOwnProfileData } from '@/models';
import { axiosInstance } from '../api';

const USER_API_KEY = '/user';

const getUserById = async (userId: string): Promise<IUserData> => {
  const response = await axiosInstance.get(`${USER_API_KEY}/id/${userId}`);

  const {
    name,
    email,
    password,
    profile_image,
    advertisedApartments,
    isAdmin,
  } = response.data;

  return {
    name,
    email,
    password,
    isAdmin,
    advertisedApartments,
    profile_image,
  };
};

const getUserApartments = async (): Promise<ApartmentProps[]> =>
  (await axiosInstance.get(`${USER_API_KEY}/apartments`)).data;

const updateOwnProfile = async (user: UpdateOwnProfileData): Promise<void> => {
  await axiosInstance.patch(`${USER_API_KEY}/updateOwnProfile`, {
    user,
  });
};

const checkOldPassword = async (oldPassword: string): Promise<boolean> =>
  !!(
    await axiosInstance.post(`${USER_API_KEY}/checkOldPassword`, {
      oldPassword,
    })
  ).data.isValid;

const getAllUsers = async (): Promise<IUser[]> =>
  (await axiosInstance.get(USER_API_KEY)).data;

const deleteUser = async (userId: string): Promise<void> => {
  await axiosInstance.get(`${USER_API_KEY}/delete/${userId}`);
};

export const userAPI = {
  getUserById,
  getUserApartments,
  updateOwnProfile,
  checkOldPassword,
  getAllUsers,
  deleteUser,
};
