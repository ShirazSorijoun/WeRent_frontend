export interface IUserData {
  _id?: string;
  name: string;
  email: string;
  password: string;
  profile_image?: string;
  advertisedApartments?: string[];
  isAdmin?: boolean;
}

export interface StoreUser extends IUserData {
  userId: string;
}
export interface IUser extends IUserData {
  _id?: string;
  accessToken?: string;
  refreshToken?: string;
  tokens?: string[];
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister extends ILogin {
  name: string;
}

export interface UpdateOwnProfileData {
  name?: string;
  email?: string;
  password?: string;
  profile_image?: string;
}

export const googleDefaultPass = 'sign by google';
