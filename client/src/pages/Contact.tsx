import React from "react";
import { Container, Typography } from "@mui/material";

const Contact: React.FC = () => (
  <Container>
    <Typography variant="h2" textAlign="center" my={4}>
      Contact Us
    </Typography>
    <Typography variant="body1" textAlign="center">
      We’d love to hear from you. Get in touch with us today!
    </Typography>
  </Container>
);

export default Contact;
