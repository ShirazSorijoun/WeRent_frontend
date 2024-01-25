import axios, {CanceledError} from "axios";

export {CanceledError};

const token = ""; // get token from local storage

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    Authorization: `Bearer ${token}`,
    },
});

export default apiClient;