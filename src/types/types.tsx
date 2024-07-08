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
  rentalAgreement: 'Yes' | 'No';
  rentalAgreementComments?: string;
  propertyInformation: 'Yes' | 'No';
  propertyInformationComments?: string;
  leaseSigningProcess: 'Yes' | 'No';
  leaseSigningProcessComments?: string;
  questionsAddressed: 'Yes' | 'No';
  questionsAddressedComments?: string;
  propertyCondition: 'Yes' | 'No';
  propertyConditionComments?: string;
  receivedInformation: 'Yes' | 'No';
  transitionProblems?: string;
  satisfactionRating: number;
  maintenanceRequests: 'Yes' | 'No';
  maintenanceRequestsComments?: string;
  firstImpression?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

