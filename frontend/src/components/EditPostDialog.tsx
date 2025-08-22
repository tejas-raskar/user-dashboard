import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { type AppDispatch } from "../app/store";
import { updatePost } from "../features/postsSlice";
import { type Post } from "../types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  IconButton,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";

type EditPostDialogProps = {
  post: Post | null;
  open: boolean;
  onClose: () => void;
};

export const EditPostDialog = ({
  post,
  open,
  onClose,
}: EditPostDialogProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    // When the dialog opens, pre-fill the form with the post's data
    if (post) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [post]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (post) {
      const postData = { title, content };
      dispatch(updatePost({ postId: post._id, postData }));
      onClose(); // Close the dialog after submitting
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">Edit Post</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Post Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Content"
              multiline
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button type="submit" variant="contained" endIcon={<SaveIcon />}>
            Save Changes
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
