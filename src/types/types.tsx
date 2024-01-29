export type ApartmentProps = {
      city: string;
      address: string;
      type: string;
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
        storageRoom: boolean;
        dimension: boolean;
        terrace: boolean;
        garden: boolean;
        elevators: boolean;
        airConditioning: boolean;
      };
      description?: string;
    };