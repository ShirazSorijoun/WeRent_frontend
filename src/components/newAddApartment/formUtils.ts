import { z } from 'zod';
import {
  createMultiCheckBoxZod,
  IControlledMultiCheckBoxOptions,
  IControlledSelectArray,
  IFormField,
} from '@/models/forms';
import { zodOfStringSelectValues } from '@/models/forms/controlledSelectArray';

export enum EApartmentFields {
  TYPE = 'type',
  CITY = 'city',
  ADDRESS = 'address',
  FLOOR = 'floor',
  NUM_OF_FLOORS = 'numOfFloors',
  NUM_OF_ROOMS = 'rooms',
  SIZE_IN_SQ_METER = 'sizeInSqMeter',
  PRICE = 'price',
  ENTRY_DATE = 'entryDate',
  FURNITURE = 'furniture',
  FEATURES = 'features',
  DESCRIPTION = 'description',
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
    label: 'תיאור הדירה',
  },
  [EApartmentFields.NUM_OF_ROOMS]: {
    fieldName: EApartmentFields.NUM_OF_ROOMS,
    label: 'מספר חדרים',
  },
  [EApartmentFields.FEATURES]: {
    fieldName: EApartmentFields.FEATURES,
    label: 'הדירה באה עם',
  },
};

export const typeFieldValues: IControlledSelectArray<string> = [
  { display: 'דירה', value: 'Apartment' },
  { display: 'דירת גן', value: 'Garden apartment' },
  { display: 'פרטי/קוטג', value: 'Private/Cottage' },
  { display: 'בית עירוני', value: 'Townhouse' },
  { display: 'דופלקס', value: 'Duplex' },
  { display: 'דירת גן/פנטהאוס', value: 'Roof/Penthouse' },
  { display: 'יחידת דיור', value: 'Unit' },
  { display: 'דירת נופש', value: 'Vacation apartment' },
  { display: 'אחר', value: 'Other' },
];

export const furnitureFieldValues: IControlledSelectArray<string> = [
  { display: 'מלא', value: 'full' },
  { display: 'חלקי', value: 'partial' },
  { display: 'ללא', value: 'none' },
];

export const apartmentFeatures: IControlledMultiCheckBoxOptions = [
  { field: 'parking', display: 'חניה' },
  { field: 'accessForDisabled', display: 'נגישות לבעלי מוגבלות' },
  { field: 'storage', display: 'יחידת אחסון' },
  { field: 'dimension', display: 'Dimension' },
  { field: 'terrace', display: 'מרפסת' },
  { field: 'garden', display: 'גינה' },
  { field: 'elevators', display: 'מעלית' },
  { field: 'airConditioning', display: 'מיזוג' },
];

export const schema = z.object({
  [EApartmentFields.TYPE]: zodOfStringSelectValues(typeFieldValues).optional(),
  [EApartmentFields.CITY]: z.string().optional(),
  [EApartmentFields.ADDRESS]: z.string().optional(),
  [EApartmentFields.FLOOR]: z.number(),
  [EApartmentFields.NUM_OF_FLOORS]: z.number(),
  [EApartmentFields.SIZE_IN_SQ_METER]: z.number(),
  [EApartmentFields.NUM_OF_ROOMS]: z.number(),
  [EApartmentFields.FURNITURE]: zodOfStringSelectValues(furnitureFieldValues),
  [EApartmentFields.ENTRY_DATE]: z.date(),
  [EApartmentFields.PRICE]: z.number(),
  [EApartmentFields.FEATURES]: createMultiCheckBoxZod(apartmentFeatures),
  [EApartmentFields.DESCRIPTION]: z.string().optional(),
});

export const defaultFormValues = {};
export type ApartmentFormData = z.infer<typeof schema>;
