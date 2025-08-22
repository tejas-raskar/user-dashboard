import axiosInstance from "./axiosInstance";

export type loginProps = {
  email: string;
  password: string;
};

export type signupProps = {
  name: string;
  email: string;
  password: string;
};

const login = async (userData: loginProps) => {
  const response = await axiosInstance.post("/auth/signin", userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data.user));
    localStorage.setItem("token", response.data.accessToken);
  }
  return response.data;
};

const register = async (userData: signupProps) => {
  const response = await axiosInstance.post("/auth/register", userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data.user));
    localStorage.setItem("token", response.data.accessToken);
  }
  return response.data;
};

const authService = {
  login,
  register,
};

export default authService;
