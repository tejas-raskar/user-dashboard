import axios from "axios";
import { type EnhancedStore } from "@reduxjs/toolkit";
import tokenService from "./tokenService";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const setupInterceptors = (store: EnhancedStore) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = tokenService.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (
        error.response?.status !== 401 ||
        originalRequest.url === "/auth/refresh"
      ) {
        return Promise.reject(error);
      }

      try {
        if (!originalRequest._retry) {
          originalRequest._retry = true;

          const newToken = await tokenService.refreshToken();

          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          store.dispatch({
            type: "auth/tokenRefreshed",
            payload: { token: newToken },
          });

          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        store.dispatch({ type: "auth/logout" });
        return Promise.reject(refreshError);
      }
    },
  );
};

export default axiosInstance;
