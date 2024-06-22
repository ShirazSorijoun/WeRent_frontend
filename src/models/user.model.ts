export enum UserRole {
  Admin = 'admin',
  Owner = 'owner',
  Tenant = 'tenant',
}

export interface IUserData {
  name: string;
  email: string;
  password: string;
  roles?: UserRole;
  profile_image?: string;
  advertisedApartments?: string[];
}

export interface IUser extends IUserData {
  _id?: string;
  accessToken?: string;
  refreshToken?: string;
  tokens?: string[];
}

export interface ILogin {
  name: string;
  email: string;
  password: string;
  roles?: UserRole;
}

export interface UpdateOwnProfileData {
  name?: string;
  email?: string;
  password?: string;
  profile_image?: string;
}