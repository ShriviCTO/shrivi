import React from "react";
import { Container, Typography } from "@mui/material";

const FAQ: React.FC = () => (
  <Container>
    <Typography variant="h2" textAlign="center" my={4}>
      Frequently Asked Questions
    </Typography>
    <Typography variant="body1" textAlign="center">
      Find answers to common questions about our products and services.
    </Typography>
  </Container>
);

export default FAQ;
