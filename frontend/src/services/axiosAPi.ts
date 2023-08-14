import endpoint from "./endpoint";
import axios, { AxiosError } from "axios";

const options = {
  baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
};
const instance = axios.create({ ...options });

const api = {
  auth: {
    register: (form: object): Promise<string> => {
      return instance.post(endpoint.auth.register, form);
    },
    login: (form: object): Promise<object> => {
      return instance.post(endpoint.auth.login, form);
    },
    logout: () => {
      return instance.post(endpoint.auth.logout);
    },
    forgot: () => {
      return instance.put(endpoint.auth.forgot);
    },
  },
};

instance.interceptors.request.use(
  (request) => {
    // Define request inteceptor here
    return request;
  },
  async (error: AxiosError) => {
    throw error;
  }
);

instance.interceptors.response.use(
  async (response) => {
    // Define response interceptor here
    return response.data;
  },
  async (error: AxiosError) => {
    throw error;
  }
);

export default api;
