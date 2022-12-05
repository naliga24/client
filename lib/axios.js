import axios from "axios";
import service from "./endpoints";

const headers = {
  baseURL: service.gateway,
  headers: {
    "Content-Type": "application/json",
  },
};
const axiosInstance = axios.create({ baseURL: service.gateway, headers });

axiosInstance.interceptors.request.use(
  (response) => {
    return response;
  },
  (error) => {
    // eslint-disable-next-line no-undef
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // eslint-disable-next-line no-undef
    return Promise.reject(error);
  }
);

export default axiosInstance;
