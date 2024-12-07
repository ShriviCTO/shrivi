import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  TextField,
  MenuItem,
  Button,
  IconButton,
  Stack,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import InstagramIcon from "@mui/icons-material/Instagram";

const ContactUs: React.FC = () => {
  return (
    <Box sx={{ bgcolor: "rgba(245, 240, 230, 0.7)", py: 6 }}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box
          sx={{
            textAlign: "center",
            mb: 6,
            py: 4,
            px: 2,
            bgcolor: "primary.main",
            color: "white",
            borderRadius: 2,
            backgroundImage: "url('/images/contact-background.png')", // Replace with actual background image
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
            Get in Touch with Shrivi Organics
          </Typography>
          <Typography variant="h6">
            We’d love to hear from you—whether it’s a question, feedback, or
            collaboration inquiry!
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            sx={{
              mt: 4,
              px: 4,
              borderRadius: "20px",
              fontWeight: "bold",
            }}
          >
            Reach Out to Us Today!
          </Button>
        </Box>

        {/* Contact Form Section */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4 }}>
              Send Us a Message
            </Typography>
            <form noValidate>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Email Address"
                    type="email"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Phone Number"
                    type="tel"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Reason for Contact"
                    variant="outlined"
                    select
                    fullWidth
                    required
                  >
                    <MenuItem value="General Inquiry">General Inquiry</MenuItem>
                    <MenuItem value="Product Feedback">
                      Product Feedback
                    </MenuItem>
                    <MenuItem value="Collaboration/Partnership">
                      Collaboration/Partnership
                    </MenuItem>
                    <MenuItem value="Bulk Order Inquiry">
                      Bulk Order Inquiry
                    </MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Message"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{
                      px: 4,
                      py: 1.5,
                      borderRadius: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    Send Message
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>

          {/* Contact Details Section */}
          <Grid item xs={12} md={6}>
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4 }}>
              Contact Information
            </Typography>
            <Stack spacing={3}>
              <Box display="flex" alignItems="center">
                <LocationOnIcon sx={{ color: "secondary.main", mr: 2 }} />
                <Typography variant="body1">
                  <strong>Address:</strong> 321/2, Near Pirana Waterworks,
                  Daskroi, Girmatha, Ahmedabad 382425
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <PhoneIcon sx={{ color: "secondary.main", mr: 2 }} />
                <Typography variant="body1">
                  <strong>Phone:</strong> +91 98987 64888
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <EmailIcon sx={{ color: "secondary.main", mr: 2 }} />
                <Typography variant="body1">
                  <strong>Email:</strong> info@shriviorganics.com
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <AccessTimeIcon sx={{ color: "secondary.main", mr: 2 }} />
                <Typography variant="body1">
                  <strong>Hours:</strong> Mon-Fri: 9:00 AM - 6:00 PM
                  <br />
                  Saturday: 10:00 AM - 4:00 PM
                  <br />
                  Sunday: Closed
                </Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>

        {/* Embedded Google Map */}
        <Box sx={{ mt: 6, borderRadius: 2, overflow: "hidden" }}>
          <iframe
            title="Shrivi Organics Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.1342092672375!2d72.54639811495377!3d23.00858278495937!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e84fb5b260087%3A0x72e9ea54d9f96da!2sPirana%20Water%20Works!5e0!3m2!1sen!2sin!4v1635432648930!5m2!1sen!2sin"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </Box>

        {/* Social Links */}
        <Box
          sx={{
            textAlign: "center",
            mt: 4,
            pt: 4,
            borderTop: "1px solid rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Follow Us
          </Typography>
          <IconButton
            href="https://www.instagram.com/shrivi.organics/"
            target="_blank"
            rel="noopener"
            sx={{
              bgcolor: "secondary.main",
              color: "white",
              "&:hover": { bgcolor: "primary.main" },
              mr: 1,
            }}
          >
            <InstagramIcon />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
};

export default ContactUs;
