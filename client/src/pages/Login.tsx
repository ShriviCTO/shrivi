import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Link,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Email and Password Validation
  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password: string) => password.length >= 6; // Minimum password length requirement

  const handleLogin = () => {
    setError(""); // Reset any existing errors
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!validatePassword(password)) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    // Handle successful login logic here
    // Simulating navigation after login
    alert("Login successful! Navigating to the dashboard...");
    navigate("/dashboard"); // Adjust to your admin/dashboard route
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: "background.default",
        px: 2,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "400px",
          p: 4,
          bgcolor: "white",
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" align="center" sx={{ mb: 2 }}>
          Employee Login
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Stack spacing={2}>
          {/* Email Field */}
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
          />

          {/* Password Field */}
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
          />

          {/* Login Button */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogin}
            fullWidth
            sx={{ py: 1.5 }}
          >
            Sign In
          </Button>

          {/* Terms and Conditions Link */}
          <Typography
            variant="body2"
            sx={{ textAlign: "center", mt: 2, color: "text.secondary" }}
          >
            By signing in, you agree to our{" "}
            <Link
              href="/terms"
              underline="hover"
              sx={{ color: "primary.main" }}
            >
              Terms and Conditions
            </Link>
            .
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default LoginPage;
