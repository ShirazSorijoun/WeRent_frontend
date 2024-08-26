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
    label: 'עד כמה אתה מרוצה ממצב הנכס עד כה? (דירוג 1-5)',
  },
  [ETenantQuestionnaireFields.MAINTENANCE_ISSUES]: {
    fieldName: ETenantQuestionnaireFields.MAINTENANCE_ISSUES,
    label:
      'האם נתקלת בבעיות תחזוקה במהלך הרבעון הזה? אם כן, מה היו הבעיות וכיצד הן טופלו?',
  },
  [ETenantQuestionnaireFields.RESPONSE_TIME_SATISFACTION]: {
    fieldName: ETenantQuestionnaireFields.RESPONSE_TIME_SATISFACTION,
    label: 'עד כמה אתה מרוצה מזמן התגובה לתחזוקה ותיקונים? (דירוג 1-5)',
  },
  [ETenantQuestionnaireFields.OWNER_RESPONSIVENESS]: {
    fieldName: ETenantQuestionnaireFields.OWNER_RESPONSIVENESS,
    label: 'עד כמה הבעלים/המשכיר מגיב לדאגות שלך? (דירוג 1-5)',
  },
  [ETenantQuestionnaireFields.COMFORTABLE_RAISING_CONCERNS]: {
    fieldName: ETenantQuestionnaireFields.COMFORTABLE_RAISING_CONCERNS,
    label: 'האם הרגשת בנוח להעלות בעיות או חששות מול הבעלים/המשכיר? (כן/לא)',
  },
  [ETenantQuestionnaireFields.COMFORTABLE_RAISING_CONCERNS_COMMENTS]: {
    fieldName: ETenantQuestionnaireFields.COMFORTABLE_RAISING_CONCERNS_COMMENTS,
    label: 'הערות',
  },
  [ETenantQuestionnaireFields.RENEWAL_CONSIDERATION]: {
    fieldName: ETenantQuestionnaireFields.RENEWAL_CONSIDERATION,
    label: 'האם אתה שוקל לחדש את חוזה השכירות כשיפוג? (כן/לא/מתלבט)',
  },
  [ETenantQuestionnaireFields.RESPONSE_TIME_TO_REQUESTS]: {
    fieldName: ETenantQuestionnaireFields.RESPONSE_TIME_TO_REQUESTS,
    label:
      'כמה זמן לוקח בדרך כלל לבעלים/המשכיר להגיב לבקשות או תלונות שלך? (תוך 24 שעות, 1-3 ימים, 4-7 ימים, יותר משבוע)',
  },
  [ETenantQuestionnaireFields.RESOLUTION_TIME]: {
    fieldName: ETenantQuestionnaireFields.RESOLUTION_TIME,
    label:
      'כמה זמן לקח לפתור בעיות תחזוקה או תיקון? (תוך 24 שעות, 1-3 ימים, 4-7 ימים, יותר משבוע)',
  },
  [ETenantQuestionnaireFields.ISSUES_RESOLVED_TO_SATISFACTION]: {
    fieldName: ETenantQuestionnaireFields.ISSUES_RESOLVED_TO_SATISFACTION,
    label: 'האם בעיות התחזוקה או התיקון נפתרו לשביעות רצונך? (כן/לא)',
  },
  [ETenantQuestionnaireFields.PREFERRED_COMMUNICATION_METHOD]: {
    fieldName: ETenantQuestionnaireFields.PREFERRED_COMMUNICATION_METHOD,
    label:
      'מה הייתה שיטת התקשורת המועדפת עליך עם הבעלים/המשכיר? (טלפון, אימייל, הודעה, אישית)',
  },
  [ETenantQuestionnaireFields.COMMUNICATION_SKILLS_RATING]: {
    fieldName: ETenantQuestionnaireFields.COMMUNICATION_SKILLS_RATING,
    label: 'כיצד היית מדרג את כישורי התקשורת של הבעלים/המשכיר? (דירוג 1-5)',
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
