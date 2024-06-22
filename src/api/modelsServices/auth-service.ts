import { CredentialResponse } from '@react-oauth/google';
import { IUser, ILogin } from '@/models';
import { axiosInstance } from '../api';
import { LoginDecodedData } from '../apiUtils';

const AUTH_API_KEY = '/auth';

const registerUser = async (user: IUser): Promise<IUser> =>
  (await axiosInstance.post(`${AUTH_API_KEY}/register`, user)).data;

const loginUser = async (user: ILogin): Promise<any> =>
  (await axiosInstance.post(`${AUTH_API_KEY}/login`, user)).data;

const googleSignin = async (credentialResponse: CredentialResponse) =>
  (await axiosInstance.post(`${AUTH_API_KEY}/google`, credentialResponse)).data;

const refreshToken = async (): Promise<LoginDecodedData> =>
  (await axiosInstance.get(`${AUTH_API_KEY}/refresh`)).data;

export const authAPI = {
  registerUser,
  loginUser,
  googleSignin,
  refreshToken,
};
