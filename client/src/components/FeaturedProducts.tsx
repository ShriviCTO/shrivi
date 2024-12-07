import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Grid,
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import RecyclingIcon from "@mui/icons-material/Recycling";

const products = [
  {
    name: "Urvaruka (Frass-Based Fertilizer)",
    image: "/images/urvaruka_transparent.png", // Replace with actual image path
    tagline: "Nourish your garden with nature's best.",
    description:
      "Packed with rich nutrients, Urvaruka is ideal for plants, gardens, and crops, ensuring sustainable growth and improved soil health.",
    sizes: ["0.5kg", "1kg", "5kg", "10kg"],
    originalPrice: "₹750",
    discountedPrice: "₹225 (with shipping)",
    link: "/products/urvaruka", // Replace with actual URL
  },
  {
    name: "Uthpann (Soil-Free Potting Mix)",
    image: "/images/uthpann.png", // Replace with actual image path
    tagline: "Premium curated mix for vibrant plants.",
    description:
      "Perfect for urban gardeners, Uthpann provides a hassle-free potting solution that ensures lush, healthy plants.",
    comingSoon: true,
  },
  {
    name: "Poshita (Protein-Rich Pet Treat)",
    image: "/images/poshitha.png", // Replace with actual image path
    tagline: "Wholesome, healthy treats for your pets.",
    description:
      "Crafted with care, Poshita offers protein-packed nutrition to keep your pets active, happy, and healthy.",
    comingSoon: true,
  },
];

const FeaturedProducts: React.FC = () => {
  return (
    <Box
      sx={{
        bgcolor: "rgba(245, 240, 230, 0.7)", // Light beige background
        py: 6,
        px: 4,
        textAlign: "center",
      }}
    >
      {/* Header */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          color: "primary.main",
          mb: 4,
        }}
      >
        Explore Our Premium Products
      </Typography>

      {/* Product Cards */}
      <Grid container spacing={4} justifyContent="center">
        {products.map((product, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                height: "100%", // Ensures uniform height
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: 3,
                borderRadius: 2,
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: 5,
                },
              }}
            >
              {/* Product Image */}
              <CardMedia
                component="img"
                image={product.image}
                alt={product.name}
                sx={{
                  maxWidth: "100%",
                  maxHeight: "200px",
                  objectFit: "contain",
                  margin: "auto",
                  p: 2,
                }}
              />

              {/* Product Details */}
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                  {product.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", mb: 2 }}
                >
                  {product.tagline}
                </Typography>
                <Typography variant="body2" sx={{ color: "gray", mb: 2 }}>
                  {product.description}
                </Typography>
                {product.comingSoon ? (
                  <Typography
                    variant="body2"
                    sx={{
                      color: "gray",
                      fontStyle: "italic",
                      mb: 2,
                    }}
                  >
                    Coming Soon
                  </Typography>
                ) : (
                  <>
                    <Box sx={{ mb: 2 }}>
                      <Typography
                        variant="body2"
                        sx={{ textDecoration: "line-through", color: "gray" }}
                      >
                        {product.originalPrice}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", color: "secondary.main" }}
                      >
                        {product.discountedPrice}
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: "gray", mb: 2 }}>
                      Available Sizes: {product.sizes?.join(", ")}
                    </Typography>
                    {/* Redirect to Product Page */}
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<LocalShippingIcon />}
                      href={product.link}
                      sx={{
                        borderRadius: "20px",
                        px: 3,
                      }}
                    >
                      Learn More
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Sustainability Badge */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: 6,
        }}
      >
        <RecyclingIcon sx={{ fontSize: 40, color: "primary.main", mr: 1 }} />
        <Typography variant="body1" sx={{ color: "primary.main" }}>
          Proudly Sustainable and Eco-Friendly
        </Typography>
      </Box>
    </Box>
  );
};

export default FeaturedProducts;
