import { createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import authService, {
  type loginProps,
  type signupProps,
} from "../api/authService";
import { createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

const userJSON = localStorage.getItem("user");
const user = userJSON ? JSON.parse(userJSON) : null;
const token = localStorage.getItem("token");

const initialState = {
  user: user ? user : null,
  token: token ? token : null,
  isAuthenticated: !!user,
  isLoading: false,
  isError: false,
  message: "",
};

export const login = createAsyncThunk(
  "auth/login",
  async (userData: loginProps, thunkAPI) => {
    try {
      return await authService.login(userData);
    } catch (e) {
      const err = e as AxiosError<{ msg: string }>;
      const message = err.response?.data?.msg || err.message || err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const register = createAsyncThunk(
  "auth/register",
  async (userData: signupProps, thunkAPI) => {
    try {
      return await authService.register(userData);
    } catch (e) {
      const err = e as AxiosError<{ msg: string }>;
      const message = err.response?.data?.msg || err.message || err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isError = false;
      state.message = "";
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isAnyOf(login.pending, register.pending), (state) => {
        state.isLoading = true;
      })
      .addMatcher(
        isAnyOf(login.fulfilled, register.fulfilled),
        (state, action) => {
          state.isLoading = false;
          state.isAuthenticated = true;
          state.user = action.payload.user;
          state.token = action.payload.accessToken;
        },
      )
      .addMatcher(
        isAnyOf(login.rejected, register.rejected),
        (state, action) => {
          state.isLoading = false;
          state.isAuthenticated = false;
          state.isError = true;
          state.message = action.payload as string;
          state.user = null;
          state.token = null;
        },
      );
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
