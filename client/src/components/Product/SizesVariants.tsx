import { Box, Typography, Paper, Grid, Button } from "@mui/material";

interface ProductSize {
  price: number;
  productId: string;
  label: string;
  packaging: string;
  description: string;
}

interface BundleOption {
  name: string;
  image: string;
  description: string;
  price: number;
  discount: number;
  items: string[];
}

interface Product {
  sizes: ProductSize[];
  bundleOptions?: BundleOption[];
  discount?: number;
}

interface SizesVariantsProps {
  product: Product;
}

const SizesVariants: React.FC<SizesVariantsProps> = ({ product }) => {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Sizes & Variants
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "stretch",
        }}
      >
        {product.sizes.map((size) => {
          const discountedPrice =
            size.price - (size.price * (product.discount || 0)) / 100;
          return (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              key={size.productId}
              sx={{ display: "flex" }}
            >
              <Paper
                elevation={3}
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                  textAlign: "center",
                  borderRadius: 2,
                  height: "100%",
                  gap: 2,
                }}
              >
                {/* Size Label */}
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                  {size.label}
                </Typography>

                {/* Packaging Info */}
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", mb: 1 }}
                >
                  {size.packaging}
                </Typography>

                {/* Description */}
                <Typography variant="body2" sx={{ mb: 2 }}>
                  {size.description}
                </Typography>

                {/* Pricing */}
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    color: "secondary.main",
                    mb: 2,
                  }}
                >
                  ₹{discountedPrice.toFixed(2)}
                  <Typography
                    component="span"
                    variant="body2"
                    sx={{
                      textDecoration: "line-through",
                      color: "gray",
                      ml: 1,
                    }}
                  >
                    ₹{size.price.toFixed(2)}
                  </Typography>
                </Typography>

                {/* Quantity Selector */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                    mb: 2,
                  }}
                >
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => console.log("Decrement count")}
                  >
                    -
                  </Button>
                  <Typography variant="body1" sx={{ mx: 1 }}>
                    1
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => console.log("Increment count")}
                  >
                    +
                  </Button>
                </Box>

                {/* Add to Cart Button */}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => console.log(`Add ${size.label} to cart`)}
                  fullWidth
                >
                  Add to Cart
                </Button>
              </Paper>
            </Grid>
          );
        })}

        {/* Bundles and Offers */}
        {product.bundleOptions?.length ? (
          <Grid item xs={12}>
            <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
              Bundles & Offers
            </Typography>
            <Grid
              container
              spacing={4} // Adjust spacing between cards
              sx={{
                justifyContent: "center",
                alignItems: "stretch", // Ensure equal height cards
              }}
            >
              {product.bundleOptions.map((bundle, index) => {
                const discountedPrice =
                  bundle.price - (bundle.price * bundle.discount) / 100;
                return (
                  <Grid
                    item
                    xs={12} // Full width on small screens
                    sm={6} // Two columns on medium screens
                    md={4} // Three columns on large screens
                    lg={3} // Four columns on extra-large screens
                    key={index}
                  >
                    <Paper
                      elevation={3}
                      sx={{
                        p: 3,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        alignItems: "center",
                        textAlign: "center",
                        borderRadius: 2,
                        height: "100%", // Consistent height for all cards
                        gap: 2, // Consistent spacing between card elements
                      }}
                    >
                      {/* Bundle Image */}
                      <Box
                        sx={{
                          width: "100%",
                          height: "150px",
                          borderRadius: 2,
                          overflow: "hidden",
                          mb: 2,
                          boxShadow: 1,
                        }}
                      >
                        <img
                          src={
                            bundle.image || "/placeholder-image.png" // Use placeholder if no image URL
                          }
                          alt={bundle.name}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </Box>

                      {/* Bundle Name */}
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", mb: 1 }}
                      >
                        {bundle.name}
                      </Typography>

                      {/* Bundle Description */}
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary", mb: 1 }}
                      >
                        {bundle.description}
                      </Typography>

                      {/* Bundle Items */}
                      <Typography variant="body2" sx={{ mb: 2 }}>
                        Includes: {bundle.items.join(", ")}
                      </Typography>

                      {/* Pricing */}
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                          color: "secondary.main",
                          mb: 2,
                        }}
                      >
                        ₹{discountedPrice.toFixed(2)}
                        <Typography
                          component="span"
                          variant="body2"
                          sx={{
                            textDecoration: "line-through",
                            color: "gray",
                            ml: 1,
                          }}
                        >
                          ₹{bundle.price.toFixed(2)}
                        </Typography>
                      </Typography>

                      {/* Add to Cart Button */}
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() =>
                          console.log(`Add ${bundle.name} to cart`)
                        }
                        fullWidth
                      >
                        Add to Cart
                      </Button>
                    </Paper>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        ) : null}
      </Grid>
    </Box>
  );
};

export default SizesVariants;
