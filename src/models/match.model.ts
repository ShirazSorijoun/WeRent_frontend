import { IApartment } from './apartment.model';
import { IUserData } from './user.model';

export type IMatch = {
  _id: string;
  apartment: Pick<IApartment, '_id' | 'leaseId'>;
  user: Pick<
    IUserData,
    'email' | 'firstName' | 'lastName' | 'phoneNumber' | '_id' | 'profile_image'
  >;
  date: Date;
  accepted?: boolean;
};

export type IMatchMap = Record<string, IMatch[]>;
