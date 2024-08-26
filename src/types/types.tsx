import { IUserData } from '@/models';

export type ReviewProps = {
  _id?: string;
  user: Pick<IUserData, 'firstName' | 'lastName' | 'profile_image'>;
  date: Date;
  description: string;
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
