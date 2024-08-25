import { ICoordinates } from './addressCheck';
import {
  IControlledSelectArray,
  IControlledMultiCheckBoxOptions,
  createObjectFromSelectArray,
  createObjectFromMultiCheckBoxOptions,
} from './forms';

export interface IApartmentFeatures {
  parking: boolean;
  accessForDisabled: boolean;
  storage: boolean;
  dimension: boolean;
  terrace: boolean;
  garden: boolean;
  elevators: boolean;
  airConditioning: boolean;
}

export type IApartment = {
  _id?: string;
  city: string;
  address: string;
  type: string;
  owner?: string;
  floor: number;
  numberOfFloors: number;
  rooms: number;
  sizeInSqMeters: number;
  price: number;
  entryDate: Date;
  apartment_image?: string;
  furniture: string;
  features: IApartmentFeatures;
  description?: string;
  coordinate?: ICoordinates;
  leaseId?: string;
};

export const apartmentTypeFieldValues: IControlledSelectArray<string> = [
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

export const apartmentTypeObject = createObjectFromSelectArray(
  apartmentTypeFieldValues,
);

export const apartmentFurnitureFieldValues: IControlledSelectArray<string> = [
  { display: 'מלא', value: 'full' },
  { display: 'חלקי', value: 'partial' },
  { display: 'ללא', value: 'none' },
];

export const apartmentFurnitureObject = createObjectFromSelectArray(
  apartmentFurnitureFieldValues,
);
export const apartmentFeatures: IControlledMultiCheckBoxOptions = [
  { field: 'parking', display: 'חניה' },
  { field: 'accessForDisabled', display: 'נגישות לבעלי מוגבלות' },
  { field: 'storage', display: 'יחידת אחסון' },
  { field: 'dimension', display: 'ממ"ד' },
  { field: 'terrace', display: 'מרפסת' },
  { field: 'garden', display: 'גינה' },
  { field: 'elevators', display: 'מעלית' },
  { field: 'airConditioning', display: 'מיזוג' },
];

export const apartmentFeaturesObject =
  createObjectFromMultiCheckBoxOptions(apartmentFeatures);

export const defaultApartment: IApartment = {
  _id: '',
  city: '',
  address: '',
  type: '',
  owner: '',
  floor: 0,
  numberOfFloors: 0,
  rooms: 0,
  sizeInSqMeters: 0,
  price: 0,
  entryDate: new Date(),
  apartment_image: '',
  furniture: '',
  features: {
    parking: false,
    accessForDisabled: false,
    storage: false,
    dimension: false,
    terrace: false,
    garden: false,
    elevators: false,
    airConditioning: false,
  },
  description: '',
};
