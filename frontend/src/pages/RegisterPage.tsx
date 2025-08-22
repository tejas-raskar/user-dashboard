import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { AppDispatch, RootState } from "../app/store";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../features/authSlice";
import { Button, TextField } from "@mui/material";

export const RegisterPage = () => {
  const [name, setName] = useState("");
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
    <div className="h-screen">
      <div className="h-full flex flex-col justify-center px-10">
        <div className="flex flex-col justify-center max-w-4xl mx-auto">
          <div>
            <div className=" p-10">
              <div className="text-center font-extrabold text-3xl">
                Create an account
              </div>
              <div className="text-slate-600  font-extralight text-center">
                Already have an account?
                <Link className="pl-2 underline" to="/login">
                  Login
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <TextField
                id="name"
                type="text"
                label="Name"
                placeholder="Enter your Name"
                variant="outlined"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <TextField
                id="email"
                type="email"
                label="Email"
                placeholder="Enter your email"
                variant="outlined"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <TextField
                id="password"
                type="password"
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="flex justify-center items-center mx-auto">
              <Button
                className="mt-5 w-full text-white bg-[#000000] hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm py-2.5 mb-2"
                loading={isLoading ? true : false}
                variant="contained"
                onClick={(e) => {
                  e.preventDefault();
                  const userData = { name, email, password };
                  dispatch(register(userData));
                }}
              >
                {isLoading ? "Signing up" : "Sign Up"}
              </Button>
            </div>
            {isError && (
              <p className="text-red-500 text-center font-semibold">
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
