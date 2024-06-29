import { IFormField } from '@/models';
import { z } from 'zod';

export enum ELoginFields {
  EMAIL = 'email',
  PASSWORD = 'password',
}

export const loginFormDataObject: Record<ELoginFields, IFormField> = {
  [ELoginFields.EMAIL]: {
    fieldName: ELoginFields.EMAIL,
    label: 'mail',
    matchError: 'email is illegal',
  },
  [ELoginFields.PASSWORD]: {
    fieldName: ELoginFields.PASSWORD,
    label: 'password',
  },
};

export const schema = z.object({
  [ELoginFields.EMAIL]: z
    .string()
    .email(loginFormDataObject[ELoginFields.EMAIL].matchError),
  [ELoginFields.PASSWORD]: z.string(),
});

export const defaultFormValues = {
  [ELoginFields.EMAIL]: '',
  [ELoginFields.PASSWORD]: '',
};
export type LoginFormData = z.infer<typeof schema>;
