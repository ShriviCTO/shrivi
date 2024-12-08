import React from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  Card,
  CardContent,
  CardMedia,
  Divider,
} from "@mui/material";
import NatureIcon from "@mui/icons-material/Nature";
import ScienceIcon from "@mui/icons-material/Science";
import PeopleIcon from "@mui/icons-material/People";
import StarIcon from "@mui/icons-material/Star";
import RecyclingIcon from "@mui/icons-material/Recycling";
import PublicIcon from "@mui/icons-material/Public";

const AboutUs: React.FC = () => {
  return (
    <Box sx={{ p: 4 }}>
      {/* Headline and Introduction */}
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
          Transforming Nature, One Sustainable Innovation at a Time
        </Typography>
        <Typography
          variant="body1"
          sx={{ maxWidth: "800px", margin: "0 auto" }}
        >
          At Shrivi Organics, we’re on a mission to redefine sustainability by
          turning waste into opportunity. From premium organic fertilizers to
          innovative protein solutions for animals, our work is rooted in
          science, inspired by nature, and driven by the belief that sustainable
          practices are the future.
        </Typography>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Mission and Vision */}
      <Box sx={{ mb: 6 }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={4}
          justifyContent="center"
        >
          <Card
            sx={{
              maxWidth: 400,
              boxShadow: 3,
              textAlign: "center",
              p: 2,
            }}
          >
            <RecyclingIcon
              sx={{ fontSize: 60, color: "primary.main", mb: 2 }}
            />
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
              Our Mission
            </Typography>
            <Typography variant="body1">
              To innovate eco-friendly solutions that enrich agriculture,
              nourish livestock, and preserve the planet for future generations.
            </Typography>
          </Card>
          <Card
            sx={{
              maxWidth: 400,
              boxShadow: 3,
              textAlign: "center",
              p: 2,
            }}
          >
            <PublicIcon sx={{ fontSize: 60, color: "secondary.main", mb: 2 }} />
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
              Our Vision
            </Typography>
            <Typography variant="body1">
              To lead the global shift toward a circular economy by pioneering
              sustainable technologies that benefit people and the planet.
            </Typography>
          </Card>
        </Stack>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Our Story */}
      <Box sx={{ mb: 6, textAlign: "center" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4 }}>
          Our Journey
        </Typography>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={4}
          alignItems="center"
          justifyContent="center"
        >
          <Box sx={{ textAlign: "center", maxWidth: "500px" }}>
            <img
              src="/images/journey.png" // Replace with your image
              alt="Our Journey"
              style={{
                width: "100%",
                borderRadius: "8px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            />
          </Box>
          <Box>
            <Typography variant="body1">
              Shrivi Organics began in 2023 as a passion project to tackle food
              waste and reduce environmental harm. Starting with Black Soldier
              Fly (BSF) frass-based fertilizers, we’ve grown into a company at
              the forefront of sustainable solutions, blending science and
              nature to create meaningful impact.
            </Typography>
          </Box>
        </Stack>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Core Values */}
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4 }}>
          Our Core Values
        </Typography>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={4}
          justifyContent="center"
          alignItems="center"
        >
          {[
            {
              label: "Sustainability",
              icon: <NatureIcon sx={{ fontSize: 50 }} />,
            },
            {
              label: "Innovation",
              icon: <ScienceIcon sx={{ fontSize: 50 }} />,
            },
            { label: "Quality", icon: <StarIcon sx={{ fontSize: 50 }} /> },
            {
              label: "Community Impact",
              icon: <PeopleIcon sx={{ fontSize: 50 }} />,
            },
            {
              label: "Transparency",
              icon: <PublicIcon sx={{ fontSize: 50 }} />,
            },
          ].map((value) => (
            <Card
              key={value.label}
              sx={{
                maxWidth: 300,
                boxShadow: 3,
                textAlign: "center",
                p: 2,
              }}
            >
              <Box sx={{ color: "primary.main", mb: 2 }}>{value.icon}</Box>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                {value.label}
              </Typography>
              <Typography variant="body2">
                {value.label === "Sustainability" &&
                  "Minimizing our environmental footprint through innovative practices."}
                {value.label === "Innovation" &&
                  "Bringing cutting-edge research into eco-friendly solutions."}
                {value.label === "Quality" &&
                  "Ensuring excellence in every product we create."}
                {value.label === "Community Impact" &&
                  "Partnering with farmers and communities for mutual growth."}
                {value.label === "Transparency" &&
                  "Operating with openness and honesty in all we do."}
              </Typography>
            </Card>
          ))}
        </Stack>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Milestones */}
      <Box sx={{ mb: 6 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", textAlign: "center", mb: 4 }}
        >
          Our Milestones
        </Typography>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={4}
          justifyContent="center"
          alignItems="center"
        >
          {[
            {
              title: "60+ Tons of Organic Waste Processed",
              description:
                "Contributing to a circular economy by reducing waste and enhancing productivity.",
              icon: (
                <RecyclingIcon sx={{ fontSize: 50, color: "secondary.main" }} />
              ),
            },
            {
              title: "Partnerships with Leading Institutions",
              description:
                "Collaborating with research organizations to drive sustainable growth.",
              icon: (
                <ScienceIcon sx={{ fontSize: 50, color: "primary.main" }} />
              ),
            },
            {
              title: "Launch of Urvaruka",
              description:
                "Developing premium organic fertilizers for retail and B2B markets.",
              icon: <StarIcon sx={{ fontSize: 50, color: "secondary.main" }} />,
            },
          ].map((milestone) => (
            <Card
              key={milestone.title}
              sx={{
                maxWidth: 400,
                boxShadow: 3,
                textAlign: "center",
                p: 2,
              }}
            >
              <Box sx={{ mb: 2 }}>{milestone.icon}</Box>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                {milestone.title}
              </Typography>
              <Typography variant="body2">{milestone.description}</Typography>
            </Card>
          ))}
        </Stack>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Meet the Founders */}
      <Box sx={{ mb: 6, textAlign: "center" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4 }}>
          Meet Our Founders
        </Typography>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={4}
          justifyContent="center"
          alignItems="center"
        >
          {[
            {
              name: "Raghavendra Alladi",
              title: "Co-Founder",
              description:
                "A visionary in sustainable agriculture with a deep passion for innovation.",
              image: "/images/raghavendra.png",
            },
            {
              name: "Nikhila Vemula",
              title: "Co-Founder",
              description:
                "Dedicated to operational excellence and empowering communities.",
              image: "/images/nikhila.png",
            },
            {
              name: "Puran Kalapala",
              title: "Co-Founder",
              description:
                "Driving technology innovation to redefine eco-friendly practices.",
              image: "/images/puran.png",
            },
          ].map((founder) => (
            <Card key={founder.name} sx={{ maxWidth: "300px", boxShadow: 3 }}>
              <CardMedia
                component="img"
                height="200"
                image={founder.image}
                alt={founder.name}
              />
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                  {founder.name}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {founder.title}
                </Typography>
                <Typography variant="body2">{founder.description}</Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Call-to-Action */}
      <Box sx={{ textAlign: "center", mt: 6 }}>
        <Button variant="contained" color="primary" href="/products">
          Learn More About Our Products
        </Button>
      </Box>
    </Box>
  );
};

export default AboutUs;
