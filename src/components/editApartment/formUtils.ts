import { z } from 'zod';
import { IControlledSelectArray, IFormField } from '@/models/forms';
import { zodOfStringSelectValues } from '@/models/forms/controlledSelectArray';

export enum EEditApartmentFields {
  CITY = 'city',
  ADDRESS = 'address',
  TYPE = 'type',
  FLOOR = 'floor',
  NUM_OF_FLOORS = 'numOfFloors',
  SIZE_IN_SQ_METER = 'sizeInSqMeter',
  PRICE = 'price',
  ENTRY_DATE = 'entryDate',
  FURNITURE = 'furniture',
  DESCRIPTION = 'description',
}

export const editFormDataObject: Record<EEditApartmentFields, IFormField> = {
  [EEditApartmentFields.CITY]: {
    fieldName: EEditApartmentFields.CITY,
    label: 'city',
  },
  [EEditApartmentFields.ADDRESS]: {
    fieldName: EEditApartmentFields.ADDRESS,
    label: 'address',
  },
  [EEditApartmentFields.TYPE]: {
    fieldName: EEditApartmentFields.TYPE,
    label: 'type',
  },
  [EEditApartmentFields.FLOOR]: {
    fieldName: EEditApartmentFields.FLOOR,
    label: 'floor',
  },
  [EEditApartmentFields.NUM_OF_FLOORS]: {
    fieldName: EEditApartmentFields.NUM_OF_FLOORS,
    label: 'number of floors',
  },
  [EEditApartmentFields.SIZE_IN_SQ_METER]: {
    fieldName: EEditApartmentFields.SIZE_IN_SQ_METER,
    label: 'size in sq meters',
  },
  [EEditApartmentFields.PRICE]: {
    fieldName: EEditApartmentFields.PRICE,
    label: 'price',
  },
  [EEditApartmentFields.ENTRY_DATE]: {
    fieldName: EEditApartmentFields.ENTRY_DATE,
    label: 'entry date',
  },
  [EEditApartmentFields.FURNITURE]: {
    fieldName: EEditApartmentFields.FURNITURE,
    label: 'furniture',
  },
  [EEditApartmentFields.DESCRIPTION]: {
    fieldName: EEditApartmentFields.DESCRIPTION,
    label: 'description',
  },
};

export const typeFieldValues: IControlledSelectArray<string> = [
  { display: 'Apartment', value: 'Apartment' },
  { display: 'Garden apartment', value: 'Garden apartment' },
  { display: 'Private/Cottage', value: 'Private/Cottage' },
  { display: 'Townhouse', value: 'Townhouse' },
  { display: 'Duplex', value: 'Duplex' },
  { display: 'Roof/Penthouse', value: 'Roof/Penthouse' },
  { display: 'Unit', value: 'Unit' },
  { display: 'Vacation apartment', value: 'Vacation apartment' },
  { display: 'Other', value: 'Other' },
];

export const furnitureFieldValues: IControlledSelectArray<string> = [
  { display: 'full', value: 'full' },
  { display: 'partial', value: 'partial' },
  { display: 'none', value: 'none' },
];

export const schema = z.object({
  [EEditApartmentFields.CITY]: z.string().optional(),
  [EEditApartmentFields.ADDRESS]: z.string().optional(),
  [EEditApartmentFields.TYPE]:
    zodOfStringSelectValues(typeFieldValues).optional(),
  [EEditApartmentFields.FLOOR]: z.number().optional(),
  [EEditApartmentFields.NUM_OF_FLOORS]: z.number().optional(),
  [EEditApartmentFields.SIZE_IN_SQ_METER]: z.number().optional(),
  [EEditApartmentFields.PRICE]: z.number().optional(),
  [EEditApartmentFields.ENTRY_DATE]: z.date().optional(),
  [EEditApartmentFields.FURNITURE]:
    zodOfStringSelectValues(furnitureFieldValues).optional(),
  [EEditApartmentFields.DESCRIPTION]: z.string().optional(),
});

export const defaultFormValues = {};
export type EditApartmentFormData = z.infer<typeof schema>;
