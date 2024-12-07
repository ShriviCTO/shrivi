import React from "react";
import { Box, Container, Typography, Link, Stack } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "primary.main",
        color: "white",
        py: 4,
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        {/* Footer Content */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={4}
          justifyContent="space-between"
          alignItems="flex-start"
        >
          {/* About Section */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Shrivi Organics
            </Typography>
            <Typography variant="body2">
              Transforming waste into wonder. Join us in creating a more
              sustainable future with premium fertilizers and soil enhancers.
            </Typography>
          </Box>

          {/* Quick Links */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Stack spacing={1}>
              <Link href="/" color="inherit" underline="hover">
                Home
              </Link>
              <Link href="/about-us" color="inherit" underline="hover">
                About Us
              </Link>
              <Link href="/products" color="inherit" underline="hover">
                Products
              </Link>
              <Link href="/contact" color="inherit" underline="hover">
                Contact
              </Link>
            </Stack>
          </Box>

          {/* Contact Information */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2">
              Email: contact@shriviorganics.com
            </Typography>
            <Typography variant="body2">Phone: +91 98987 64888</Typography>
            <Typography variant="body2">
              321/2, Near Pirana Waterworks, Daskroi, Girmatha, Ahmedabad 382425
            </Typography>
          </Box>
        </Stack>

        {/* Bottom Bar */}
        <Box
          sx={{
            mt: 4,
            pt: 2,
            borderTop: "1px solid rgba(255, 255, 255, 0.2)",
            textAlign: "center",
          }}
        >
          <Typography variant="body2">
            © {new Date().getFullYear()} Shrivi Organics. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
