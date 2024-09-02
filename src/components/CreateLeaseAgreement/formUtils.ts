import { z } from 'zod';
import { IControlledSelectArray, IFormField } from '@/models/forms';
import { zodOfStringSelectValues } from '@/models/forms/controlledSelectArray';
import { ILeaseAgreement } from '@/models/leaseAgreement';

export enum ELeaseAgreementFields {
  DATE = 'date',
  START_DATE = 'startDate',
  END_DATE = 'endDate',
  RENTAL_PRICE_PER_MONTH = 'rentalPricePerMonth',
  DAY_OF_THE_MONTH_FOR_PAYMENT = 'dayOfTheMonthForPayment',
  PAYMENT_METHOD = 'paymentMethod',
  NAME_OF_BANK = 'nameOfBank',
  BANK_ACCOUNT_NUMBER = 'bankAccountNumber',
  BANK_BRANCH = 'bankBranch',
  OPTION_PERIOD = 'optionPeriod',
  OPTION_PERIOD_LENGTH = 'optionPeriodLength',
  MAX_PERCENTAGE_INCREASE = 'maxPercentageIncrease',
  NUM_OF_DAYS_FOR_REPAIR = 'numOfDaysForRepair',
  SUBTENANT = 'subtenant',
  NUM_OF_DAYS_PAYMENT_DELAY = 'numOfDaysPaymentDelay',
  PROMISSORY_NOTE = 'promissoryNote',
  PROMISSORY_NOTE_AMOUNT = 'promissoryNoteAmount',
  LETTER_OF_GUARANTEE = 'letterOfGuarantee',
  GUARANTEE = 'guarantee',
  GUARANTEE_AMOUNT = 'guaranteeAmount',
  ANIMAL = 'animal',
}

export const FIRST_STEP_NAME = '1';
export const SECOND_STEP_NAME = '2';
export const THIRD_STEP_NAME = '3';
export const FORTH_STEP_NAME = '4';
export const FIFTH_STEP_NAME = '5';

export const leaseAgreementFormDataObject: Record<
  ELeaseAgreementFields,
  IFormField
> = {
  [ELeaseAgreementFields.DATE]: {
    fieldName: `${FIRST_STEP_NAME}.${ELeaseAgreementFields.DATE}`,
    label: 'שנערך ונחתם בתאריך',
  },
  [ELeaseAgreementFields.START_DATE]: {
    fieldName: `${FIRST_STEP_NAME}.${ELeaseAgreementFields.START_DATE}`,
    label: 'כך שתחל ביום',
  },
  [ELeaseAgreementFields.END_DATE]: {
    fieldName: `${FIRST_STEP_NAME}.${ELeaseAgreementFields.END_DATE}`,
    label: 'ותסתיים ביום',
  },
  [ELeaseAgreementFields.RENTAL_PRICE_PER_MONTH]: {
    fieldName: `${SECOND_STEP_NAME}.${ELeaseAgreementFields.RENTAL_PRICE_PER_MONTH}`,
    label: 'דמי השכירות לחודש',
  },
  [ELeaseAgreementFields.DAY_OF_THE_MONTH_FOR_PAYMENT]: {
    fieldName: `${SECOND_STEP_NAME}.${ELeaseAgreementFields.DAY_OF_THE_MONTH_FOR_PAYMENT}`,
    label: 'מספר יום קבוע בחודש בו משולמים דמי השכירות',
  },
  [ELeaseAgreementFields.PAYMENT_METHOD]: {
    fieldName: `${SECOND_STEP_NAME}.${ELeaseAgreementFields.PAYMENT_METHOD}`,
    label: 'חלופת תשלום',
  },
  [ELeaseAgreementFields.NAME_OF_BANK]: {
    fieldName: `${SECOND_STEP_NAME}.${ELeaseAgreementFields.NAME_OF_BANK}`,
    label: 'שם הבנק',
  },
  [ELeaseAgreementFields.BANK_ACCOUNT_NUMBER]: {
    fieldName: `${SECOND_STEP_NAME}.${ELeaseAgreementFields.BANK_ACCOUNT_NUMBER}`,
    label: 'מספר חשבון הבנק',
  },
  [ELeaseAgreementFields.BANK_BRANCH]: {
    fieldName: `${SECOND_STEP_NAME}.${ELeaseAgreementFields.BANK_BRANCH}`,
    label: 'סניף הבנק',
  },
  [ELeaseAgreementFields.OPTION_PERIOD]: {
    fieldName: `${SECOND_STEP_NAME}.${ELeaseAgreementFields.OPTION_PERIOD}`,
    label: 'תקופת אופציה',
  },
  [ELeaseAgreementFields.OPTION_PERIOD_LENGTH]: {
    fieldName: `${SECOND_STEP_NAME}.${ELeaseAgreementFields.OPTION_PERIOD_LENGTH}`,
    label: 'כמות חודשי הארכה',
  },
  [ELeaseAgreementFields.MAX_PERCENTAGE_INCREASE]: {
    fieldName: `${SECOND_STEP_NAME}.${ELeaseAgreementFields.MAX_PERCENTAGE_INCREASE}`,
    label: 'מקסימום התייקרות באחוזים',
  },
  [ELeaseAgreementFields.NUM_OF_DAYS_FOR_REPAIR]: {
    fieldName: `${THIRD_STEP_NAME}.${ELeaseAgreementFields.NUM_OF_DAYS_FOR_REPAIR}`,
    label: 'מספר ימים לתיקון תקלה/פגם',
  },
  [ELeaseAgreementFields.SUBTENANT]: {
    fieldName: `${THIRD_STEP_NAME}.${ELeaseAgreementFields.SUBTENANT}`,
    label: 'הסכמה לשוכר חלופי',
  },
  [ELeaseAgreementFields.NUM_OF_DAYS_PAYMENT_DELAY]: {
    fieldName: `${THIRD_STEP_NAME}.${ELeaseAgreementFields.NUM_OF_DAYS_PAYMENT_DELAY}`,
    label: 'מספר ימי עיכוב בתשלום דמי השכירות',
  },
  [ELeaseAgreementFields.PROMISSORY_NOTE]: {
    fieldName: `${FORTH_STEP_NAME}.${ELeaseAgreementFields.PROMISSORY_NOTE}`,
    label: 'שטר חוב',
  },
  [ELeaseAgreementFields.PROMISSORY_NOTE_AMOUNT]: {
    fieldName: `${FORTH_STEP_NAME}.${ELeaseAgreementFields.PROMISSORY_NOTE_AMOUNT}`,
    label: 'סך שטר החוב',
  },
  [ELeaseAgreementFields.LETTER_OF_GUARANTEE]: {
    fieldName: `${FORTH_STEP_NAME}.${ELeaseAgreementFields.LETTER_OF_GUARANTEE}`,
    label: 'כתה ערבות',
  },
  [ELeaseAgreementFields.GUARANTEE]: {
    fieldName: `${FORTH_STEP_NAME}.${ELeaseAgreementFields.GUARANTEE}`,
    label: 'סוג ביטחון',
  },
  [ELeaseAgreementFields.GUARANTEE_AMOUNT]: {
    fieldName: `${FORTH_STEP_NAME}.${ELeaseAgreementFields.GUARANTEE_AMOUNT}`,
    label: 'סך הביטחון',
  },
  [ELeaseAgreementFields.ANIMAL]: {
    fieldName: `${FIFTH_STEP_NAME}.${ELeaseAgreementFields.ANIMAL}`,
    label: 'אי הסכמה לבעלי חיים',
  },
};

export const paymentMethodFieldValues: IControlledSelectArray<string> = [
  { display: 'Bank Transfer', value: 'Bank Transfer' },
  { display: 'Checks', value: 'Checks' },
];

export const guaranteeFieldValues: IControlledSelectArray<string> = [
  { display: 'Financial deposit', value: 'Financial deposit' },
  { display: 'Autonomous bank guarantee', value: 'Autonomous bank guarantee' },
];

export const schema = z.object({
  [FIRST_STEP_NAME]: z.object({
    [ELeaseAgreementFields.DATE]: z.date(),
    [ELeaseAgreementFields.START_DATE]: z.date(),
    [ELeaseAgreementFields.END_DATE]: z.date(),
  }),
  [SECOND_STEP_NAME]: z.object({
    [ELeaseAgreementFields.RENTAL_PRICE_PER_MONTH]: z.number(),
    [ELeaseAgreementFields.DAY_OF_THE_MONTH_FOR_PAYMENT]: z.number().int(),
    [ELeaseAgreementFields.PAYMENT_METHOD]: zodOfStringSelectValues(
      paymentMethodFieldValues,
    ),
    [ELeaseAgreementFields.NAME_OF_BANK]: z.string().optional(),
    [ELeaseAgreementFields.BANK_ACCOUNT_NUMBER]: z.string().optional(),
    [ELeaseAgreementFields.BANK_BRANCH]: z.string().optional(),
    [ELeaseAgreementFields.OPTION_PERIOD]: z.boolean(),
    [ELeaseAgreementFields.OPTION_PERIOD_LENGTH]: z.number().int().optional(),
  }),
  [THIRD_STEP_NAME]: z.object({
    [ELeaseAgreementFields.MAX_PERCENTAGE_INCREASE]: z
      .number()
      .int()
      .optional(),
    [ELeaseAgreementFields.NUM_OF_DAYS_FOR_REPAIR]: z.number().int(),
  }),
  [FORTH_STEP_NAME]: z.object({
    [ELeaseAgreementFields.SUBTENANT]: z.boolean(),
    [ELeaseAgreementFields.NUM_OF_DAYS_PAYMENT_DELAY]: z.number().int(),
    [ELeaseAgreementFields.PROMISSORY_NOTE]: z.boolean(),
    [ELeaseAgreementFields.PROMISSORY_NOTE_AMOUNT]: z.number().optional(),
    [ELeaseAgreementFields.LETTER_OF_GUARANTEE]: z.boolean(),
    [ELeaseAgreementFields.GUARANTEE]:
      zodOfStringSelectValues(guaranteeFieldValues).optional(),
    [ELeaseAgreementFields.GUARANTEE_AMOUNT]: z.number().optional(),
  }),
  [FIFTH_STEP_NAME]: z.object({ [ELeaseAgreementFields.ANIMAL]: z.boolean() }),
});

export const leaseAgreementDefaultValues = {
  [FIRST_STEP_NAME]: {
    [ELeaseAgreementFields.DATE]: new Date(),
    [ELeaseAgreementFields.START_DATE]: new Date(),
    [ELeaseAgreementFields.END_DATE]: new Date(),
  },
  [SECOND_STEP_NAME]: {
    [ELeaseAgreementFields.RENTAL_PRICE_PER_MONTH]: 0,
    [ELeaseAgreementFields.DAY_OF_THE_MONTH_FOR_PAYMENT]: 0,
    [ELeaseAgreementFields.PAYMENT_METHOD]: '',
    [ELeaseAgreementFields.NAME_OF_BANK]: '',
    [ELeaseAgreementFields.BANK_ACCOUNT_NUMBER]: '',
    [ELeaseAgreementFields.BANK_BRANCH]: '',
    [ELeaseAgreementFields.OPTION_PERIOD]: false,
    [ELeaseAgreementFields.OPTION_PERIOD_LENGTH]: 0,
  },
  [THIRD_STEP_NAME]: {
    [ELeaseAgreementFields.MAX_PERCENTAGE_INCREASE]: 0,
    [ELeaseAgreementFields.NUM_OF_DAYS_FOR_REPAIR]: 0,
  },
  [FORTH_STEP_NAME]: {
    [ELeaseAgreementFields.SUBTENANT]: false,
    [ELeaseAgreementFields.NUM_OF_DAYS_PAYMENT_DELAY]: 0,
    [ELeaseAgreementFields.PROMISSORY_NOTE]: false,
    [ELeaseAgreementFields.PROMISSORY_NOTE_AMOUNT]: 0,
    [ELeaseAgreementFields.LETTER_OF_GUARANTEE]: false,
    [ELeaseAgreementFields.GUARANTEE]: '',
    [ELeaseAgreementFields.GUARANTEE_AMOUNT]: 0,
  },
  [FIFTH_STEP_NAME]: { [ELeaseAgreementFields.ANIMAL]: false },
};

export const buildLeaseDataForForm = (lease?: ILeaseAgreement) =>
  !lease
    ? leaseAgreementDefaultValues
    : {
        [FIRST_STEP_NAME]: {
          [ELeaseAgreementFields.DATE]: new Date(
            lease[ELeaseAgreementFields.DATE],
          ),
          [ELeaseAgreementFields.START_DATE]: new Date(
            lease[ELeaseAgreementFields.START_DATE],
          ),
          [ELeaseAgreementFields.END_DATE]: new Date(
            lease[ELeaseAgreementFields.END_DATE],
          ),
        },
        [SECOND_STEP_NAME]: {
          [ELeaseAgreementFields.RENTAL_PRICE_PER_MONTH]:
            lease[ELeaseAgreementFields.RENTAL_PRICE_PER_MONTH],
          [ELeaseAgreementFields.DAY_OF_THE_MONTH_FOR_PAYMENT]:
            lease[ELeaseAgreementFields.DAY_OF_THE_MONTH_FOR_PAYMENT],
          [ELeaseAgreementFields.PAYMENT_METHOD]:
            lease[ELeaseAgreementFields.PAYMENT_METHOD],
          [ELeaseAgreementFields.NAME_OF_BANK]:
            lease[ELeaseAgreementFields.NAME_OF_BANK],
          [ELeaseAgreementFields.BANK_ACCOUNT_NUMBER]:
            lease[ELeaseAgreementFields.BANK_ACCOUNT_NUMBER],
          [ELeaseAgreementFields.BANK_BRANCH]:
            lease[ELeaseAgreementFields.BANK_BRANCH],
          [ELeaseAgreementFields.OPTION_PERIOD]:
            lease[ELeaseAgreementFields.OPTION_PERIOD],
          [ELeaseAgreementFields.OPTION_PERIOD_LENGTH]:
            lease[ELeaseAgreementFields.OPTION_PERIOD_LENGTH],
        },
        [THIRD_STEP_NAME]: {
          [ELeaseAgreementFields.MAX_PERCENTAGE_INCREASE]:
            lease[ELeaseAgreementFields.MAX_PERCENTAGE_INCREASE],
          [ELeaseAgreementFields.NUM_OF_DAYS_FOR_REPAIR]:
            lease[ELeaseAgreementFields.NUM_OF_DAYS_FOR_REPAIR],
        },
        [FORTH_STEP_NAME]: {
          [ELeaseAgreementFields.SUBTENANT]:
            lease[ELeaseAgreementFields.SUBTENANT],
          [ELeaseAgreementFields.NUM_OF_DAYS_PAYMENT_DELAY]:
            lease[ELeaseAgreementFields.NUM_OF_DAYS_PAYMENT_DELAY],
          [ELeaseAgreementFields.PROMISSORY_NOTE]:
            lease[ELeaseAgreementFields.PROMISSORY_NOTE],
          [ELeaseAgreementFields.PROMISSORY_NOTE_AMOUNT]:
            lease[ELeaseAgreementFields.PROMISSORY_NOTE_AMOUNT],
          [ELeaseAgreementFields.LETTER_OF_GUARANTEE]:
            lease[ELeaseAgreementFields.LETTER_OF_GUARANTEE],
          [ELeaseAgreementFields.GUARANTEE]:
            lease[ELeaseAgreementFields.GUARANTEE],
          [ELeaseAgreementFields.GUARANTEE_AMOUNT]:
            lease[ELeaseAgreementFields.GUARANTEE_AMOUNT],
        },
        [FIFTH_STEP_NAME]: {
          [ELeaseAgreementFields.ANIMAL]: lease[ELeaseAgreementFields.ANIMAL],
        },
      };

export type leaseAgreementFormData = z.infer<typeof schema>;
