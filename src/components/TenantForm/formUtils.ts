import { z } from 'zod';
import { IControlledSelectArray, IFormField } from '@/models/forms';

export enum ETenantQuestionnaireFields {
  RENTAL_AGREEMENT = 'rentalAgreement',
  RENTAL_AGREEMENT_COMMENTS = 'rentalAgreementComments',
  PROPERTY_INFORMATION = 'propertyInformation',
  PROPERTY_INFORMATION_COMMENTS = 'propertyInformationComments',
  LEASE_SIGNING_PROCESS = 'leaseSigningProcess',
  LEASE_SIGNING_PROCESS_COMMENTS = 'leaseSigningProcessComments',
  QUESTIONS_ADDRESSED = 'questionsAddressed',
  QUESTIONS_ADDRESSED_COMMENTS = 'questionsAddressedComments',
  PROPERTY_CONDITION = 'propertyCondition',
  PROPERTY_CONDITION_COMMENTS = 'propertyConditionComments',
  RECEIVED_INFORMATION = 'receivedInformation',
  TRANSITION_PROBLEMS = 'transitionProblems',
  SATISFACTION_RATING = 'satisfactionRating',
  MAINTENANCE_REQUESTS = 'maintenanceRequests',
  MAINTENANCE_REQUESTS_COMMENTS = 'maintenanceRequestsComments',
  FIRST_IMPRESSION = 'firstImpression',
}

export const tenantQuestionnaireFormDataObject: Record<
  ETenantQuestionnaireFields,
  IFormField
> = {
  [ETenantQuestionnaireFields.RENTAL_AGREEMENT]: {
    fieldName: ETenantQuestionnaireFields.RENTAL_AGREEMENT,
    label: 'Was the rental agreement clear and easy to understand?',
  },
  [ETenantQuestionnaireFields.RENTAL_AGREEMENT_COMMENTS]: {
    fieldName: ETenantQuestionnaireFields.RENTAL_AGREEMENT_COMMENTS,
    label: 'Comments',
  },
  [ETenantQuestionnaireFields.PROPERTY_INFORMATION]: {
    fieldName: ETenantQuestionnaireFields.PROPERTY_INFORMATION,
    label:
      'Did you feel that you received enough information about the property and the rental conditions?',
  },
  [ETenantQuestionnaireFields.PROPERTY_INFORMATION_COMMENTS]: {
    fieldName: ETenantQuestionnaireFields.PROPERTY_INFORMATION_COMMENTS,
    label: 'Comments',
  },
  [ETenantQuestionnaireFields.LEASE_SIGNING_PROCESS]: {
    fieldName: ETenantQuestionnaireFields.LEASE_SIGNING_PROCESS,
    label: 'Was the process of signing the lease simple?',
  },
  [ETenantQuestionnaireFields.LEASE_SIGNING_PROCESS_COMMENTS]: {
    fieldName: ETenantQuestionnaireFields.LEASE_SIGNING_PROCESS_COMMENTS,
    label: 'Comments',
  },
  [ETenantQuestionnaireFields.QUESTIONS_ADDRESSED]: {
    fieldName: ETenantQuestionnaireFields.QUESTIONS_ADDRESSED,
    label:
      'Were all your questions and concerns addressed during the signing of the lease?',
  },
  [ETenantQuestionnaireFields.QUESTIONS_ADDRESSED_COMMENTS]: {
    fieldName: ETenantQuestionnaireFields.QUESTIONS_ADDRESSED_COMMENTS,
    label: 'Comments',
  },
  [ETenantQuestionnaireFields.PROPERTY_CONDITION]: {
    fieldName: ETenantQuestionnaireFields.PROPERTY_CONDITION,
    label: 'Was the property clean and ready for moving in?',
  },
  [ETenantQuestionnaireFields.PROPERTY_CONDITION_COMMENTS]: {
    fieldName: ETenantQuestionnaireFields.PROPERTY_CONDITION_COMMENTS,
    label: 'Comments',
  },
  [ETenantQuestionnaireFields.RECEIVED_INFORMATION]: {
    fieldName: ETenantQuestionnaireFields.RECEIVED_INFORMATION,
    label:
      'Have you received all the necessary information, such as emergency contacts, building codes and garbage disposal instructions?',
  },
  [ETenantQuestionnaireFields.TRANSITION_PROBLEMS]: {
    fieldName: ETenantQuestionnaireFields.TRANSITION_PROBLEMS,
    label:
      'Did you encounter any problems during the transition process? If so, please describe.',
  },
  [ETenantQuestionnaireFields.SATISFACTION_RATING]: {
    fieldName: ETenantQuestionnaireFields.SATISFACTION_RATING,
    label: 'How satisfied are you with the condition of the property?',
  },
  [ETenantQuestionnaireFields.MAINTENANCE_REQUESTS]: {
    fieldName: ETenantQuestionnaireFields.MAINTENANCE_REQUESTS,
    label:
      'Have you had any initial maintenance or repair requests? If so, were they addressed immediately?',
  },
  [ETenantQuestionnaireFields.MAINTENANCE_REQUESTS_COMMENTS]: {
    fieldName: ETenantQuestionnaireFields.MAINTENANCE_REQUESTS_COMMENTS,
    label: 'Comments',
  },
  [ETenantQuestionnaireFields.FIRST_IMPRESSION]: {
    fieldName: ETenantQuestionnaireFields.FIRST_IMPRESSION,
    label: 'What was your first impression of the property?',
  },
};

export const booleanSelectFieldValues: IControlledSelectArray = [
  { display: 'Yes', value: 'Yes' },
  { display: 'No', value: 'No' },
];

//validation
export const schema = z.object({
  [ETenantQuestionnaireFields.RENTAL_AGREEMENT]: z.enum(['Yes', 'No']),
  [ETenantQuestionnaireFields.RENTAL_AGREEMENT_COMMENTS]: z.string().optional(),
  [ETenantQuestionnaireFields.PROPERTY_INFORMATION]: z.enum(['Yes', 'No']),
  [ETenantQuestionnaireFields.PROPERTY_INFORMATION_COMMENTS]: z
    .string()
    .optional(),
  [ETenantQuestionnaireFields.LEASE_SIGNING_PROCESS]: z.enum(['Yes', 'No']),
  [ETenantQuestionnaireFields.LEASE_SIGNING_PROCESS_COMMENTS]: z
    .string()
    .optional(),
  [ETenantQuestionnaireFields.QUESTIONS_ADDRESSED]: z.enum(['Yes', 'No']),
  [ETenantQuestionnaireFields.QUESTIONS_ADDRESSED_COMMENTS]: z
    .string()
    .optional(),
  [ETenantQuestionnaireFields.PROPERTY_CONDITION]: z.enum(['Yes', 'No']),
  [ETenantQuestionnaireFields.PROPERTY_CONDITION_COMMENTS]: z
    .string()
    .optional(),
  [ETenantQuestionnaireFields.RECEIVED_INFORMATION]: z.enum(['Yes', 'No']),
  [ETenantQuestionnaireFields.TRANSITION_PROBLEMS]: z.string().optional(),
  [ETenantQuestionnaireFields.SATISFACTION_RATING]: z.number().min(1).max(5),
  [ETenantQuestionnaireFields.MAINTENANCE_REQUESTS]: z.enum(['Yes', 'No']),
  [ETenantQuestionnaireFields.MAINTENANCE_REQUESTS_COMMENTS]: z
    .string()
    .optional(),
  [ETenantQuestionnaireFields.FIRST_IMPRESSION]: z.string().optional(),
});

export const tenantQuestionnaireDefaultValues = {
  [ETenantQuestionnaireFields.RENTAL_AGREEMENT]: '',
  [ETenantQuestionnaireFields.RENTAL_AGREEMENT_COMMENTS]: '',
  [ETenantQuestionnaireFields.PROPERTY_INFORMATION]: '',
  [ETenantQuestionnaireFields.PROPERTY_INFORMATION_COMMENTS]: '',
  [ETenantQuestionnaireFields.LEASE_SIGNING_PROCESS]: '',
  [ETenantQuestionnaireFields.LEASE_SIGNING_PROCESS_COMMENTS]: '',
  [ETenantQuestionnaireFields.QUESTIONS_ADDRESSED]: '',
  [ETenantQuestionnaireFields.QUESTIONS_ADDRESSED_COMMENTS]: '',
  [ETenantQuestionnaireFields.PROPERTY_CONDITION]: '',
  [ETenantQuestionnaireFields.PROPERTY_CONDITION_COMMENTS]: '',
  [ETenantQuestionnaireFields.RECEIVED_INFORMATION]: '',
  [ETenantQuestionnaireFields.TRANSITION_PROBLEMS]: '',
  [ETenantQuestionnaireFields.SATISFACTION_RATING]: 0,
  [ETenantQuestionnaireFields.MAINTENANCE_REQUESTS]: '',
  [ETenantQuestionnaireFields.MAINTENANCE_REQUESTS_COMMENTS]: '',
  [ETenantQuestionnaireFields.FIRST_IMPRESSION]: '',
};

export type TenantQuestionnaireFormData = z.infer<typeof schema>;
