import apiClient, { CanceledError } from "./api-client"
import { ApartmentProps } from "../types/types";


export { CanceledError }
const getAllApartments = () => {
    const abortController = new AbortController()
    const req = apiClient.get<ApartmentProps[]>('apartment', { signal: abortController.signal })
    return { req, abort: () => abortController.abort() }

}

export default { getAllApartments }