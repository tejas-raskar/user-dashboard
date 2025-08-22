import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { AppDispatch, RootState } from "../app/store";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/authSlice";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const { isLoading, isError, isAuthenticated, message } = useSelector(
    (state: RootState) => state.auth,
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/posts");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div>
      <h1>Login</h1>
      <div>
        <input
          type="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
        />
      </div>
      <div>
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        />
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          const userData = { email, password };
          dispatch(login(userData));
        }}
      >
        {isLoading ? "Logging in" : "Submit"}
      </button>
      {isError && <p>{message}</p>}
    </div>
  );
};
