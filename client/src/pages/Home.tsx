import React from "react";
import { Box } from "@mui/material";
import HeroSection from "../components/HeroSection";
import HomeContent from "../components/HomeContent";
import FeaturedProducts from "../components/FeaturedProducts";

const Home: React.FC = () => {
  return (
    <Box>
      <HeroSection />
      <HomeContent />
      <FeaturedProducts />
    </Box>
  );
};

export default Home;
