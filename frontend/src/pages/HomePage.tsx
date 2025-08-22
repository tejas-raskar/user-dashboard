import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../app/store";
import { useEffect, useState } from "react";
import { deletePost, getPosts } from "../features/postsSlice";
import { Link } from "react-router-dom";
import { CreatePostForm } from "../components/CreatePostForm";
import type { Post } from "../types";

export const HomePage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { posts, isError, isLoading, message } = useSelector(
    (state: RootState) => state.posts,
  );
  const { user } = useSelector((state: RootState) => state.auth);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const handleDelete = (postId: string) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      dispatch(deletePost(postId));
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>{message}</div>;
  }

  return (
    <>
      <div>All posts</div>
      <button onClick={() => setShowCreateForm(!showCreateForm)}>
        {showCreateForm ? "Cancel" : "Create Post"}
      </button>
      {showCreateForm && (
        <CreatePostForm onPostCreated={() => setShowCreateForm(false)} />
      )}
      {posts.length > 0 ? (
        <div>
          {posts.map((post: Post) => (
            <div>
              <Link to={`/posts/${post._id}`}>
                <h2>{post.title}</h2>
              </Link>
              <p>by {post.author.name}</p>
              {user?._id === post.author._id && (
                <button onClick={() => handleDelete(post._id)}>Delete</button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No posts found. Why not create one?</p>
      )}
    </>
  );
};
