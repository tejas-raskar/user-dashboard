import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { type AppDispatch } from "../app/store";
import { updateMe } from "../features/userSlice";
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

type EditProfileDialogProps = {
  profile: { name: string; email: string } | null;
  open: boolean;
  onClose: () => void;
};

export const EditProfileDialog = ({
  profile,
  open,
  onClose,
}: EditProfileDialogProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    // Pre-fill the form when the dialog opens with the current profile data
    if (profile) {
      setFormData({
        name: profile.name,
        email: profile.email,
      });
    }
  }, [profile, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (profile) {
      dispatch(updateMe(formData));
      onClose(); // Close the dialog after submitting
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">Edit Profile</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <Stack spacing={3} sx={{ pt: 1 }}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            type="submit"
            variant="contained"
            endIcon={<SaveIcon />}
            disabled={!formData.name || !formData.email}
          >
            Save Changes
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
