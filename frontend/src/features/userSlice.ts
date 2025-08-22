import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService, {
  type updateUserData,
  type changePasswordData,
} from "../api/userService";
import { type AxiosError } from "axios";

interface UserState {
  profile: {
    name: string;
    email: string;
  } | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}

const initialState: UserState = {
  profile: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

// Get user profile
export const getMe = createAsyncThunk("user/getMe", async (_, thunkAPI) => {
  try {
    return await userService.getMe();
  } catch (e) {
    const err = e as AxiosError<{ msg: string }>;
    const message = err.response?.data?.msg || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Update user profile
export const updateMe = createAsyncThunk(
  "user/updateMe",
  async (userData: updateUserData, thunkAPI) => {
    try {
      return await userService.updateMe(userData);
    } catch (e) {
      const err = e as AxiosError<{ msg: string }>;
      const message = err.response?.data?.msg || err.message || err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// Change password
export const changePassword = createAsyncThunk(
  "user/changePassword",
  async (passwordData: changePasswordData, thunkAPI) => {
    try {
      return await userService.changePassword(passwordData);
    } catch (e) {
      const err = e as AxiosError<{ msg: string }>;
      const message = err.response?.data?.msg || err.message || err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(updateMe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateMe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.profile = action.payload.updatedUser;
        state.message = action.payload.msg;
      })
      .addCase(updateMe.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.msg;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
