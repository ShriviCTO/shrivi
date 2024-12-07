import React from "react";
import HeroSection from "../components/HeroSection";
import HomeContent from "../components/HomeContent";
import { Box } from "@mui/material";

const Home: React.FC = () => {
  return (
    <Box>
      <HeroSection />
      <HomeContent />
    </Box>
  );
};

export default Home;
