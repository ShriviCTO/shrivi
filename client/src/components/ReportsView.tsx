import React from "react";
import { Box, Typography, Paper } from "@mui/material";

const ReportsView = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Reports
      </Typography>
      <Paper
        sx={{
          p: 3,
          borderRadius: 2,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          bgcolor: "white",
        }}
      >
        <Typography>Reports and analytics here...</Typography>
      </Paper>
    </Box>
  );
};

export default ReportsView;
