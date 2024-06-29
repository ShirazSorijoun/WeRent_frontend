import { CredentialResponse } from '@react-oauth/google';
import { IUser, ILogin } from '@/models';
import { axiosInstance } from '../api';
import { ILoginResponse, LoginDecodedData } from '@/models/login';

const AUTH_API_KEY = '/auth';

const registerUser = async (user: IUser): Promise<IUser> =>
  (await axiosInstance.post(`${AUTH_API_KEY}/register`, user)).data;

const loginUser = async (user: ILogin): Promise<ILoginResponse> =>
  (await axiosInstance.post(`${AUTH_API_KEY}/login`, user)).data;

const googleLogin = async (
  credentialResponse: CredentialResponse,
): Promise<ILoginResponse> =>
  (await axiosInstance.post(`${AUTH_API_KEY}/google`, credentialResponse)).data;

const refreshToken = async (): Promise<LoginDecodedData> =>
  (await axiosInstance.get(`${AUTH_API_KEY}/refresh`)).data;

export const authAPI = {
  registerUser,
  loginUser,
  googleLogin,
  refreshToken,
};
