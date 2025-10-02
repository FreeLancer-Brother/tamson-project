import axios from "axios";
import { getToken } from "../helpers/token";
import { BACKEND_ENDPOINT } from "../config/constants";

const instance = axios.create({
  baseURL: `${BACKEND_ENDPOINT}/api`,
});

instance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${getToken()}`;
    // Do something before request is sent
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  },
  
);



export default instance;
