import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Card,
} from "@mui/material";
import { login as loginApi } from "../api/auth";
import { AuthContext } from "../contexts/AuthContext";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext)!;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const { data } = await loginApi({ email, password });
      const token = data.token;
      // decode JWT payload to extract userId
      const payload = JSON.parse(atob(token.split(".")[1]));
      const userId: string = payload.userId;

      // store in context (localStorage)
      auth.setToken(token);
      auth.setUserId(userId);

      // redirect to own profile
      navigate(`/profile/${userId}`);
    } catch (e: unknown) {
      console.log(e);
      setError("Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        height: "90dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        variant="outlined"
        sx={{
          width: "100%",
          padding: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
          Log In
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            name="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <TextField
            name="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}

          <Button type="submit" variant="outlined" disabled={submitting}>
            {submitting ? "Logging in…" : "Log In"}
          </Button>
        </Box>

        <Button sx={{ mt: 2 }} onClick={() => navigate("/register")}>
          Need an account? Register
        </Button>
      </Card>
    </Container>
  );
};

export default LoginPage;
