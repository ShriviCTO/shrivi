import React from "react";
import { Box, Typography, Button, Stack } from "@mui/material";

const HomeContent: React.FC = () => {
  return (
    <>
      {/* Story Section */}
      <Box
        sx={{
          p: 4,
          textAlign: "center",
          bgcolor: "primary.light",
          color: "white",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
          Our Journey: From Waste to Wonder
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          At Shrivi Organics, we believe every waste has the potential to grow
          something wonderful. Our story is rooted in sustainability and driven
          by innovation. From humble beginnings to creating a global impact, we
          continue to turn challenges into opportunities.
        </Typography>
        <Button variant="contained" color="secondary" href="/about-us">
          Discover Our Story
        </Button>
      </Box>

      {/* USP Section */}
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4 }}>
          What Makes Us Unique
        </Typography>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={4}
          justifyContent="center"
          alignItems="center"
        >
          <Box sx={{ textAlign: "center" }}>
            <img
              src="/images/innovation.png" // Replace with actual image
              alt="Innovation"
              style={{
                width: "100%",
                maxWidth: "200px",
                borderRadius: "50%",
                marginBottom: "16px",
              }}
            />
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Innovation
            </Typography>
            <Typography variant="body2">
              Cutting-edge research and science-backed solutions power every
              product we create.
            </Typography>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <img
              src="/images/sustainability.png" // Replace with actual image
              alt="Sustainability"
              style={{
                width: "100%",
                maxWidth: "200px",
                borderRadius: "50%",
                marginBottom: "16px",
              }}
            />
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Sustainability
            </Typography>
            <Typography variant="body2">
              We’re committed to eco-friendly practices that ensure a healthier
              planet.
            </Typography>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <img
              src="/images/community.png" // Replace with actual image
              alt="Community"
              style={{
                width: "100%",
                maxWidth: "200px",
                borderRadius: "50%",
                marginBottom: "16px",
              }}
            />
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Community
            </Typography>
            <Typography variant="body2">
              Partnering with farmers and stakeholders to drive collective
              growth and prosperity.
            </Typography>
          </Box>
        </Stack>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          p: 4,
          bgcolor: "secondary.main",
          color: "white",
          textAlign: "center",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          Ready to Join the Green Revolution?
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Discover how Shrivi Organics is transforming agriculture and
          sustainability worldwide.
        </Typography>
        <Button variant="contained" color="primary" href="/products">
          Explore Our Products
        </Button>
      </Box>
    </>
  );
};

export default HomeContent;
