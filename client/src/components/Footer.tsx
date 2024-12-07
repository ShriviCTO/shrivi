import React from "react";
import {
  Box,
  Container,
  Typography,
  Link,
  Stack,
  IconButton,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ContactMailIcon from "@mui/icons-material/ContactMail";

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "primary.main",
        color: "white",
        py: 6,
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
            <Typography variant="body2" sx={{ maxWidth: "300px", mb: 2 }}>
              Transforming waste into wonder. Join us in creating a more
              sustainable future with premium fertilizers and soil enhancers.
            </Typography>
            {/* Social Links */}
            <Box>
              <IconButton
                href="https://www.instagram.com/shrivi.organics/"
                target="_blank"
                rel="noopener"
                sx={{
                  bgcolor: "rgba(255, 255, 255, 0.2)",
                  color: "white",
                  "&:hover": { bgcolor: "secondary.main" },
                  mr: 1,
                }}
              >
                <InstagramIcon />
              </IconButton>
            </Box>
          </Box>

          {/* Quick Links */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Stack spacing={1}>
              <Link
                href="/"
                color="inherit"
                underline="hover"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <HomeIcon sx={{ fontSize: 18, mr: 1 }} /> Home
              </Link>
              <Link
                href="/about-us"
                color="inherit"
                underline="hover"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <InfoIcon sx={{ fontSize: 18, mr: 1 }} /> About Us
              </Link>
              <Link
                href="/products"
                color="inherit"
                underline="hover"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <ShoppingCartIcon sx={{ fontSize: 18, mr: 1 }} /> Products
              </Link>
              <Link
                href="/contact"
                color="inherit"
                underline="hover"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <ContactMailIcon sx={{ fontSize: 18, mr: 1 }} /> Contact
              </Link>
            </Stack>
          </Box>

          {/* Contact Information */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Email:</strong> contact@shriviorganics.com
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Phone:</strong> +91 98987 64888
            </Typography>
            <Typography variant="body2">
              <strong>Address:</strong> 321/2, Near Pirana Waterworks, Daskroi,
              Girmatha, Ahmedabad 382425
            </Typography>
          </Box>
        </Stack>

        {/* Bottom Bar */}
        <Box
          sx={{
            mt: 6,
            pt: 2,
            borderTop: "1px solid rgba(255, 255, 255, 0.2)",
            textAlign: "center",
          }}
        >
          <Typography variant="body2" sx={{ mb: 1 }}>
            © {new Date().getFullYear()} Shrivi Organics. All rights reserved.
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontSize: "0.9rem", color: "rgba(255, 255, 255, 0.8)" }}
          >
            Designed with ❤️ for a sustainable future.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
