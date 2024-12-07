import React from "react";
import { Container, Typography } from "@mui/material";

const Blog: React.FC = () => (
  <Container>
    <Typography variant="h2" textAlign="center" my={4}>
      Blog & Resources
    </Typography>
    <Typography variant="body1" textAlign="center">
      Insights, tips, and stories from the world of sustainability.
    </Typography>
  </Container>
);

export default Blog;
