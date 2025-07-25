import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Card,
  Link,
} from "@mui/material";
import { register as registerApi } from "../api/auth";
import UploadImageButton from "../components/UploadImageButton";
import { useRenderCount } from "../hooks/useRenderCount";

export interface FormState {
  name: string;
  email: string;
  password: string;
  phone: string;
  profilePicUrl: string;
  company: string;
}

export interface UploadThingResponse {
  name: string;
  size: number;
  key: string;
  url: string;
  ufsUrl: string;
}

const RegisterPage: React.FC = () => {
  // Render counter
  const renderCount = useRenderCount();
  const navigate = useNavigate();

  // form state & status
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    password: "",
    phone: "",
    profilePicUrl: "",
    company: "",
  });

  const [isUploading, setIsUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // handle field updates
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // submit registration
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    // Validate form
    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.phone ||
      !form.company ||
      !form.profilePicUrl
    ) {
      setError("Fill in all required fields!");
      setSubmitting(false);
      return;
    }

    try {
      await registerApi({
        name: form.name,
        email: form.email,
        password: form.password,
        phone: form.phone,
        profilePicUrl: form.profilePicUrl,
        company: form.company,
      });
      navigate("/login");
    } catch (e: unknown) {
      console.log(e);
      setError("Failed to register");
    } finally {
      setSubmitting(false);
    }
  };

  const handleUploadComplete = (res: UploadThingResponse[]) => {
    if (res && res.length > 0) {
      setForm((prev) => ({
        ...prev,
        profilePicUrl: res[0].ufsUrl,
      }));
    }
  };

  const handleUploadError = (error: Error) => {
    setError(`Upload failed: ${error.message}`);
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
          Register
        </Typography>

        <Typography variant="body2" color="textSecondary" gutterBottom>
          Render Count: {renderCount}
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            name="name"
            label="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <TextField
            name="email"
            label="Email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <TextField
            name="password"
            label="Password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <TextField
            name="phone"
            label="Phone"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <div>
            <UploadImageButton
              endpoint="profileImage"
              onUploadingChange={setIsUploading}
              onClientUploadComplete={handleUploadComplete}
              onUploadError={handleUploadError}
            />

            {form.profilePicUrl && (
              <Container
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Link
                  href={form.profilePicUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Box
                    component="img"
                    src={form.profilePicUrl}
                    alt="Preview"
                    sx={{
                      width: 100,
                      height: 100,
                      borderRadius: "50%",
                      mt: 1,
                    }}
                  />
                </Link>
              </Container>
            )}
          </div>

          <TextField
            name="company"
            label="Company"
            value={form.company}
            onChange={handleChange}
            required
          />

          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            variant="outlined"
            disabled={submitting || isUploading}
          >
            {submitting ? "Registering…" : "Register"}
          </Button>
        </Box>

        <Button sx={{ mt: 2 }} onClick={() => navigate("/login")}>
          Have an account? Log in
        </Button>
      </Card>
    </Container>
  );
};

export default RegisterPage;
