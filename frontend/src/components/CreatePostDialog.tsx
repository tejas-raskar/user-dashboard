import { useState } from "react";
import { useDispatch } from "react-redux";
import { type AppDispatch } from "../app/store";
import { createPost } from "../features/postsSlice";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  TextField,
  Button,
  Typography,
  Input,
  FormControl,
  InputLabel,
  Chip,
  Stack,
  IconButton,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";

type CreatePostDialogProps = {
  open: boolean;
  onClose: () => void;
};

export const CreatePostDialog = ({ open, onClose }: CreatePostDialogProps) => {
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

    // Reset form and close dialog
    setTitle("");
    setContent("");
    setFile(null);
    onClose();
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  const handleClose = () => {
    // Reset form when closing
    setTitle("");
    setContent("");
    setFile(null);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 }
      }}
    >
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h5" component="h2">
          Create a New Post
        </Typography>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{ color: "grey.500" }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent dividers>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Post Title"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Enter your post title..."
              autoFocus
            />

            <TextField
              fullWidth
              label="Content"
              variant="outlined"
              multiline
              rows={6}
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
          </Stack>
        </DialogContent>

        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            endIcon={<SendIcon />}
            disabled={!title.trim() || !content.trim()}
          >
            Create Post
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};
