import axios, { AxiosResponse } from "axios";
import { API_URL } from "../config";
import { clearAuth } from "../redux/slices/AuthSlice";
import { store } from "../redux/store";
const axiosClient = axios.create({
  baseURL: API_URL,
});

axiosClient.interceptors.request.use((config) => {
  if (config.url?.indexOf("dang-nhap") !== -1) {
    return config;
  }

  if (!config?.headers) {
    throw new Error(
      `Expected 'config' and 'config.headers' not to be undefined`
    );
  }

  const { token } = store.getState().Auth;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      store.dispatch(clearAuth());
      window.location.href = "/login";
    }
    return Promise.reject(error.response.data);
  }
);

export default axiosClient;
