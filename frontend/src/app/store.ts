import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import postsReducer from "../features/postsSlice";
import userReducer from "../features/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
