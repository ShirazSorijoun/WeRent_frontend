export type ApartmentType =
  | "Apartment"
  | "Garden apartment"
  | "Private cottage"
  | "Townhouse"
  | "Duplex"
  | "Penthouse"
  | "Unit"
  | "Vacation apartment"
  | "Other";

export type ApartmentProps = {
      city: string;
      address: string;
      type: ApartmentType;
      floor: number;
      rooms: number;
      sizeInSqMeters: number;
      price: number;
      entryDate: Date;
      apartment_image?: string;
      furniture?: string;
      features: {
        parking: boolean;
        accessForDisabled: boolean;
        storageRoom: boolean;
        dimension: boolean;
        terrace: boolean;
        garden: boolean;
        elevators: boolean;
        airConditioning: boolean;
      };
      description?: string;
    };