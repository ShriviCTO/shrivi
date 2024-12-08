import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  Chip,
  Rating,
  Divider,
  Paper,
  Pagination,
} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import RecyclingIcon from "@mui/icons-material/Recycling";
import PetsIcon from "@mui/icons-material/Pets";
import StarIcon from "@mui/icons-material/Star";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const UrvarukaProduct = () => {
  const [page, setPage] = useState(1);
  const reviewsPerPage = 5;

  const product = {
    name: "Urvaruka – Premium Organic Fertilizer",
    tagline: "Nurture Your Plants Naturally, Sustainably, and Powerfully!",
    price: {
      original: 750,
      discounted: 225,
    },
    sizes: ["0.5kg", "1kg", "5kg", "10kg"],
    features: [
      { icon: <RecyclingIcon />, label: "100% Organic" },
      { icon: <PetsIcon />, label: "Pet-Safe" },
      { icon: <StarIcon />, label: "Highly Nutrient-Rich" },
    ],
    description: `Urvaruka is crafted from 100% Black Soldier Fly (BSF) frass, a nutrient-rich organic material. This premium fertilizer enhances soil fertility, boosts plant immunity, and promotes vigorous growth. Ideal for indoor plants, gardens, and large-scale crops, Urvaruka reduces dependency on chemical fertilizers, fostering a sustainable and eco-friendly approach to agriculture.`,
    nutritionalContent: {
      NPK: "3-2-3",
      pH: "6.5-7.5",
      organicMatter: "85%",
    },
    images: [
      "/images/urvaruka-1.jpg",
      "/images/urvaruka-2.jpg",
      "/images/urvaruka-3.jpg",
    ],
    usageInstructions: `**Application Rates:**
- **Indoor Plants:** Mix 50g of Urvaruka per liter of potting soil. Apply every 4 weeks.
- **Outdoor Gardens:** Apply 100g per square meter. Work into the topsoil and water thoroughly.
- **Large-Scale Crops:** Apply 200kg per hectare during planting or as a top dressing.

**General Tips:**
- Store in a cool, dry place.
- Keep out of reach of children and pets.
- Use gloves while handling the product.`,
    reviews: [
      {
        user: "Rohit Mehta",
        rating: 5,
        comment:
          "Absolutely loved it! My vegetable garden is thriving like never before.",
      },
      {
        user: "Neha Patel",
        rating: 4,
        comment: "Great product, but delivery took longer than expected.",
      },
      {
        user: "Suresh Iyer",
        rating: 3,
        comment:
          "Decent fertilizer, but I didn’t see much difference compared to others.",
      },
      {
        user: "Ananya Roy",
        rating: 5,
        comment:
          "The best organic fertilizer I’ve used so far! Highly recommended.",
      },
      {
        user: "Karan Malhotra",
        rating: 4,
        comment: "My plants love it, but the price is a bit high.",
      },
      {
        user: "Ritu Joshi",
        rating: 5,
        comment: "Amazing results! My indoor plants are thriving beautifully.",
      },
      {
        user: "Manoj Gupta",
        rating: 2,
        comment:
          "I didn’t notice any improvement in my plants. Maybe it’s not suitable for my soil.",
      },
      {
        user: "Pooja Sharma",
        rating: 4,
        comment: "Good product, but I wish the packaging was resealable.",
      },
      {
        user: "Rahul Desai",
        rating: 5,
        comment: "Worth every penny! My roses are blooming like never before.",
      },
      {
        user: "Sneha Agarwal",
        rating: 3,
        comment:
          "It’s okay, but I was expecting better results based on the reviews.",
      },
      {
        user: "Vikas Jain",
        rating: 4,
        comment: "Solid product, and I love that it’s eco-friendly!",
      },
      {
        user: "Aarti Chawla",
        rating: 5,
        comment: "This has transformed my terrace garden. Highly satisfied!",
      },
      {
        user: "Ramesh Verma",
        rating: 2,
        comment:
          "Too expensive for the quantity provided. Not value for money.",
      },
      {
        user: "Geeta Bhardwaj",
        rating: 5,
        comment: "Fantastic! I saw visible growth within two weeks of use.",
      },
      {
        user: "Nikhil Singh",
        rating: 4,
        comment:
          "Really good results, but the smell is a bit strong initially.",
      },
    ],
  };

  const averageRating = (
    product.reviews.reduce((sum, review) => sum + review.rating, 0) /
    product.reviews.length
  ).toFixed(1); // Round to one decimal place

  const displayedReviews = product.reviews.slice(
    (page - 1) * reviewsPerPage,
    page * reviewsPerPage
  );

  function handlePageChange(
    event: React.ChangeEvent<unknown>,
    page: number
  ): void {
    setPage(page);
  }

  return (
    <Box sx={{ bgcolor: "#f5f5f5", p: 4 }}>
      {/* Product Overview */}
      <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
        {/* Image Carousel with Hover-to-Zoom */}
        <Box sx={{ flex: 1 }}>
          <Carousel indicators={false} navButtonsAlwaysVisible>
            {product.images.map((image, index) => (
              <Zoom key={index}>
                <Box
                  component="img"
                  src={image}
                  alt={`Urvaruka image ${index + 1}`}
                  sx={{
                    width: "100%",
                    height: "300px",
                    objectFit: "cover",
                    borderRadius: 2,
                  }}
                />
              </Zoom>
            ))}
          </Carousel>
        </Box>

        {/* Product Details */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
            {product.name}
          </Typography>
          <Typography variant="h6" sx={{ color: "text.secondary", mb: 3 }}>
            {product.tagline}
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
            <Rating
              value={parseFloat(averageRating)}
              readOnly
              precision={0.1}
            />
            <Typography variant="body2" sx={{ mt: 1 }}>
              {averageRating} out of 5 stars | {product.reviews.length} Reviews
            </Typography>
          </Stack>
          <Divider sx={{ my: 2 }} />
          <Typography
            variant="h5"
            sx={{
              color: "secondary.main",
              fontWeight: "bold",
              mb: 1,
            }}
          >
            ₹{product.price.discounted}{" "}
            <Typography
              component="span"
              variant="body2"
              sx={{
                textDecoration: "line-through",
                color: "gray",
                ml: 1,
              }}
            >
              ₹{product.price.original}
            </Typography>
            <Typography
              component="span"
              variant="body2"
              sx={{ ml: 1, color: "green" }}
            >
              (70% Off!)
            </Typography>
          </Typography>

          <Typography variant="body2" sx={{ mb: 2 }}>
            Free Shipping Across India.
          </Typography>
          <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
            {product.sizes.map((size) => (
              <Chip key={size} label={size} variant="outlined" />
            ))}
          </Stack>
          <Button
            variant="contained"
            color="primary"
            startIcon={<ShoppingCartIcon />}
            sx={{ borderRadius: 2, px: 4 }}
          >
            Buy Now
          </Button>
        </Box>
      </Stack>

      {/* Key Features */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          Key Features
        </Typography>
        <Stack direction="row" spacing={2} flexWrap="wrap">
          {product.features.map((feature, index) => (
            <Chip
              key={index}
              icon={feature.icon}
              label={feature.label}
              variant="outlined"
              sx={{ mb: 1 }}
            />
          ))}
        </Stack>
      </Box>

      {/* Product Description */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          Product Description
        </Typography>
        <Typography variant="body1">{product.description}</Typography>
      </Box>

      {/* Usage Instructions */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          Usage Instructions
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
          Application Rates:
        </Typography>
        <ul>
          <li>
            <Typography variant="body1">
              <strong>Indoor Plants:</strong> Mix{" "}
              <strong>50g of Urvaruka</strong> per liter of potting soil. Apply
              every <strong>4 weeks</strong> for best results.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>Outdoor Gardens:</strong> Use{" "}
              <strong>100g per square meter</strong>. Work it gently into the
              topsoil and water thoroughly after application.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>Large-Scale Crops:</strong> Apply{" "}
              <strong>200kg per hectare</strong> during planting or as a top
              dressing to improve soil health and crop yield.
            </Typography>
          </li>
        </ul>
        <Typography variant="h6" sx={{ fontWeight: "bold", mt: 3, mb: 1 }}>
          General Tips:
        </Typography>
        <ul>
          <li>
            <Typography variant="body1">
              Always store Urvaruka in a <strong>cool, dry place</strong> to
              maintain its effectiveness.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              Ensure the product is{" "}
              <strong>kept out of reach of children and pets</strong> for
              safety.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              Use <strong>gardening gloves</strong> while handling the product
              for convenience and hygiene.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              For maximum effectiveness, pair with regular watering and avoid
              over-fertilizing.
            </Typography>
          </li>
        </ul>
      </Box>

      {/* Technical Specifications */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          Technical Specifications
        </Typography>
        <Paper
          elevation={3}
          sx={{
            p: 2,
            bgcolor: "rgba(245, 240, 230, 0.7)",
            borderRadius: 2,
          }}
        >
          <Typography variant="body2">
            <strong>NPK Ratio:</strong> {product.nutritionalContent.NPK}
          </Typography>
          <Typography variant="body2">
            <strong>pH Range:</strong> {product.nutritionalContent.pH}
          </Typography>
          <Typography variant="body2">
            <strong>Organic Matter:</strong>{" "}
            {product.nutritionalContent.organicMatter}
          </Typography>
          <Typography variant="body2">
            <strong>Certifications:</strong> Certified 100% organic by the
            Indian Organic Board.
          </Typography>
          <Typography variant="body2">
            <strong>Microbial Boosters:</strong> Includes beneficial microbes
            for improved soil health.
          </Typography>
        </Paper>
      </Box>

      {/* Reviews Section */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          Customer Reviews
        </Typography>
        {displayedReviews.map((review, index) => (
          <Paper
            key={index}
            elevation={3}
            sx={{
              p: 2,
              mb: 2,
              bgcolor: "white",
              borderRadius: 2,
              boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Rating value={review.rating} readOnly />
              <Typography variant="h6">{review.user}</Typography>
            </Stack>
            <Typography variant="body2" sx={{ mt: 1 }}>
              {review.comment}
            </Typography>
          </Paper>
        ))}
        <Pagination
          count={Math.ceil(product.reviews.length / reviewsPerPage)}
          page={page}
          onChange={handlePageChange}
          sx={{ mt: 4, display: "flex", justifyContent: "center" }}
        />
      </Box>
    </Box>
  );
};

export default UrvarukaProduct;
