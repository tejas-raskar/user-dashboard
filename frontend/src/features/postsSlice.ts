import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import postsService, { type createPostProps } from "../api/postsService";
import type { AxiosError } from "axios";
import type { post } from "../pages/HomePage";
import { type Post } from "../types";

interface PostsState {
  posts: Post[];
  isLoading: boolean;
  isError: boolean;
  message: string;
}

const initialState: PostsState = {
  posts: [],
  isLoading: false,
  isError: false,
  message: "",
};

export const getPosts = createAsyncThunk(
  "posts/getAll",
  async (_, thunkAPI) => {
    try {
      return await postsService.getPosts();
    } catch (e) {
      const err = e as AxiosError<{ msg: string }>;
      const message = err.response?.data?.msg || err.message || err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const deletePost = createAsyncThunk(
  "posts/delete",
  async (postId: string, thunkAPI) => {
    try {
      await postsService.deletePost(postId);
      return postId;
    } catch (e) {
      const err = e as AxiosError<{ msg: string }>;
      const message = err.response?.data?.msg || err.message || err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const createPost = createAsyncThunk(
  "posts/create",
  async (postData: createPostProps, thunkAPI) => {
    try {
      const response = await postsService.createPost(postData);
      return response.createdPost;
    } catch (e) {
      const err = e as AxiosError<{ msg: string }>;
      const message = err.response?.data?.msg || err.message || err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = state.posts.filter(
          (post: post) => post._id !== action.payload,
        );
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts.unshift(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export default postsSlice.reducer;
