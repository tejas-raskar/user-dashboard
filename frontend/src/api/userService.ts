import axiosInstance from "./axiosInstance";

export type updateUserData = {
  name?: string;
  email?: string;
};

export type changePasswordData = {
  currentPassword?: string;
  newPassword?: string;
  confirmNewPassword?: string;
};

const getMe = async () => {
  const response = await axiosInstance.get("/users/me");
  return response.data;
};

const updateMe = async (userData: updateUserData) => {
  const response = await axiosInstance.put("/users/me", userData);
  return response.data;
};

const changePassword = async (passwordData: changePasswordData) => {
  const response = await axiosInstance.put(
    "/users/change-password",
    passwordData,
  );
  return response.data;
};

const userService = {
  getMe,
  updateMe,
  changePassword,
};

export default userService;
