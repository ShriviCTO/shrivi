import React from "react";
import { Container, Typography } from "@mui/material";

const BulkOrders: React.FC = () => (
  <Container>
    <Typography variant="h2" textAlign="center" my={4}>
      Bulk Orders
    </Typography>
    <Typography variant="body1" textAlign="center">
      For bulk needs, we’ve got you covered. Contact us for more details.
    </Typography>
  </Container>
);

export default BulkOrders;
