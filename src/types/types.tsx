export type ApartmentProps = {
  _id?: string;
  city: string;
  address: string;
  type: string;
  owner: string;
  floor: number;
  numberOfFloors: number;
  rooms: number;
  sizeInSqMeters: number;
  price: number;
  entryDate: Date;
  apartment_image?: string;
  furniture?: string;
  features: {
    parking: boolean;
    accessForDisabled: boolean;
    storage: boolean;
    dimension: boolean;
    terrace: boolean;
    garden: boolean;
    elevators: boolean;
    airConditioning: boolean;
    [key: string]: boolean;
  };
  description?: string;
  phone?: string;
};

export type ReviewProps = {
  _id?: string;
  ownerName: string;
  ownerImage: string;
  date: string;
  description: string;
};
