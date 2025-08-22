import { Link, useNavigate } from "react-router-dom";
import type { AppDispatch, RootState } from "../app/store";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/authSlice";

export const Navbar = () => {
  const navStyle = {
    display: "flex",
    gap: "1rem",
    padding: "1rem",
    borderBottom: "1px solid #ccc",
  };

  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  return (
    <nav style={navStyle}>
      <Link to="/posts">Home</Link>
      {isAuthenticated ? (
        <>
          <Link to="/profile">Profile</Link>
          <button
            onClick={() => {
              dispatch(logout());
              navigate("/login");
            }}
          >
            Log out
          </button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Sign Up</Link>
        </>
      )}
    </nav>
  );
};
