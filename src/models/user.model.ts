export interface IUserData {
  _id?: string;
  firstName: string;
  lastName: string;
  personalId: string;
  streetAddress: string;
  cityAddress: string;
  phoneNumber: string;
  email: string;
  password: string;
  profile_image?: string;
  advertisedApartments?: string[];
  isAdmin?: boolean;
}

export interface StoreUser extends IUserData {
  userId: string;
  isWithGoogle: boolean;
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
  firstName: string;
  lastName: string;
}

export interface UpdateOwnProfileData {
  firstName?: string;
  lastName?: string;
  personalId?: string;
  streetAddress?: string;
  cityAddress?: string;
  phoneNumber?: string;
  email?: string;
  password?: string;
  profile_image?: string;
}

export const defaultUserData: IUserData = {
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  personalId: '',
  cityAddress: '',
  streetAddress: '',
  phoneNumber: '',
};

export const googleDefaultPass = 'sign by google';
