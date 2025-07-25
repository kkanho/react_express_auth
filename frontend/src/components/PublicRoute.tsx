import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

interface PublicRouteProps {
  children: React.ReactNode;
}

export default function PublicRoute({ children }: PublicRouteProps) {
  const auth = useContext(AuthContext);

  // Redirect authenticated users to profile
  if (auth?.token) {
    return <Navigate to={`/profile/${auth.userId}`} replace />;
  }

  return <>{children}</>;
}
