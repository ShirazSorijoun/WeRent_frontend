import { IControlledSelectArray } from '@/models';

export interface ISearchObject {
  cities: IControlledSelectArray<string>;
  types: IControlledSelectArray<string>;
  minPrice?: number;
  maxPrice?: number;
  minRooms?: number;
  maxRooms?: number;
}

export const defaultSearchObject: ISearchObject = {
  cities: [],
  types: [],
};
