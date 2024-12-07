import React from "react";
import HeroSection from "../components/HeroSection";
import { Box } from "@mui/material";

const Home: React.FC = () => {
  return (
    <Box>
      <HeroSection />
      {/* Other components for the Home page can go here */}
      <Box sx={{ textAlign: "center", p: 4 }}>
        {/* Example of additional content */}
        <h2>Welcome to Shrivi Organics</h2>
        <p>Explore our wide range of sustainable products and solutions.</p>
      </Box>
    </Box>
  );
};

export default Home;
