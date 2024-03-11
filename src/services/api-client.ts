import axios, {CanceledError} from "axios";

export {CanceledError};


const apiClient = axios.create({
  baseURL: "https://193.106.55.166",
});

export default apiClient;