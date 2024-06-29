import { UserRole } from './user.model';

export interface LoginDecodedData {
  accessToken: string;
  refreshToken: string;
}

export interface ILoginResponse {
  token: LoginDecodedData;
  userId: string;
  userRole: UserRole;
}
