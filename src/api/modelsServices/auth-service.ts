import { CredentialResponse } from '@react-oauth/google';
import { IUser, ILogin } from '@/models';
import { axiosInstance } from '../api';
import { ILoginResponse, LoginDecodedData } from '@/models/login';
import { AxiosRequestConfig } from 'axios';

const AUTH_API_KEY = '/auth';

export const registerUser = async (user: IUser): Promise<IUser> =>
  (await axiosInstance.post(`${AUTH_API_KEY}/register`, user)).data;

export const loginUser = async (user: ILogin): Promise<ILoginResponse> =>
  (await axiosInstance.post(`${AUTH_API_KEY}/login`, user)).data;

export const googleLogin = async (
  credentialResponse: CredentialResponse,
): Promise<ILoginResponse> =>
  (await axiosInstance.post(`${AUTH_API_KEY}/google`, credentialResponse)).data;

export const refreshToken = async (
  config?: AxiosRequestConfig<any>,
): Promise<LoginDecodedData> =>
  (await axiosInstance.get(`${AUTH_API_KEY}/refresh`, config)).data;

export const checkToken = async (token: string | null): Promise<boolean> =>
  (await axiosInstance.post(`${AUTH_API_KEY}/checkToken`, { token })).data;
