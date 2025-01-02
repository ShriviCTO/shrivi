import React from "react";
import { Box, Typography } from "@mui/material";

const TermsPage: React.FC = () => {
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
      <Box sx={{ maxWidth: "600px", textAlign: "center" }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Terms and Conditions
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Placeholder content for the Terms and Conditions page. Please add your
          terms here.
        </Typography>
      </Box>
    </Box>
  );
};

export default TermsPage;
