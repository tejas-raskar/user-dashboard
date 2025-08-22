import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../app/store";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getPostById } from "../features/postsSlice";

export const PostPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { postId } = useParams<{ postId: string }>();
  const { currentPost, isLoading, isError, message } = useSelector(
    (state: RootState) => state.posts,
  );

  useEffect(() => {
    if (postId) {
      dispatch(getPostById(postId));
    }
  }, [postId, dispatch]);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div style={{ color: "red" }}>Error: {message}</div>;
  }

  if (!currentPost) {
    return <div>Post not found.</div>;
  }

  return (
    <div>
      <h1>{currentPost.title}</h1>
      <p>by {currentPost.author.name}</p>
      {currentPost.attachment && (
        <div>
          <p>Attachment: {currentPost.attachment.fileName}</p>
        </div>
      )}
      <div style={{ marginTop: "1rem" }}>
        <p>{currentPost.content}</p>
      </div>
    </div>
  );
};
