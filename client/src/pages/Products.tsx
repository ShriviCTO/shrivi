import React from "react";
import { Container, Typography } from "@mui/material";

const Products: React.FC = () => (
  <Container>
    <Typography variant="h2" textAlign="center" my={4}>
      Our Products
    </Typography>
    <Typography variant="body1" textAlign="center">
      Browse our premium fertilizers and soil enhancers.
    </Typography>
  </Container>
);

export default Products;
