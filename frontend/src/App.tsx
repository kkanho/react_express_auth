import { Routes, Route, Navigate } from "react-router-dom";
import { Container } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";

// Pages
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import FriendsPage from "./pages/FriendsPage";

// Components
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import NavBar from "./components/NavBar";

export default function App() {
  const auth = useContext(AuthContext);

  return (
    <>
      {auth?.token && <NavBar />}
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Routes>
          {/* Public Routes - redirect if authenticated */}
          <Route
            path="/register"
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />

          {/* Protected Routes */}
          <Route
            path="/profile/:id"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/friends/:id"
            element={
              <PrivateRoute>
                <FriendsPage />
              </PrivateRoute>
            }
          />

          {/* Smart fallback based on auth status */}
          <Route
            path="*"
            element={<Navigate to={auth?.token ? "/" : "/login"} replace />}
          />
        </Routes>
      </Container>
    </>
  );
}
