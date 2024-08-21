import { z } from 'zod';
import { IFormField } from '@/models/forms';

export enum EEditUserFields {
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
  CITY = 'cityAddress',
  ADDRESS = 'streetAddress',
  PHONE = 'phoneNumber',
  IMAGE = 'profile_image',
}

export const editUserDataObject: Record<EEditUserFields, IFormField> = {
  [EEditUserFields.CITY]: {
    fieldName: EEditUserFields.CITY,
    label: 'עיר',
  },
  [EEditUserFields.ADDRESS]: {
    fieldName: EEditUserFields.ADDRESS,
    label: 'כתובת',
  },
  [EEditUserFields.FIRST_NAME]: {
    fieldName: EEditUserFields.FIRST_NAME,
    label: 'שם פרטי',
  },
  [EEditUserFields.LAST_NAME]: {
    fieldName: EEditUserFields.LAST_NAME,
    label: 'שם משפחה',
  },
  [EEditUserFields.PHONE]: {
    fieldName: EEditUserFields.PHONE,
    label: 'טלפון',
  },
  [EEditUserFields.IMAGE]: {
    fieldName: EEditUserFields.IMAGE,
    label: 'תמונה',
  },
};

export const schema = z.object({
  [EEditUserFields.FIRST_NAME]: z
    .string()
    .min(2, { message: 'שם פרטי חייב להיות לפחות באורך 2' }),
  [EEditUserFields.LAST_NAME]: z
    .string()
    .min(2, { message: 'שם משפחה חייב להיות לפחות באורך 2' }),
  [EEditUserFields.CITY]: z.string().min(1, { message: 'חובה למלא שם עיר' }),
  [EEditUserFields.ADDRESS]: z
    .string()
    .min(1, { message: 'חובה למלא שם רחוב ומספר' }),
  [EEditUserFields.PHONE]: z.string(),
  [EEditUserFields.IMAGE]: z.instanceof(File).or(z.string()).optional(),
});

export type EditUserFormData = z.infer<typeof schema>;
