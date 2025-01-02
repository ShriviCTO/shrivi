import { Box, Typography, Divider } from "@mui/material";
import Carousel from "react-material-ui-carousel"; // Ensure Carousel is imported
import Zoom from "react-medium-image-zoom"; // Ensure Zoom is imported
import "react-medium-image-zoom/dist/styles.css"; // Ensure Zoom styles are included
import { Rating, Chip, Button, Stack } from "@mui/material"; // Additional Material UI components
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RecyclingIcon from "@mui/icons-material/Recycling";
import PetsIcon from "@mui/icons-material/Pets";
import StarIcon from "@mui/icons-material/Star";
import Tooltip from "@mui/material/Tooltip";
import Link from "@mui/material/Link";

interface Product {
  name: string;
  tagline: string;
  images: { url: string; altText?: string }[];
  features: { icon: string; label: string }[];
  customerReviews: { rating: number }[];
  sizes: { label: string; stock: number; price: number }[];
  discount?: number;
  // Add other properties as needed
}

interface HeroSectionProps {
  product: Product;
  onBuyNowClick: () => void;
  onReviewsClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  product,
  onBuyNowClick,
  onReviewsClick,
}) => {
  const computeAverageRating = (reviews: { rating: number }[]): string =>
    reviews.length
      ? (
          reviews.reduce(
            (sum: number, review: { rating: number }) => sum + review.rating,
            0
          ) / reviews.length
        ).toFixed(1)
      : "No Reviews";

  return (
    <Box sx={{ bgcolor: "#f5f5f5", p: 4 }}>
      <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
        {/* Image Carousel with Hover-to-Zoom */}
        <Box sx={{ flex: 1 }}>
          <Carousel indicators={false} navButtonsAlwaysVisible>
            {product.images.map(
              (image: { url: string; altText?: string }, index: number) => (
                <Zoom key={index}>
                  <Box
                    component="img"
                    src={image.url}
                    alt={image.altText || `Product image ${index + 1}`}
                    sx={{
                      width: "100%",
                      height: "300px",
                      objectFit: "cover",
                      borderRadius: 2,
                    }}
                  />
                </Zoom>
              )
            )}
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

          {/* Rating */}
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
            <Rating
              value={parseFloat(computeAverageRating(product.customerReviews))}
              readOnly
              precision={0.1}
            />
            <Typography variant="body2" sx={{ mt: 1 }}>
              {computeAverageRating(product.customerReviews)} out of 5 stars |{" "}
              <Tooltip title="Click to view all reviews">
                <Link
                  component="button"
                  onClick={onReviewsClick}
                  sx={{
                    textDecoration: "none",
                    cursor: "pointer",
                    color: "primary.main",
                    fontWeight: "bold",
                  }}
                >
                  {product.customerReviews.length} Reviews
                </Link>
              </Tooltip>
            </Typography>
          </Stack>

          <Divider sx={{ my: 2 }} />

          {/* Price Details */}
          <Typography
            variant="h5"
            sx={{
              color: "secondary.main",
              fontWeight: "bold",
              mb: 1,
            }}
          >
            ₹{product.sizes[0]?.price}{" "}
            {product.discount && (
              <>
                <Typography
                  component="span"
                  variant="body2"
                  sx={{
                    textDecoration: "line-through",
                    color: "gray",
                    ml: 1,
                  }}
                >
                  ₹
                  {Math.round(
                    product.sizes[0]?.price / (1 - product.discount / 100)
                  )}
                </Typography>
                <Typography
                  component="span"
                  variant="body2"
                  sx={{ ml: 1, color: "green" }}
                >
                  ({product.discount}% Off!)
                </Typography>
              </>
            )}
          </Typography>

          {/* Free Shipping Text */}
          <Typography variant="body2" sx={{ mb: 2 }}>
            Free Shipping Across India.
          </Typography>

          {/* Sizes */}
          <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
            {product.sizes.map((size: { label: string; stock: number }) => (
              <Chip
                key={size.label}
                label={`${size.label} (${size.stock} in stock)`}
                variant="outlined"
              />
            ))}
          </Stack>

          {/* Key Features */}
          {product.features.map(
            (feature: { icon: string; label: string }, index: number) => (
              <Chip
                key={index}
                icon={
                  feature.icon === "recycling" ? (
                    <RecyclingIcon />
                  ) : feature.icon === "pets" ? (
                    <PetsIcon />
                  ) : feature.icon === "star" ? (
                    <StarIcon />
                  ) : (
                    <></> // Return an empty fragment if no icon matches
                  )
                }
                label={feature.label}
                variant="outlined"
                sx={{ mb: 1 }}
              />
            )
          )}
        </Box>
      </Stack>
      {/* Buy Now Button */}
      <Button
        variant="contained"
        color="primary"
        startIcon={<ShoppingCartIcon />}
        sx={{ borderRadius: 2, px: 4 }}
        onClick={onBuyNowClick}
      >
        Buy Now
      </Button>
    </Box>
  );
};

export default HeroSection;
