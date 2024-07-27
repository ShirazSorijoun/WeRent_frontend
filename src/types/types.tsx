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
  coordinate?: {
    lng: number;
    lat: number;
  };
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

export type QuarterlyTenantFormProps = {
  propertyConditionRating: number;
  maintenanceIssues?: string;
  responseTimeSatisfaction: number;
  ownerResponsiveness: number;
  comfortableRaisingConcerns: 'Yes' | 'No';
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
  issuesResolvedToSatisfaction: 'Yes' | 'No';
  issuesResolvedToSatisfactionComments?: string;
  preferredCommunicationMethod: 'Phone' | 'Email' | 'Text' | 'Personal';
  communicationSkillsRating: number;
  comfortableRaisingIssues: 'Yes' | 'No';
  createdAt?: Date;
  updatedAt?: Date;
};

export type LeaseAgreementFormProps = {
  _id?: string;
  date_dayOfTheMonth: number;
  date_month: number;
  date_year: number;

  ownerId?: string;
  ownerName: string;
  ownerIDNumber: string;
  ownerStreet: string;
  ownerCity: string;

  tenantId?: string;
  tenantName: string;
  tenantIDNumber: string;
  tenantStreet: string;
  tenantCity: string;

  apartmentId?: string;
  apartmentNumberOfRooms: number;
  apartmentFloorNumber: number;
  apartmentStreet: string;
  apartmentCity: string;

  numOfRentalMonths: number;
  startDate: string;
  endDate: string;
  rentalPricePerMonth: number;
  dayOfTheMonthForPayment: number;
  paymentMethod: string;

  nameOfBank?: string;
  bankAccountNumber?: string;
  bankBranch?: string;

  optionPeriod: string;
  optionPeriodLength?: number;
  maxPercentageIncrease?: number;
  maxNumOfMonthsIncludeOptionPeriod?: number;
  numOfDaysForRepair: number;
  subtenant: string;
  numOfDaysPaymentDelay: number;

  promissoryNote: string;
  promissoryNoteAmount?: number;
  letterOfGuarantee: string;
  guarantee?: string;
  guaranteeAmount?: number;
  animal: string;
};
