import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

interface LoadingSpinnerProps {
  message?: string; // Optional loading message
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Full screen height
        bgcolor: "background.default", // Themed background color
        color: "primary.main", // Primary color for the spinner
        p: 2,
      }}
    >
      {/* Spinner */}
      <CircularProgress
        sx={{
          color: "primary.main",
          mb: 2,
          width: { xs: "60px", sm: "80px", md: "100px" }, // Responsive size
          height: { xs: "60px", sm: "80px", md: "100px" },
        }}
      />

      {/* Optional Loading Message */}
      {message && (
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            color: "text.secondary",
          }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default LoadingSpinner;
