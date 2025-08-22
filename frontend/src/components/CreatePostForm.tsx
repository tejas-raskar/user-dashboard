import { useState } from "react";
import { useDispatch } from "react-redux";
import { type AppDispatch } from "../app/store";
import { createPost } from "../features/postsSlice";

type CreatePostFormProps = {
  onPostCreated: () => void;
};

export const CreatePostForm = ({ onPostCreated }: CreatePostFormProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const dispatch: AppDispatch = useDispatch();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const postData = { title, content, attachment: file || undefined };
    dispatch(createPost(postData));
    setTitle("");
    setContent("");
    setFile(null);
    onPostCreated();
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        border: "1px solid #ccc",
        padding: "1rem",
        marginBottom: "1rem",
      }}
    >
      <h2>Create a New Post</h2>
      <div>
        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <textarea
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Optional: Add attachment</label>
        <input type="file" onChange={handleFileChange} />
      </div>
      <button type="submit">Submit Post</button>
    </form>
  );
};
