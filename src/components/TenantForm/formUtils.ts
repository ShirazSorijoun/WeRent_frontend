import { z } from 'zod';

export enum EInitialTenantQuestionnaireFields {
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

export const initialTenantQuestionnaireFormDataObject: Record<
  EInitialTenantQuestionnaireFields,
  { fieldName: string; label: string }
> = {
  [EInitialTenantQuestionnaireFields.RENTAL_AGREEMENT]: {
    fieldName: EInitialTenantQuestionnaireFields.RENTAL_AGREEMENT,
    label: 'האם הסכם השכירות היה ברור וקל להבנה?',
  },
  [EInitialTenantQuestionnaireFields.RENTAL_AGREEMENT_COMMENTS]: {
    fieldName: EInitialTenantQuestionnaireFields.RENTAL_AGREEMENT_COMMENTS,
    label: 'הערות',
  },
  [EInitialTenantQuestionnaireFields.PROPERTY_INFORMATION]: {
    fieldName: EInitialTenantQuestionnaireFields.PROPERTY_INFORMATION,
    label: 'האם קיבלת מידע מספיק על הנכס ותנאי השכירות?',
  },
  [EInitialTenantQuestionnaireFields.PROPERTY_INFORMATION_COMMENTS]: {
    fieldName: EInitialTenantQuestionnaireFields.PROPERTY_INFORMATION_COMMENTS,
    label: 'הערות',
  },
  [EInitialTenantQuestionnaireFields.LEASE_SIGNING_PROCESS]: {
    fieldName: EInitialTenantQuestionnaireFields.LEASE_SIGNING_PROCESS,
    label: 'האם תהליך חתימת החוזה היה פשוט?',
  },
  [EInitialTenantQuestionnaireFields.LEASE_SIGNING_PROCESS_COMMENTS]: {
    fieldName: EInitialTenantQuestionnaireFields.LEASE_SIGNING_PROCESS_COMMENTS,
    label: 'הערות',
  },
  [EInitialTenantQuestionnaireFields.QUESTIONS_ADDRESSED]: {
    fieldName: EInitialTenantQuestionnaireFields.QUESTIONS_ADDRESSED,
    label: 'האם כל השאלות והחששות שלך נענו בזמן חתימת החוזה?',
  },
  [EInitialTenantQuestionnaireFields.QUESTIONS_ADDRESSED_COMMENTS]: {
    fieldName: EInitialTenantQuestionnaireFields.QUESTIONS_ADDRESSED_COMMENTS,
    label: 'הערות',
  },
  [EInitialTenantQuestionnaireFields.PROPERTY_CONDITION]: {
    fieldName: EInitialTenantQuestionnaireFields.PROPERTY_CONDITION,
    label: 'האם הנכס היה נקי ומוכן למעבר?',
  },
  [EInitialTenantQuestionnaireFields.PROPERTY_CONDITION_COMMENTS]: {
    fieldName: EInitialTenantQuestionnaireFields.PROPERTY_CONDITION_COMMENTS,
    label: 'הערות',
  },
  [EInitialTenantQuestionnaireFields.RECEIVED_INFORMATION]: {
    fieldName: EInitialTenantQuestionnaireFields.RECEIVED_INFORMATION,
    label:
      'האם קיבלת את כל המידע הדרוש, כמו אנשי קשר לשעת חירום, קודים לבניין והנחיות לפינוי אשפה?',
  },
  [EInitialTenantQuestionnaireFields.TRANSITION_PROBLEMS]: {
    fieldName: EInitialTenantQuestionnaireFields.TRANSITION_PROBLEMS,
    label: 'האם נתקלת בבעיות בתהליך המעבר? אם כן, אנא תאר.',
  },
  [EInitialTenantQuestionnaireFields.SATISFACTION_RATING]: {
    fieldName: EInitialTenantQuestionnaireFields.SATISFACTION_RATING,
    label: 'עד כמה אתה מרוצה ממצב הנכס?',
  },
  [EInitialTenantQuestionnaireFields.MAINTENANCE_REQUESTS]: {
    fieldName: EInitialTenantQuestionnaireFields.MAINTENANCE_REQUESTS,
    label:
      'האם היו בקשות תחזוקה או תיקון ראשוניות? אם כן, האם הן טופלו מיידית?',
  },
  [EInitialTenantQuestionnaireFields.MAINTENANCE_REQUESTS_COMMENTS]: {
    fieldName: EInitialTenantQuestionnaireFields.MAINTENANCE_REQUESTS_COMMENTS,
    label: 'הערות',
  },
  [EInitialTenantQuestionnaireFields.FIRST_IMPRESSION]: {
    fieldName: EInitialTenantQuestionnaireFields.FIRST_IMPRESSION,
    label: 'מה היה הרושם הראשוני שלך על הנכס?',
  },
};

// Validation schema
export const schema = z.object({
  [EInitialTenantQuestionnaireFields.RENTAL_AGREEMENT]: z.boolean(),
  [EInitialTenantQuestionnaireFields.RENTAL_AGREEMENT_COMMENTS]: z
    .string()
    .optional(),
  [EInitialTenantQuestionnaireFields.PROPERTY_INFORMATION]: z.boolean(),
  [EInitialTenantQuestionnaireFields.PROPERTY_INFORMATION_COMMENTS]: z
    .string()
    .optional(),
  [EInitialTenantQuestionnaireFields.LEASE_SIGNING_PROCESS]: z.boolean(),
  [EInitialTenantQuestionnaireFields.LEASE_SIGNING_PROCESS_COMMENTS]: z
    .string()
    .optional(),
  [EInitialTenantQuestionnaireFields.QUESTIONS_ADDRESSED]: z.boolean(),
  [EInitialTenantQuestionnaireFields.QUESTIONS_ADDRESSED_COMMENTS]: z
    .string()
    .optional(),
  [EInitialTenantQuestionnaireFields.PROPERTY_CONDITION]: z.boolean(),
  [EInitialTenantQuestionnaireFields.PROPERTY_CONDITION_COMMENTS]: z
    .string()
    .optional(),
  [EInitialTenantQuestionnaireFields.RECEIVED_INFORMATION]: z.boolean(),
  [EInitialTenantQuestionnaireFields.TRANSITION_PROBLEMS]: z
    .string()
    .optional(),
  [EInitialTenantQuestionnaireFields.SATISFACTION_RATING]: z
    .number()
    .min(1)
    .max(5),
  [EInitialTenantQuestionnaireFields.MAINTENANCE_REQUESTS]: z.boolean(),
  [EInitialTenantQuestionnaireFields.MAINTENANCE_REQUESTS_COMMENTS]: z
    .string()
    .optional(),
  [EInitialTenantQuestionnaireFields.FIRST_IMPRESSION]: z.string().optional(),
});

export const initialTenantQuestionnaireDefaultValues: InitialTenantQuestionnaireFormData =
  {
    [EInitialTenantQuestionnaireFields.RENTAL_AGREEMENT]: false,
    [EInitialTenantQuestionnaireFields.RENTAL_AGREEMENT_COMMENTS]: '',
    [EInitialTenantQuestionnaireFields.PROPERTY_INFORMATION]: false,
    [EInitialTenantQuestionnaireFields.PROPERTY_INFORMATION_COMMENTS]: '',
    [EInitialTenantQuestionnaireFields.LEASE_SIGNING_PROCESS]: false,
    [EInitialTenantQuestionnaireFields.LEASE_SIGNING_PROCESS_COMMENTS]: '',
    [EInitialTenantQuestionnaireFields.QUESTIONS_ADDRESSED]: false,
    [EInitialTenantQuestionnaireFields.QUESTIONS_ADDRESSED_COMMENTS]: '',
    [EInitialTenantQuestionnaireFields.PROPERTY_CONDITION]: false,
    [EInitialTenantQuestionnaireFields.PROPERTY_CONDITION_COMMENTS]: '',
    [EInitialTenantQuestionnaireFields.RECEIVED_INFORMATION]: false,
    [EInitialTenantQuestionnaireFields.TRANSITION_PROBLEMS]: '',
    [EInitialTenantQuestionnaireFields.SATISFACTION_RATING]: 1,
    [EInitialTenantQuestionnaireFields.MAINTENANCE_REQUESTS]: false,
    [EInitialTenantQuestionnaireFields.MAINTENANCE_REQUESTS_COMMENTS]: '',
    [EInitialTenantQuestionnaireFields.FIRST_IMPRESSION]: '',
  };

export type InitialTenantQuestionnaireFormData = z.infer<typeof schema>;
