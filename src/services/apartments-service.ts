import apiClient, { CanceledError } from "./api-client"
import { ApartmentProps } from "../types/types";


export { CanceledError }
const getAllApartments = () => {
    const abortController = new AbortController()
    const req = apiClient.get<ApartmentProps[]>('apartment', { signal: abortController.signal })
    return { req, abort: () => abortController.abort() }
}

const postApartment = (apartmentData: ApartmentProps, token: string) => {
  const abortController = new AbortController();
  const req = apiClient.post("/apartment/create",
    { apartment: apartmentData },
    {
      signal: abortController.signal,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  req.then((response) => {
    console.log("Apartment creation successful:", response.data);
  }).catch((error) => {
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
  
export default { getAllApartments, postApartment ,getApartmentById};
