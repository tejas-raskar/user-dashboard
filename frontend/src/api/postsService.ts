import axiosInstance from "./axiosInstance";

export type createPostProps = {
  title: string;
  content: string;
  attachment?: File;
};

export type UpdatePostData = {
  title: string;
  content: string;
};

const getPosts = async () => {
  const response = await axiosInstance.get("/posts");
  return response.data.posts;
};

const deletePost = async (postId: string) => {
  const response = await axiosInstance.delete(`/posts/${postId}`);
  return response.data;
};

const createPost = async (postData: createPostProps) => {
  const formData = new FormData();
  formData.append("title", postData.title);
  formData.append("content", postData.content);
  if (postData.attachment) {
    formData.append("attachment", postData.attachment);
  }
  const response = await axiosInstance.post("/posts", formData);
  return response.data;
};

const getPostById = async (postId: string) => {
  const response = await axiosInstance.get(`/posts/${postId}`);
  return response.data.post;
};

const updatePost = async (postId: string, postData: UpdatePostData) => {
  const response = await axiosInstance.put(`/posts/${postId}`, postData);
  return response.data;
};

const getMyPosts = async () => {
  const response = await axiosInstance.get("/posts/myposts");
  return response.data.posts;
};

const postsService = {
  getPosts,
  deletePost,
  createPost,
  getPostById,
  updatePost,
  getMyPosts,
};

export default postsService;
