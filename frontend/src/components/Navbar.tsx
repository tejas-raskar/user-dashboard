import { Link, useNavigate } from "react-router-dom";
import type { AppDispatch, RootState } from "../app/store";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/authSlice";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import PostAddIcon from "@mui/icons-material/PostAdd";
import LogoutIcon from "@mui/icons-material/Logout";

export const Navbar = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth,
  );

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <AppBar position="static" color="primary" elevation={2}>
      <Container maxWidth="lg">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
            Dashboard
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {isAuthenticated ? (
              <>
                <Button
                  color="inherit"
                  component={Link}
                  to="/posts"
                  startIcon={<HomeIcon />}
                  sx={{ textTransform: "none" }}
                >
                  All Posts
                </Button>
                <Button
                  color="inherit"
                  component={Link}
                  to="/my_posts"
                  startIcon={<PostAddIcon />}
                  sx={{ textTransform: "none" }}
                >
                  My Posts
                </Button>
                <Button
                  color="inherit"
                  component={Link}
                  to="/profile"
                  startIcon={<PersonIcon />}
                  sx={{ textTransform: "none" }}
                >
                  Profile
                </Button>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Welcome, {user?.name}
                  </Typography>
                  <Button
                    color="inherit"
                    onClick={handleLogout}
                    startIcon={<LogoutIcon />}
                    sx={{ textTransform: "none" }}
                  >
                    Logout
                  </Button>
                </Box>
              </>
            ) : (
              <>
                <Button
                  color="inherit"
                  component={Link}
                  to="/login"
                  sx={{ textTransform: "none" }}
                >
                  Login
                </Button>
                <Button
                  color="inherit"
                  component={Link}
                  to="/register"
                  sx={{ textTransform: "none" }}
                >
                  Sign Up
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
