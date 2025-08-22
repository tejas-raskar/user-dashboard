import axios from "axios";
import { type EnhancedStore } from "@reduxjs/toolkit";
import { logout, setToken } from "../features/authSlice";

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

  axiosInstance.interceptors.request.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const refreshResponse = await axios.post(
            "http://localhost:3000/api/auth/refresh",
            {},
            { withCredentials: true },
          );
          const { accessToken } = refreshResponse.data;
          store.dispatch(setToken(accessToken));
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axiosInstance(originalRequest);
        } catch (e) {
          store.dispatch(logout());
          return Promise.reject(e);
        }
      }
      return Promise.reject(error);
    },
  );
};

export default axiosInstance;
