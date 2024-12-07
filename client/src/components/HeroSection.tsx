import React, { useEffect, useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const slides = [
  {
    image: "/slide1.png",
    title: "Enriching Lives, One Harvest at a Time",
    subtitle:
      "Premium organic solutions for healthy soil, thriving crops, and a sustainable planet.",
    textPosition: "center",
    animation: "fadeIn", // Animation for the text
  },
  {
    image: "/slide2.png",
    title: "Feeding Pets, Poultry, and Possibilities",
    subtitle:
      "Innovative proteins and premium pet food crafted sustainably for a healthier tomorrow.",
    textPosition: "left",
    animation: "slideLeft",
  },
  {
    image: "/slide3.png",
    title: "Innovation Rooted in Nature",
    subtitle:
      "Redefining agriculture with cutting-edge research and sustainable breakthroughs.",
    textPosition: "right",
    animation: "slideRight",
  },
  {
    image: "/slide4.png",
    title: "Together, We Can Grow a Better Future",
    subtitle:
      "Partner with us for sustainable growth, innovation, and prosperity.",
    textPosition: "bottom",
    animation: "fadeUp",
  },
];

const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000); // 7 seconds interval

    return () => clearInterval(timer); // Clear timer on component unmount
  }, []);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const getTextPositionStyles = (position: string) => {
    switch (position) {
      case "center":
        return { top: "50%", left: "50%" };
      case "left":
        return { top: "50%", left: "10%" };
      case "right":
        return { top: "50%", right: "10%" };
      case "bottom":
        return { bottom: "10%", left: "50%" };
      default:
        return {};
    }
  };

  const getAnimationStyles = (animation: string) => {
    switch (animation) {
      case "fadeIn":
        return { animation: "fadeIn 2s" };
      case "slideLeft":
        return { animation: "slideLeft 2s" };
      case "slideRight":
        return { animation: "slideRight 2s" };
      case "fadeUp":
        return { animation: "fadeUp 2s" };
      default:
        return {};
    }
  };

  return (
    <Box sx={{ position: "relative", overflow: "hidden" }}>
      {/* Slideshow */}
      <Box
        sx={{
          height: "600px",
          position: "relative",
          backgroundImage: `url(${slides[currentSlide].image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Slide Text with Blurred Background */}
        <Box
          sx={{
            position: "absolute",
            textAlign: "center",
            ...getTextPositionStyles(slides[currentSlide].textPosition),
            ...getAnimationStyles(slides[currentSlide].animation),
            p: 3, // Padding for the text box
            bgcolor: "rgba(256, 256, 256, 0.1)", // Semi-transparent black background
            backdropFilter: "blur(8px)", // Blur effect
            borderRadius: 2, // Rounded corners
            color: "white",
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: "bold" }} gutterBottom>
            {slides[currentSlide].title}
          </Typography>
          <Typography variant="h5">{slides[currentSlide].subtitle}</Typography>
        </Box>

        {/* Navigation Arrows */}
        <IconButton
          onClick={handlePrev}
          sx={{
            position: "absolute",
            top: "50%",
            left: "20px",
            transform: "translateY(-50%)",
            color: "white",
            zIndex: 1,
          }}
        >
          <ArrowBackIosIcon fontSize="large" />
        </IconButton>
        <IconButton
          onClick={handleNext}
          sx={{
            position: "absolute",
            top: "50%",
            right: "20px",
            transform: "translateY(-50%)",
            color: "white",
            zIndex: 1,
          }}
        >
          <ArrowForwardIosIcon fontSize="large" />
        </IconButton>
      </Box>

      {/* Animation Keyframes */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideLeft {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
          @keyframes slideRight {
            from { transform: translateX(-100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
          @keyframes fadeUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        `}
      </style>
    </Box>
  );
};

export default HeroSection;
