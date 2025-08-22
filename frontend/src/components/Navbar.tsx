import { Link, useNavigate } from "react-router-dom";
import type { AppDispatch } from "../app/store";
import { useDispatch } from "react-redux";
import { logout } from "../features/authSlice";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from "@mui/material";

export const Navbar = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <AppBar position="static" elevation={2} className="bg-[#000000]">
      <Container maxWidth="lg">
        <Toolbar className="flex justify-between">
          <Typography variant="h6" component="div" className="font-semibold">
            Dashboard
          </Typography>

          <Box className="flex items-center gap-2">
            <>
              <Button
                color="inherit"
                component={Link}
                to="/posts"
                className="normal-case font-medium opacity-75"
              >
                Home
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/my_posts"
                className="normal-case font-medium opacity-75"
              >
                My Posts
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/profile"
                className="normal-case font-medium opacity-75"
              >
                Profile
              </Button>
              <Button
                color="inherit"
                onClick={handleLogout}
                className="normal-case font-medium opacity-75"
              >
                Logout
              </Button>
            </>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
