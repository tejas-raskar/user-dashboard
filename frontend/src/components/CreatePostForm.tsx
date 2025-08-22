import { useState } from "react";
import { useDispatch } from "react-redux";
import { type AppDispatch } from "../app/store";
import { createPost } from "../features/postsSlice";
import {
  Box,
  TextField,
  Button,
  Typography,
  Input,
  FormControl,
  InputLabel,
  Chip,
  Stack,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";

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

  const handleRemoveFile = () => {
    setFile(null);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Create a New Post
      </Typography>

      <Stack spacing={3}>
        <TextField
          fullWidth
          label="Post Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Enter your post title..."
        />

        <TextField
          fullWidth
          label="Content"
          variant="outlined"
          multiline
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          placeholder="What's on your mind?"
        />

        <FormControl fullWidth>
          <InputLabel shrink>Attachment (Optional)</InputLabel>
          <Box sx={{ mt: 2, display: "flex", alignItems: "center", gap: 2 }}>
            <Button
              variant="outlined"
              component="label"
              startIcon={<AttachFileIcon />}
              sx={{ minWidth: 140 }}
            >
              Choose File
              <Input
                type="file"
                sx={{ display: "none" }}
                onChange={handleFileChange}
              />
            </Button>

            {file && (
              <Chip
                label={`${file.name} (${(file.size / 1024).toFixed(1)} KB)`}
                onDelete={handleRemoveFile}
                color="primary"
                variant="outlined"
              />
            )}
          </Box>
        </FormControl>

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button
            type="submit"
            variant="contained"
            endIcon={<SendIcon />}
            size="large"
            disabled={!title.trim() || !content.trim()}
          >
            Submit Post
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};
