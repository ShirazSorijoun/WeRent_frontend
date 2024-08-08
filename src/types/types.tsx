import { IUserData } from '@/models';
import { ICoordinates } from '@/models/addressCheck';

export type ApartmentProps = {
  _id?: string;
  city: string;
  address: string;
  type: string;
  owner: string;
  floor: number;
  numberOfFloors: number;
  rooms: number;
  sizeInSqMeters: number;
  price: number;
  entryDate: Date;
  apartment_image?: string;
  furniture?: string;
  features: {
    parking: boolean;
    accessForDisabled: boolean;
    storage: boolean;
    dimension: boolean;
    terrace: boolean;
    garden: boolean;
    elevators: boolean;
    airConditioning: boolean;
    [key: string]: boolean;
  };
  description?: string;
  phone?: string;
  coordinate?: ICoordinates;
};

export type IMatch = {
  _id?: string;
  apartment: string;
  user: Pick<
    IUserData,
    'email' | 'firstName' | 'lastName' | 'phoneNumber' | '_id'
  >;
  date: Date;
  accepted: boolean;
};

export type ReviewProps = {
  _id?: string;
  ownerName: string;
  ownerImage: string;
  date: string;
  description: string;
};

export const defaultApartment: ApartmentProps = {
  _id: '',
  city: '',
  address: '',
  type: '',
  owner: '',
  floor: 0,
  numberOfFloors: 0,
  rooms: 0,
  sizeInSqMeters: 0,
  price: 0,
  entryDate: new Date(),
  apartment_image: '',
  furniture: '',
  features: {
    parking: false,
    accessForDisabled: false,
    storage: false,
    dimension: false,
    terrace: false,
    garden: false,
    elevators: false,
    airConditioning: false,
  },
  description: '',
  phone: ' ',
};

export type TenantFormProps = {
  rentalAgreement: boolean;
  rentalAgreementComments?: string;
  propertyInformation: boolean;
  propertyInformationComments?: string;
  leaseSigningProcess: boolean;
  leaseSigningProcessComments?: string;
  questionsAddressed: boolean;
  questionsAddressedComments?: string;
  propertyCondition: boolean;
  propertyConditionComments?: string;
  receivedInformation: boolean;
  transitionProblems?: string;
  satisfactionRating: number;
  maintenanceRequests: boolean;
  maintenanceRequestsComments?: string;
  firstImpression?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type QuarterlyTenantFormProps = {
  propertyConditionRating: number;
  maintenanceIssues?: string;
  responseTimeSatisfaction: number;
  ownerResponsiveness: number;
  comfortableRaisingConcerns: boolean;
  comfortableRaisingConcernsComments?: string;
  renewalConsideration: 'Yes' | 'No' | 'Undecided';
  responseTimeToRequests:
    | 'Within 24 hours'
    | '1-3 days'
    | '4-7 days'
    | 'More than a week';
  resolutionTime:
    | 'Within 24 hours'
    | '1-3 days'
    | '4-7 days'
    | 'More than a week';
  issuesResolvedToSatisfaction: boolean;
  issuesResolvedToSatisfactionComments?: string;
  preferredCommunicationMethod: 'Phone' | 'Email' | 'Text' | 'Personal';
  communicationSkillsRating: number;
  createdAt?: Date;
  updatedAt?: Date;
};
