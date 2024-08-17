import { z } from 'zod';
import { createMultiCheckBoxZod, IFormField } from '@/models/forms';
import { zodOfStringSelectValues } from '@/models/forms/controlledSelectArray';
import {
  apartmentTypeFieldValues,
  apartmentFurnitureFieldValues,
  apartmentFeatures,
} from '@/models/apartment.model';

export enum EApartmentFields {
  TYPE = 'type',
  CITY = 'city',
  ADDRESS = 'address',
  FLOOR = 'floor',
  NUM_OF_FLOORS = 'numberOfFloors',
  NUM_OF_ROOMS = 'rooms',
  SIZE_IN_SQ_METER = 'sizeInSqMeters',
  PRICE = 'price',
  ENTRY_DATE = 'entryDate',
  FURNITURE = 'furniture',
  FEATURES = 'features',
  DESCRIPTION = 'description',
  IMAGE = 'imageFile',
}

export const apartmentFormDataObject: Record<EApartmentFields, IFormField> = {
  [EApartmentFields.CITY]: {
    fieldName: EApartmentFields.CITY,
    label: 'עיר',
  },
  [EApartmentFields.ADDRESS]: {
    fieldName: EApartmentFields.ADDRESS,
    label: 'כתובת',
  },
  [EApartmentFields.TYPE]: {
    fieldName: EApartmentFields.TYPE,
    label: 'סוג נכס',
  },
  [EApartmentFields.FLOOR]: {
    fieldName: EApartmentFields.FLOOR,
    label: 'קומות בדירה',
  },
  [EApartmentFields.NUM_OF_FLOORS]: {
    fieldName: EApartmentFields.NUM_OF_FLOORS,
    label: 'מספר קומות בבניין',
  },
  [EApartmentFields.SIZE_IN_SQ_METER]: {
    fieldName: EApartmentFields.SIZE_IN_SQ_METER,
    label: 'גודל במ"ר',
  },
  [EApartmentFields.PRICE]: {
    fieldName: EApartmentFields.PRICE,
    label: 'מחיר שכירות',
  },
  [EApartmentFields.ENTRY_DATE]: {
    fieldName: EApartmentFields.ENTRY_DATE,
    label: 'תאריך כניסה',
  },
  [EApartmentFields.FURNITURE]: {
    fieldName: EApartmentFields.FURNITURE,
    label: 'ריהוט',
  },
  [EApartmentFields.DESCRIPTION]: {
    fieldName: EApartmentFields.DESCRIPTION,
    label: 'תיאור הדירה (אופציונאלי)',
  },
  [EApartmentFields.NUM_OF_ROOMS]: {
    fieldName: EApartmentFields.NUM_OF_ROOMS,
    label: 'מספר חדרים',
  },
  [EApartmentFields.FEATURES]: {
    fieldName: EApartmentFields.FEATURES,
    label: ':הדירה באה עם',
  },
  [EApartmentFields.IMAGE]: {
    fieldName: EApartmentFields.IMAGE,
    label: 'תמונה של הדירה (אופציונאלי)',
  },
};

export const schema = z.object({
  [EApartmentFields.TYPE]: zodOfStringSelectValues(apartmentTypeFieldValues),
  [EApartmentFields.CITY]: z.string(),
  [EApartmentFields.ADDRESS]: z.string(),
  [EApartmentFields.FLOOR]: z.number(),
  [EApartmentFields.NUM_OF_FLOORS]: z.number(),
  [EApartmentFields.SIZE_IN_SQ_METER]: z.number(),
  [EApartmentFields.NUM_OF_ROOMS]: z.number(),
  [EApartmentFields.FURNITURE]: zodOfStringSelectValues(
    apartmentFurnitureFieldValues,
  ),
  [EApartmentFields.ENTRY_DATE]: z.date(),
  [EApartmentFields.PRICE]: z.number(),
  [EApartmentFields.FEATURES]: createMultiCheckBoxZod(apartmentFeatures),
  [EApartmentFields.DESCRIPTION]: z.string().optional(),
  [EApartmentFields.IMAGE]: z.instanceof(File).or(z.string()).optional(),
});

export const defaultFormValues = {
  floor: 0,
  numberOfFloors: 0,
  rooms: 0,
  sizeInSqMeters: 0,
  price: 0,
  entryDate: new Date(),
};
export type ApartmentFormData = z.infer<typeof schema>;
