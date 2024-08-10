import { IFormField } from '@/models';
import { z } from 'zod';

export enum EPostGoogleRegisterFields {
  CITY = 'city',
  ADDRESS = 'address',
  ID = 'id',
  PHONE = 'phone',
}

export const editFormDataObject: Record<EPostGoogleRegisterFields, IFormField> =
  {
    [EPostGoogleRegisterFields.CITY]: {
      fieldName: EPostGoogleRegisterFields.CITY,
      label: 'עיר',
    },
    [EPostGoogleRegisterFields.ADDRESS]: {
      fieldName: EPostGoogleRegisterFields.ADDRESS,
      label: 'כתובת',
    },
    [EPostGoogleRegisterFields.ID]: {
      fieldName: EPostGoogleRegisterFields.ID,
      label: 'תעודת זהות',
    },
    [EPostGoogleRegisterFields.PHONE]: {
      fieldName: EPostGoogleRegisterFields.PHONE,
      label: 'טלפון',
    },
  };

export const schema = z.object({
  [EPostGoogleRegisterFields.CITY]: z.string().trim(),
  [EPostGoogleRegisterFields.ADDRESS]: z.string().trim(),
  [EPostGoogleRegisterFields.PHONE]: z.string().trim(),
  [EPostGoogleRegisterFields.ID]: z.string().trim(),
});

export type PostGoogleRegisterFormData = z.infer<typeof schema>;
