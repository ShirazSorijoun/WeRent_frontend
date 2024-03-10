import axios, {CanceledError} from "axios";

export {CanceledError};


const apiClient = axios.create({
  baseURL: "https://10.10.248.166:443",
});

export default apiClient;