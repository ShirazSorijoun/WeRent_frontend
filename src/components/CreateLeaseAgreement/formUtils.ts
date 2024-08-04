import { z } from 'zod';
import {
  IControlledSelectArray,
  IFormField,
  zodOfStringSelect,
} from '@/models/forms';

export enum ELeaseAgreementFields {
  DATE_DAY_OF_MONTH = 'date_dayOfTheMonth',
  DATE_MONTH = 'date_month',
  DATE_YEAR = 'date_year',
  ownerId = 'ownerId',
  OWNER_NAME = 'ownerName',
  OWNER_ID_NUMBER = 'ownerIDNumber',
  OWNER_STREET = 'ownerStreet',
  OWNER_CITY = 'ownerCity',
  TENANT_NAME = 'tenantName',
  TENANT_ID_NUMBER = 'tenantIDNumber',
  TENANT_STREET = 'tenantStreet',
  TENANT_CITY = 'tenantCity',
  APARTMENT_NUMBER_OF_ROOMS = 'apartmentNumberOfRooms',
  APARTMENT_FLOOR_NUMBER = 'apartmentFloorNumber',
  APARTMENT_STREET = 'apartmentStreet',
  APARTMENT_CITY = 'apartmentCity',
  NUM_OF_RENTAL_MONTHS = 'numOfRentalMonths',
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
  MAX_NUM_OF_MONTHS_INCLUDE_OPTION_PERIOD = 'maxNumOfMonthsIncludeOptionPeriod',
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

export const leaseAgreementFormDataObject: Record<
  ELeaseAgreementFields,
  IFormField
> = {
  [ELeaseAgreementFields.DATE_DAY_OF_MONTH]: {
    fieldName: ELeaseAgreementFields.DATE_DAY_OF_MONTH,
    label: 'Day of the Month',
  },
  [ELeaseAgreementFields.DATE_MONTH]: {
    fieldName: ELeaseAgreementFields.DATE_MONTH,
    label: 'Month',
  },
  [ELeaseAgreementFields.DATE_YEAR]: {
    fieldName: ELeaseAgreementFields.DATE_YEAR,
    label: 'Year',
  },
  [ELeaseAgreementFields.ownerId]: {
    fieldName: ELeaseAgreementFields.ownerId,
    label: 'Owner ID',
  },
  [ELeaseAgreementFields.OWNER_NAME]: {
    fieldName: ELeaseAgreementFields.OWNER_NAME,
    label: 'Owner Name',
  },
  [ELeaseAgreementFields.OWNER_ID_NUMBER]: {
    fieldName: ELeaseAgreementFields.OWNER_ID_NUMBER,
    label: 'Owner ID Number',
  },
  [ELeaseAgreementFields.OWNER_STREET]: {
    fieldName: ELeaseAgreementFields.OWNER_STREET,
    label: 'Owner Street',
  },
  [ELeaseAgreementFields.OWNER_CITY]: {
    fieldName: ELeaseAgreementFields.OWNER_CITY,
    label: 'Owner City',
  },
  [ELeaseAgreementFields.TENANT_NAME]: {
    fieldName: ELeaseAgreementFields.TENANT_NAME,
    label: 'Tenant Name',
  },
  [ELeaseAgreementFields.TENANT_ID_NUMBER]: {
    fieldName: ELeaseAgreementFields.TENANT_ID_NUMBER,
    label: 'Tenant ID Number',
  },
  [ELeaseAgreementFields.TENANT_STREET]: {
    fieldName: ELeaseAgreementFields.TENANT_STREET,
    label: 'Tenant Street',
  },
  [ELeaseAgreementFields.TENANT_CITY]: {
    fieldName: ELeaseAgreementFields.TENANT_CITY,
    label: 'Tenant City',
  },
  [ELeaseAgreementFields.APARTMENT_NUMBER_OF_ROOMS]: {
    fieldName: ELeaseAgreementFields.APARTMENT_NUMBER_OF_ROOMS,
    label: 'Number of Rooms',
  },
  [ELeaseAgreementFields.APARTMENT_FLOOR_NUMBER]: {
    fieldName: ELeaseAgreementFields.APARTMENT_FLOOR_NUMBER,
    label: 'Floor Number',
  },
  [ELeaseAgreementFields.APARTMENT_STREET]: {
    fieldName: ELeaseAgreementFields.APARTMENT_STREET,
    label: 'Apartment Street',
  },
  [ELeaseAgreementFields.APARTMENT_CITY]: {
    fieldName: ELeaseAgreementFields.APARTMENT_CITY,
    label: 'Apartment City',
  },
  [ELeaseAgreementFields.NUM_OF_RENTAL_MONTHS]: {
    fieldName: ELeaseAgreementFields.NUM_OF_RENTAL_MONTHS,
    label: 'Number of Rental Months',
  },
  [ELeaseAgreementFields.START_DATE]: {
    fieldName: ELeaseAgreementFields.START_DATE,
    label: 'Start Date',
  },
  [ELeaseAgreementFields.END_DATE]: {
    fieldName: ELeaseAgreementFields.END_DATE,
    label: 'End Date',
  },
  [ELeaseAgreementFields.RENTAL_PRICE_PER_MONTH]: {
    fieldName: ELeaseAgreementFields.RENTAL_PRICE_PER_MONTH,
    label: 'Rental Price per Month',
  },
  [ELeaseAgreementFields.DAY_OF_THE_MONTH_FOR_PAYMENT]: {
    fieldName: ELeaseAgreementFields.DAY_OF_THE_MONTH_FOR_PAYMENT,
    label: 'Day of the Month for Payment',
  },
  [ELeaseAgreementFields.PAYMENT_METHOD]: {
    fieldName: ELeaseAgreementFields.PAYMENT_METHOD,
    label: 'Payment Method',
  },
  [ELeaseAgreementFields.NAME_OF_BANK]: {
    fieldName: ELeaseAgreementFields.NAME_OF_BANK,
    label: 'Name of Bank',
  },
  [ELeaseAgreementFields.BANK_ACCOUNT_NUMBER]: {
    fieldName: ELeaseAgreementFields.BANK_ACCOUNT_NUMBER,
    label: 'Bank Account Number',
  },
  [ELeaseAgreementFields.BANK_BRANCH]: {
    fieldName: ELeaseAgreementFields.BANK_BRANCH,
    label: 'Bank Branch',
  },
  [ELeaseAgreementFields.OPTION_PERIOD]: {
    fieldName: ELeaseAgreementFields.OPTION_PERIOD,
    label: 'Option Period',
  },
  [ELeaseAgreementFields.OPTION_PERIOD_LENGTH]: {
    fieldName: ELeaseAgreementFields.OPTION_PERIOD_LENGTH,
    label: 'Option Period Length',
  },
  [ELeaseAgreementFields.MAX_PERCENTAGE_INCREASE]: {
    fieldName: ELeaseAgreementFields.MAX_PERCENTAGE_INCREASE,
    label: 'Maximum Percentage Increase',
  },
  [ELeaseAgreementFields.MAX_NUM_OF_MONTHS_INCLUDE_OPTION_PERIOD]: {
    fieldName: ELeaseAgreementFields.MAX_NUM_OF_MONTHS_INCLUDE_OPTION_PERIOD,
    label: 'Maximum Number of Months Including Option Period',
  },
  [ELeaseAgreementFields.NUM_OF_DAYS_FOR_REPAIR]: {
    fieldName: ELeaseAgreementFields.NUM_OF_DAYS_FOR_REPAIR,
    label: 'Number of Days for Repair',
  },
  [ELeaseAgreementFields.SUBTENANT]: {
    fieldName: ELeaseAgreementFields.SUBTENANT,
    label: 'Subtenant Allowed',
  },
  [ELeaseAgreementFields.NUM_OF_DAYS_PAYMENT_DELAY]: {
    fieldName: ELeaseAgreementFields.NUM_OF_DAYS_PAYMENT_DELAY,
    label: 'Number of Days Payment Delay',
  },
  [ELeaseAgreementFields.PROMISSORY_NOTE]: {
    fieldName: ELeaseAgreementFields.PROMISSORY_NOTE,
    label: 'Promissory Note',
  },
  [ELeaseAgreementFields.PROMISSORY_NOTE_AMOUNT]: {
    fieldName: ELeaseAgreementFields.PROMISSORY_NOTE_AMOUNT,
    label: 'Promissory Note Amount',
  },
  [ELeaseAgreementFields.LETTER_OF_GUARANTEE]: {
    fieldName: ELeaseAgreementFields.LETTER_OF_GUARANTEE,
    label: 'Letter of Guarantee',
  },
  [ELeaseAgreementFields.GUARANTEE]: {
    fieldName: ELeaseAgreementFields.GUARANTEE,
    label: 'Guarantee',
  },
  [ELeaseAgreementFields.GUARANTEE_AMOUNT]: {
    fieldName: ELeaseAgreementFields.GUARANTEE_AMOUNT,
    label: 'Guarantee Amount',
  },
  [ELeaseAgreementFields.ANIMAL]: {
    fieldName: ELeaseAgreementFields.ANIMAL,
    label: 'Animal Allowed',
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
  [ELeaseAgreementFields.DATE_DAY_OF_MONTH]: z.number().int().min(1).max(31),
  [ELeaseAgreementFields.DATE_MONTH]: z.number().int().min(1).max(12),
  [ELeaseAgreementFields.DATE_YEAR]: z.number().int().min(2024),
  [ELeaseAgreementFields.ownerId]: z.string(),
  [ELeaseAgreementFields.OWNER_NAME]: z.string(),
  [ELeaseAgreementFields.OWNER_ID_NUMBER]: z.string(),
  [ELeaseAgreementFields.OWNER_STREET]: z.string(),
  [ELeaseAgreementFields.OWNER_CITY]: z.string(),
  [ELeaseAgreementFields.TENANT_NAME]: z.string(),
  [ELeaseAgreementFields.TENANT_ID_NUMBER]: z.string(),
  [ELeaseAgreementFields.TENANT_STREET]: z.string(),
  [ELeaseAgreementFields.TENANT_CITY]: z.string(),
  [ELeaseAgreementFields.APARTMENT_NUMBER_OF_ROOMS]: z.number().min(1),
  [ELeaseAgreementFields.APARTMENT_FLOOR_NUMBER]: z.number().int().min(-1),
  [ELeaseAgreementFields.APARTMENT_STREET]: z.string(),
  [ELeaseAgreementFields.APARTMENT_CITY]: z.string(),
  [ELeaseAgreementFields.NUM_OF_RENTAL_MONTHS]: z.number().int(),
  [ELeaseAgreementFields.START_DATE]: z.string(),
  [ELeaseAgreementFields.END_DATE]: z.string(),
  [ELeaseAgreementFields.RENTAL_PRICE_PER_MONTH]: z.number(),
  [ELeaseAgreementFields.DAY_OF_THE_MONTH_FOR_PAYMENT]: z.number().int(),
  [ELeaseAgreementFields.PAYMENT_METHOD]: zodOfStringSelect(
    paymentMethodFieldValues,
  ),
  [ELeaseAgreementFields.NAME_OF_BANK]: z.string().optional(),
  [ELeaseAgreementFields.BANK_ACCOUNT_NUMBER]: z.string().optional(),
  [ELeaseAgreementFields.BANK_BRANCH]: z.string().optional(),
  [ELeaseAgreementFields.OPTION_PERIOD]: z.boolean(),
  [ELeaseAgreementFields.OPTION_PERIOD_LENGTH]: z.number().int().optional(),
  [ELeaseAgreementFields.MAX_PERCENTAGE_INCREASE]: z.number().int().optional(),
  [ELeaseAgreementFields.MAX_NUM_OF_MONTHS_INCLUDE_OPTION_PERIOD]: z
    .number()
    .int()
    .optional(),
  [ELeaseAgreementFields.NUM_OF_DAYS_FOR_REPAIR]: z.number().int(),
  [ELeaseAgreementFields.SUBTENANT]: z.boolean(),
  [ELeaseAgreementFields.NUM_OF_DAYS_PAYMENT_DELAY]: z.number().int(),
  [ELeaseAgreementFields.PROMISSORY_NOTE]: z.boolean(),
  [ELeaseAgreementFields.PROMISSORY_NOTE_AMOUNT]: z.number().optional(),
  [ELeaseAgreementFields.LETTER_OF_GUARANTEE]: z.boolean(),
  [ELeaseAgreementFields.GUARANTEE]:
    zodOfStringSelect(guaranteeFieldValues).optional(),
  [ELeaseAgreementFields.GUARANTEE_AMOUNT]: z.number().optional(),
  [ELeaseAgreementFields.ANIMAL]: z.boolean(),
});

export const leaseAgreementDefaultValues = {
  [ELeaseAgreementFields.DATE_DAY_OF_MONTH]: new Date().getDate(),
  [ELeaseAgreementFields.DATE_MONTH]: new Date().getMonth() + 1,
  [ELeaseAgreementFields.DATE_YEAR]: new Date().getFullYear(),
  [ELeaseAgreementFields.ownerId]: '',
  [ELeaseAgreementFields.OWNER_NAME]: '',
  [ELeaseAgreementFields.OWNER_ID_NUMBER]: '',
  [ELeaseAgreementFields.OWNER_STREET]: '',
  [ELeaseAgreementFields.OWNER_CITY]: '',
  [ELeaseAgreementFields.TENANT_NAME]: '',
  [ELeaseAgreementFields.TENANT_ID_NUMBER]: '',
  [ELeaseAgreementFields.TENANT_STREET]: '',
  [ELeaseAgreementFields.TENANT_CITY]: '',
  [ELeaseAgreementFields.APARTMENT_NUMBER_OF_ROOMS]: 0,
  [ELeaseAgreementFields.APARTMENT_FLOOR_NUMBER]: 0,
  [ELeaseAgreementFields.APARTMENT_STREET]: '',
  [ELeaseAgreementFields.APARTMENT_CITY]: '',
  [ELeaseAgreementFields.NUM_OF_RENTAL_MONTHS]: 0,
  [ELeaseAgreementFields.START_DATE]: '',
  [ELeaseAgreementFields.END_DATE]: '',
  [ELeaseAgreementFields.RENTAL_PRICE_PER_MONTH]: 0,
  [ELeaseAgreementFields.DAY_OF_THE_MONTH_FOR_PAYMENT]: 0,
  [ELeaseAgreementFields.PAYMENT_METHOD]: '',
  [ELeaseAgreementFields.NAME_OF_BANK]: '',
  [ELeaseAgreementFields.BANK_ACCOUNT_NUMBER]: '',
  [ELeaseAgreementFields.BANK_BRANCH]: '',
  [ELeaseAgreementFields.OPTION_PERIOD]: false,
  [ELeaseAgreementFields.OPTION_PERIOD_LENGTH]: 0,
  [ELeaseAgreementFields.MAX_PERCENTAGE_INCREASE]: 0,
  [ELeaseAgreementFields.MAX_NUM_OF_MONTHS_INCLUDE_OPTION_PERIOD]: 0,
  [ELeaseAgreementFields.NUM_OF_DAYS_FOR_REPAIR]: 0,
  [ELeaseAgreementFields.SUBTENANT]: false,
  [ELeaseAgreementFields.NUM_OF_DAYS_PAYMENT_DELAY]: 0,
  [ELeaseAgreementFields.PROMISSORY_NOTE]: false,
  [ELeaseAgreementFields.PROMISSORY_NOTE_AMOUNT]: 0,
  [ELeaseAgreementFields.LETTER_OF_GUARANTEE]: false,
  [ELeaseAgreementFields.GUARANTEE]: '',
  [ELeaseAgreementFields.GUARANTEE_AMOUNT]: 0,
  [ELeaseAgreementFields.ANIMAL]: false,
};

export type leaseAgreementFormData = z.infer<typeof schema>;
