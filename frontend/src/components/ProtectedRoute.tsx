import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { Navigate } from "react-router-dom";

type protectedRouteProps = {
  children: React.ReactNode;
};

export const ProtectedRoute = ({ children }: protectedRouteProps) => {
  const { isAuthenticated, isLoading } = useSelector(
    (state: RootState) => state.auth,
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
