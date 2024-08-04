import { z } from 'zod';

export enum ETenantQuestionnaireFields {
  PROPERTY_CONDITION_RATING = 'propertyConditionRating',
  MAINTENANCE_ISSUES = 'maintenanceIssues',
  RESPONSE_TIME_SATISFACTION = 'responseTimeSatisfaction',
  OWNER_RESPONSIVENESS = 'ownerResponsiveness',
  COMFORTABLE_RAISING_CONCERNS = 'comfortableRaisingConcerns',
  COMFORTABLE_RAISING_CONCERNS_COMMENTS = 'comfortableRaisingConcernsComments',
  RENEWAL_CONSIDERATION = 'renewalConsideration',
  RESPONSE_TIME_TO_REQUESTS = 'responseTimeToRequests',
  RESOLUTION_TIME = 'resolutionTime',
  ISSUES_RESOLVED_TO_SATISFACTION = 'issuesResolvedToSatisfaction',
  PREFERRED_COMMUNICATION_METHOD = 'preferredCommunicationMethod',
  COMMUNICATION_SKILLS_RATING = 'communicationSkillsRating',
}

export const quarterlyTenantQuestionnaireFormDataObject: Record<
  ETenantQuestionnaireFields,
  { fieldName: string; label: string }
> = {
  [ETenantQuestionnaireFields.PROPERTY_CONDITION_RATING]: {
    fieldName: ETenantQuestionnaireFields.PROPERTY_CONDITION_RATING,
    label:
      'How satisfied are you with the condition of the property so far? (rating 1-5)',
  },
  [ETenantQuestionnaireFields.MAINTENANCE_ISSUES]: {
    fieldName: ETenantQuestionnaireFields.MAINTENANCE_ISSUES,
    label:
      'Did you encounter any maintenance issues during this quarter? If so, what were they and how were they treated?',
  },
  [ETenantQuestionnaireFields.RESPONSE_TIME_SATISFACTION]: {
    fieldName: ETenantQuestionnaireFields.RESPONSE_TIME_SATISFACTION,
    label:
      'How satisfied are you with the response time for maintenance and repair? (rating 1-5)',
  },
  [ETenantQuestionnaireFields.OWNER_RESPONSIVENESS]: {
    fieldName: ETenantQuestionnaireFields.OWNER_RESPONSIVENESS,
    label:
      'How responsive is the owner/landlord to your concerns? (rating 1-5)',
  },
  [ETenantQuestionnaireFields.COMFORTABLE_RAISING_CONCERNS]: {
    fieldName: ETenantQuestionnaireFields.COMFORTABLE_RAISING_CONCERNS,
    label:
      'Did you feel comfortable raising problems or concerns with the owner/landlord? (yes/no)',
  },
  [ETenantQuestionnaireFields.COMFORTABLE_RAISING_CONCERNS_COMMENTS]: {
    fieldName: ETenantQuestionnaireFields.COMFORTABLE_RAISING_CONCERNS_COMMENTS,
    label: 'Comments',
  },
  [ETenantQuestionnaireFields.RENEWAL_CONSIDERATION]: {
    fieldName: ETenantQuestionnaireFields.RENEWAL_CONSIDERATION,
    label:
      'Are you considering renewing your lease when it expires? (yes/no/undecided)',
  },
  [ETenantQuestionnaireFields.RESPONSE_TIME_TO_REQUESTS]: {
    fieldName: ETenantQuestionnaireFields.RESPONSE_TIME_TO_REQUESTS,
    label:
      'How long did the owner/landlord usually take to respond to your requests or complaints? (within 24 hours, 1-3 days, 4-7 days, more than a week)',
  },
  [ETenantQuestionnaireFields.RESOLUTION_TIME]: {
    fieldName: ETenantQuestionnaireFields.RESOLUTION_TIME,
    label:
      'How long did it take to resolve maintenance or repair issues? (within 24 hours, 1-3 days, 4-7 days, more than a week)',
  },
  [ETenantQuestionnaireFields.ISSUES_RESOLVED_TO_SATISFACTION]: {
    fieldName: ETenantQuestionnaireFields.ISSUES_RESOLVED_TO_SATISFACTION,
    label:
      'Have the repair or maintenance issues been resolved to your satisfaction? (yes/no)',
  },
  [ETenantQuestionnaireFields.PREFERRED_COMMUNICATION_METHOD]: {
    fieldName: ETenantQuestionnaireFields.PREFERRED_COMMUNICATION_METHOD,
    label:
      'What was your preferred method of communication with the owner/landlord? (phone, email, text, personal)',
  },
  [ETenantQuestionnaireFields.COMMUNICATION_SKILLS_RATING]: {
    fieldName: ETenantQuestionnaireFields.COMMUNICATION_SKILLS_RATING,
    label:
      'How would you rate the communication skills of the owner/landlord? (rating 1-5)',
  },
};

// Validation schema
export const schema = z.object({
  [ETenantQuestionnaireFields.PROPERTY_CONDITION_RATING]: z
    .number()
    .min(1)
    .max(5),
  [ETenantQuestionnaireFields.MAINTENANCE_ISSUES]: z.string().optional(),
  [ETenantQuestionnaireFields.RESPONSE_TIME_SATISFACTION]: z
    .number()
    .min(1)
    .max(5),
  [ETenantQuestionnaireFields.OWNER_RESPONSIVENESS]: z.number().min(1).max(5),
  [ETenantQuestionnaireFields.COMFORTABLE_RAISING_CONCERNS]: z.boolean(),
  [ETenantQuestionnaireFields.RENEWAL_CONSIDERATION]: z.enum([
    'Yes',
    'No',
    'Undecided',
  ]),
  [ETenantQuestionnaireFields.RESPONSE_TIME_TO_REQUESTS]: z.enum([
    'Within 24 hours',
    '1-3 days',
    '4-7 days',
    'More than a week',
  ]),
  [ETenantQuestionnaireFields.RESOLUTION_TIME]: z.enum([
    'Within 24 hours',
    '1-3 days',
    '4-7 days',
    'More than a week',
  ]),
  [ETenantQuestionnaireFields.ISSUES_RESOLVED_TO_SATISFACTION]: z.boolean(),
  [ETenantQuestionnaireFields.PREFERRED_COMMUNICATION_METHOD]: z.enum([
    'Phone',
    'Email',
    'Text',
    'Personal',
  ]),
  [ETenantQuestionnaireFields.COMMUNICATION_SKILLS_RATING]: z
    .number()
    .min(1)
    .max(5),
  [ETenantQuestionnaireFields.COMFORTABLE_RAISING_CONCERNS_COMMENTS]: z
    .string()
    .optional(),
});

export const quarterlyTenantQuestionnaireDefaultValues: QuarterlyTenantQuestionnaireFormData =
  {
    [ETenantQuestionnaireFields.PROPERTY_CONDITION_RATING]: 1,
    [ETenantQuestionnaireFields.MAINTENANCE_ISSUES]: '',
    [ETenantQuestionnaireFields.RESPONSE_TIME_SATISFACTION]: 1,
    [ETenantQuestionnaireFields.OWNER_RESPONSIVENESS]: 1,
    [ETenantQuestionnaireFields.COMFORTABLE_RAISING_CONCERNS]: false,
    [ETenantQuestionnaireFields.COMFORTABLE_RAISING_CONCERNS_COMMENTS]: '',
    [ETenantQuestionnaireFields.RENEWAL_CONSIDERATION]: 'Undecided',
    [ETenantQuestionnaireFields.RESPONSE_TIME_TO_REQUESTS]: 'More than a week',
    [ETenantQuestionnaireFields.RESOLUTION_TIME]: 'More than a week',
    [ETenantQuestionnaireFields.ISSUES_RESOLVED_TO_SATISFACTION]: false,
    [ETenantQuestionnaireFields.PREFERRED_COMMUNICATION_METHOD]: 'Email',
    [ETenantQuestionnaireFields.COMMUNICATION_SKILLS_RATING]: 1,
  };

export type QuarterlyTenantQuestionnaireFormData = z.infer<typeof schema>;
