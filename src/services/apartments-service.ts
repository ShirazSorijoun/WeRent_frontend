import apiClient, { CanceledError } from "./api-client";
import { ApartmentProps } from "../types/types";
export interface UpdatedApartment {
  city: string;
  address: string;
  type: string;
  floor: number;
  numberOfFloors: number;
  rooms: number;
  sizeInSqMeters: number;
  price: number;
  entryDate: string;
  furniture: boolean;
  features: {
    parking: boolean;
    accessForDisabled: boolean;
    storage: boolean;
    dimension: boolean;
    terrace: boolean;
    garden: boolean;
    elevators: boolean;
    airConditioning: boolean;
  };
  description: string;
  phone: string;
}

export { CanceledError };
const getAllApartments = () => {
  const abortController = new AbortController();
  const req = apiClient.get<ApartmentProps[]>("apartment", {
    signal: abortController.signal,
  });
  return { req, abort: () => abortController.abort() };
};

const postApartment = (apartmentData: ApartmentProps, token: string) => {
  const abortController = new AbortController();
  const req = apiClient.post(
    "/apartment/create",
    { apartment: apartmentData },
    {
      signal: abortController.signal,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  req
    .then((response) => {
      console.log("Apartment creation successful:", response.data);
    })
    .catch((error) => {
      console.error("Error creating apartment:", error);
    });

  return { req, abort: () => abortController.abort() };
};

const getApartmentById = (id: string) => {
  const abortController = new AbortController();
  const req = apiClient.get<ApartmentProps>(`apartment/${id}`, {
    signal: abortController.signal,
  });
  return { req, abort: () => abortController.abort() };
};

const updateApartment = async (
  id: string,
  updatedApartment: ApartmentProps,
  token: string
) => {
  console.log(updatedApartment);
  try {
    const response = await apiClient.patch(
      `/apartment/update`,
      {
        id,
        updatedApartment,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Failed to update apartment:", response.statusText);
      throw new Error("Failed to update apartment");
    }
  } catch (error) {
    console.error("Error updating apartment");
    throw error;
  }
};

const deleteApartment = async (apartmentId: string, token: string) => {
  try {
    const response = await apiClient.delete(
      `/apartment/delete/${apartmentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Failed to delete apartment:", response.statusText);
      throw new Error("Failed to delete apartment");
    }
  } catch (error) {
    console.error("Error deleting apartment:", error);
    throw error;
  }
};

export default {
  getAllApartments,
  postApartment,
  getApartmentById,
  updateApartment,
  deleteApartment,
};
