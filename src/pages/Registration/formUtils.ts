import { z } from 'zod';
import { IFormField } from '@/models/forms';

export enum ERegisterFields {
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
  PERSONAL_ID = 'personalId',
  EMAIL = 'email',
  CITY = 'cityAddress',
  ADDRESS = 'streetAddress',
  PHONE = 'phoneNumber',
  IMAGE = 'profile_image',
  PASS = 'password',
}

export const registerDataObject: Record<ERegisterFields, IFormField> = {
  [ERegisterFields.CITY]: {
    fieldName: ERegisterFields.CITY,
    label: 'עיר',
  },
  [ERegisterFields.ADDRESS]: {
    fieldName: ERegisterFields.ADDRESS,
    label: 'כתובת',
  },
  [ERegisterFields.FIRST_NAME]: {
    fieldName: ERegisterFields.FIRST_NAME,
    label: 'שם פרטי',
  },
  [ERegisterFields.LAST_NAME]: {
    fieldName: ERegisterFields.LAST_NAME,
    label: 'שם משפחה',
  },
  [ERegisterFields.PHONE]: {
    fieldName: ERegisterFields.PHONE,
    label: 'טלפון',
  },
  [ERegisterFields.IMAGE]: {
    fieldName: ERegisterFields.IMAGE,
    label: 'תמונה',
  },
  [ERegisterFields.PERSONAL_ID]: {
    fieldName: ERegisterFields.PERSONAL_ID,
    label: 'מספר זהות',
  },
  [ERegisterFields.EMAIL]: {
    fieldName: ERegisterFields.EMAIL,
    label: 'מייל',
  },
  [ERegisterFields.PASS]: {
    fieldName: ERegisterFields.PASS,
    label: 'סיסמה',
  },
};

export const schema = z.object({
  [ERegisterFields.EMAIL]: z
    .string()
    .email({ message: 'המייל לא בפורמט התקין' }),
  [ERegisterFields.PASS]: z
    .string()
    .min(6, { message: 'סיסמה חייבת להיות לפחות באורך של 6 תווים' }),
  [ERegisterFields.PERSONAL_ID]: z.instanceof(File).or(z.string()).optional(),
  [ERegisterFields.FIRST_NAME]: z
    .string()
    .min(2, { message: 'שם פרטי חייב להיות לפחות באורך 2' }),
  [ERegisterFields.LAST_NAME]: z
    .string()
    .min(2, { message: 'שם משפחה חייב להיות לפחות באורך 2' }),
  [ERegisterFields.CITY]: z.string().min(1, { message: 'חובה למלא שם עיר' }),
  [ERegisterFields.ADDRESS]: z
    .string()
    .min(1, { message: 'חובה למלא שם רחוב ומספר' }),
  [ERegisterFields.PHONE]: z.string(),
  [ERegisterFields.IMAGE]: z.instanceof(File).or(z.string()).optional(),
});

export type IRegisterFormData = z.infer<typeof schema>;
export const defaultRegisterFormData: IRegisterFormData = {
  [ERegisterFields.FIRST_NAME]: '',
  [ERegisterFields.LAST_NAME]: '',
  [ERegisterFields.EMAIL]: '',
  [ERegisterFields.CITY]: '',
  [ERegisterFields.ADDRESS]: '',
  [ERegisterFields.PHONE]: '',
  [ERegisterFields.PASS]: '',
};
