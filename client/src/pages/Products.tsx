import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Stack,
  Chip,
} from "@mui/material";
import RecyclingIcon from "@mui/icons-material/Recycling";
import PetsIcon from "@mui/icons-material/Pets";
import GardeningIcon from "@mui/icons-material/LocalFlorist";

const products = [
  {
    name: "Urvaruka (Premium Soil Amendment)",
    image: "/images/urvaruka_transparent.png", // Replace with actual image path
    sizes: ["0.5kg", "1kg", "5kg", "10kg"],
    description:
      "A nutrient-rich soil amendment made from 100% organic frass. Boosts soil fertility, improves immunity, and enhances plant growth naturally.",
    usp: "Pesticide-free, eco-friendly, and safe for plants, pets, and the planet.",
    category: "Fertilizers",
    isUpcoming: false,
  },
  {
    name: "Uthpann (Soil-Free Potting Mix)",
    image: "/images/uthpann.png", // Replace with actual image path
    description:
      "A premium, curated potting mix designed for vibrant indoor plants and terrace gardens.",
    usp: "Soil-free, easy-to-use, and suitable for beginners and experts alike.",
    category: "Gardening Tools",
    isUpcoming: true,
  },
  {
    name: "Poshita (Protein-Rich Dog Treats)",
    image: "/images/poshitha.png", // Replace with actual image path
    description:
      "Wholesome and healthy treats for your pets, made from sustainable protein sources.",
    usp: "Made from Black Soldier Fly protein, ensuring a sustainable and highly digestible snack for dogs.",
    category: "Pet Care",
    isUpcoming: true,
  },
  {
    name: "Jeevika (Organic Garden Booster)",
    image: "/images/placeholder.png", // Replace with actual image path
    description:
      "A versatile liquid fertilizer made from natural extracts and frass essence. Perfect for spraying on leaves or adding to irrigation water for an instant nutrient boost.",
    usp: "Quick absorption for visible plant health improvements.",
    category: "Fertilizers",
    isUpcoming: true,
  },
  {
    name: "Nurtura (Plant Immunity Enhancer)",
    image: "/images/placeholder.png", // Replace with actual image path
    description:
      "A specialized blend of organic nutrients and bioactive compounds to enhance plant immunity against pests and diseases.",
    usp: "Strengthens plants naturally, reducing dependency on chemical pesticides.",
    category: "Fertilizers",
    isUpcoming: true,
  },
  {
    name: "MittiMitra (Organic Compost Activator)",
    image: "/images/placeholder.png", // Replace with actual image path
    description:
      "A premium activator for home composting. Speeds up decomposition and enriches the compost with essential nutrients.",
    usp: "Ideal for turning kitchen waste into rich compost quickly and efficiently.",
    category: "Gardening Tools",
    isUpcoming: true,
  },
  {
    name: "KrishiCare (Organic Crop Supplement)",
    image: "/images/placeholder.png", // Replace with actual image path
    description:
      "A large-scale fertilizer designed for commercial farming. Enriched with frass and microbial boosters for enhanced yield and soil health.",
    usp: "Eco-friendly and cost-effective solution for sustainable agriculture.",
    category: "Fertilizers",
    isUpcoming: true,
  },
  {
    name: "Vistara (Premium Lawn Care Blend)",
    image: "/images/placeholder.png", // Replace with actual image path
    description:
      "A specialized fertilizer mix designed for lush, green lawns. Promotes healthy grass growth and prevents bald patches.",
    usp: "Non-toxic and safe for children and pets.",
    category: "Fertilizers",
    isUpcoming: true,
  },
  {
    name: "BhoomiShakti (Soil Revitalizer)",
    image: "/images/placeholder.png", // Replace with actual image path
    description:
      "A powerful soil conditioner enriched with micro and macronutrients. Revitalizes depleted soils for better crop yield.",
    usp: "Perfect for crop rotation and degraded agricultural land.",
    category: "Fertilizers",
    isUpcoming: true,
  },
  {
    name: "AquaBloom (Hydroponic Nutrient Solution)",
    image: "/images/placeholder.png", // Replace with actual image path
    description:
      "A water-soluble nutrient blend specifically formulated for hydroponic farming. Provides essential nutrients for optimal growth in water-based systems.",
    usp: "Balanced and easy-to-use formula for hydroponic enthusiasts and professionals.",
    category: "Gardening Tools",
    isUpcoming: true,
  },
  {
    name: "Samriddhi (Kitchen Garden Kit)",
    image: "/images/placeholder.png", // Replace with actual image path
    description:
      "A complete starter kit for home gardeners. Includes small packs of Urvaruka, Uthpann, organic seeds, and a detailed gardening guide.",
    usp: "Ideal for beginners or as a thoughtful gift for nature lovers.",
    category: "Gardening Tools",
    isUpcoming: true,
  },
  {
    name: "Pawshakti (Protein-Rich Pet Food)",
    image: "/images/placeholder.png", // Replace with actual image path
    description:
      "A nutritionally complete and balanced pet food for cats and dogs. Rich in sustainable proteins and fortified with essential vitamins and minerals.",
    usp: "Eco-friendly production with high-quality, digestible ingredients for healthier pets.",
    category: "Pet Care",
    isUpcoming: true,
  },
];

const Products: React.FC = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          py: 6,
          px: 4,
          textAlign: "center",
          backgroundImage: "url('/images/products-hero.jpg')", // Replace with actual background image
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          height: "400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Overlay */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            bgcolor: "rgba(56, 142, 60, 0.6)", // Subtle green overlay (theme.primary.main)
            zIndex: 1,
          }}
        />

        {/* Content */}
        <Box
          sx={{
            position: "relative",
            zIndex: 2, // Ensures content appears above the overlay
            maxWidth: "700px",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              mb: 2,
              fontSize: { xs: "2rem", md: "3rem" }, // Responsive font size
              textShadow: "2px 2px 5px rgba(0, 0, 0, 0.4)", // Softer shadow for contrast
              color: "rgba(255, 255, 255, 0.95)", // Off-white for softer readability
            }}
          >
            Discover Nature’s Best Products
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mb: 4,
              fontSize: { xs: "1rem", md: "1.5rem" },
              textShadow: "1px 1px 3px rgba(0, 0, 0, 0.4)",
              color: "rgba(245, 240, 230, 0.9)", // Light beige for a natural look
            }}
          >
            From enriching fertilizers to sustainable pet care, Shrivi Organics
            brings you a world of eco-friendly innovations.
          </Typography>
          <Button
            variant="contained"
            sx={{
              mt: 3,
              px: 4,
              py: 1,
              borderRadius: 2,
              bgcolor: "secondary.main", // Align with theme secondary color
              color: "white",
              "&:hover": {
                bgcolor: "secondary.dark",
              },
            }}
          >
            Explore Now
          </Button>
        </Box>
      </Box>

      {/* Filters Section */}
      <Stack
        direction="row"
        spacing={2}
        sx={{
          justifyContent: "center",
          mt: 4,
          mb: 4,
        }}
      >
        <Chip icon={<RecyclingIcon />} label="Fertilizers" />
        <Chip icon={<PetsIcon />} label="Pet Care" />
        <Chip icon={<GardeningIcon />} label="Gardening Tools" />
      </Stack>

      {/* Products Section */}
      <Box
        sx={{
          px: 4,
          py: 6,
          display: "flex",
          flexWrap: "wrap",
          gap: 4,
          justifyContent: "center",
        }}
      >
        {products.map((product, index) => (
          <Card
            key={index}
            sx={{
              width: "300px",
              boxShadow: 3,
              borderRadius: 2,
              overflow: "hidden",
              position: "relative",
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.02)",
                boxShadow: 5,
              },
            }}
          >
            {/* "Coming Soon" Badge */}
            {product.isUpcoming && (
              <Box
                sx={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  bgcolor: "secondary.main",
                  color: "white",
                  px: 2,
                  py: 0.5,
                  borderRadius: 1,
                  fontSize: "0.8rem",
                  fontWeight: "bold",
                }}
              >
                Coming Soon
              </Box>
            )}

            {/* Product Image */}
            <CardMedia
              component="img"
              height="200"
              image={product.image}
              alt={product.name}
              sx={{
                objectFit: "contain",
                bgcolor: "rgba(240, 240, 240, 0.5)",
              }}
            />

            {/* Product Details */}
            <CardContent>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", mb: 1, textAlign: "center" }}
              >
                {product.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  mb: 2,
                  textAlign: "center",
                }}
              >
                {product.description}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontStyle: "italic",
                  color: "primary.main",
                  mb: 2,
                  textAlign: "center",
                }}
              >
                {product.usp}
              </Typography>
              {!product.isUpcoming && (
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {product.sizes?.map((size, idx) => (
                    <Chip
                      key={idx}
                      label={size}
                      variant="outlined"
                      sx={{ fontSize: "0.8rem" }}
                    />
                  ))}
                </Stack>
              )}
              <Box sx={{ textAlign: "center", mt: 3 }}>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={product.isUpcoming}
                  href={
                    !product.isUpcoming
                      ? `/products/${product.name
                          .toLowerCase()
                          .replace(/ /g, "-")}`
                      : undefined
                  }
                >
                  {product.isUpcoming ? "Coming Soon" : "Learn More"}
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Products;
