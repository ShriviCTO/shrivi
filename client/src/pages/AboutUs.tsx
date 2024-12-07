import React from "react";
import { Container, Typography } from "@mui/material";

const AboutUs: React.FC = () => (
  <Container>
    <Typography variant="h2" textAlign="center" my={4}>
      About Us
    </Typography>
    <Typography variant="body1" textAlign="center">
      Learn more about our mission, vision, and journey.
    </Typography>
  </Container>
);

export default AboutUs;
