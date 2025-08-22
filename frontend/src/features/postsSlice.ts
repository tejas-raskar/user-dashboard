import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import postsService, {
  type createPostProps,
  type UpdatePostData,
} from "../api/postsService";
import type { AxiosError } from "axios";
import { type Post } from "../types";

interface PostsState {
  posts: Post[];
  myPosts: Post[];
  currentPost: Post | null;
  isLoading: boolean;
  isError: boolean;
  message: string;
}

const initialState: PostsState = {
  posts: [],
  myPosts: [],
  currentPost: null,
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

export const getMyPosts = createAsyncThunk(
  "posts/getMyPosts",
  async (_, thunkAPI) => {
    try {
      return await postsService.getMyPosts();
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

export const getPostById = createAsyncThunk(
  "posts/getById",
  async (postId: string, thunkAPI) => {
    try {
      return await postsService.getPostById(postId);
    } catch (e) {
      const err = e as AxiosError<{ msg: string }>;
      const message = err.response?.data?.msg || err.message || err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const updatePost = createAsyncThunk(
  "posts/update",
  async (
    { postId, postData }: { postId: string; postData: UpdatePostData },
    thunkAPI,
  ) => {
    try {
      const response = await postsService.updatePost(postId, postData);
      return response.updatedPost;
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
      .addCase(getMyPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMyPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.myPosts = action.payload;
      })
      .addCase(getMyPosts.rejected, (state, action) => {
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
          (post: Post) => post._id !== action.payload,
        );
        state.myPosts = state.myPosts.filter(
          (post: Post) => post._id !== action.payload,
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
        state.myPosts.unshift(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(getPostById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPostById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentPost = action.payload;
      })
      .addCase(getPostById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(updatePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentPost = action.payload;
        const index = state.posts.findIndex(
          (post) => post._id === action.payload._id,
        );
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export default postsSlice.reducer;
