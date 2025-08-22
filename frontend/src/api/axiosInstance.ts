import axios from "axios";
import { type EnhancedStore } from "@reduxjs/toolkit";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const setupInterceptors = (store: EnhancedStore) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = store.getState().auth.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
};

export default axiosInstance;
