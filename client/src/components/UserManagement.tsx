import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const UserManagement = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>
        User Management
      </Typography>
      <Button
        variant="contained"
        startIcon={<AddCircleIcon />}
        sx={{ mb: 2 }}
        onClick={() => alert("Adding User")}
      >
        Add User
      </Button>
      <Paper
        sx={{
          p: 3,
          borderRadius: 2,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          bgcolor: "white",
        }}
      >
        <Typography>User table or details here...</Typography>
      </Paper>
    </Box>
  );
};

export default UserManagement;
