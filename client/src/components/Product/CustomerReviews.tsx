import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Divider,
  Stack,
  Rating,
  Button,
  Avatar,
  TextField,
  Grid,
} from "@mui/material";

interface Review {
  userId: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

interface Product {
  customerReviews: Review[];
}

interface CustomerReviewsProps {
  product: Product;
}

const CustomerReviews: React.FC<CustomerReviewsProps> = ({ product }) => {
  const reviewsPerPage = 6; // Number of reviews to show per page
  const [currentPage, setCurrentPage] = useState(1);
  const [newReview, setNewReview] = useState({
    user: "",
    rating: 0,
    comment: "",
  });
  const [allReviews, setAllReviews] = useState(
    [...product.customerReviews].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
  );

  const totalPages = Math.ceil(allReviews.length / reviewsPerPage);
  const displayedReviews = allReviews.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage
  );

  const bestReviews = allReviews.filter((review) => review.rating === 5);
  const notSoGoodReviews = allReviews.filter((review) => review.rating < 3);

  const averageRating =
    allReviews.reduce((acc, review) => acc + review.rating, 0) /
    allReviews.length;

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  const handleRatingChange = (
    e: React.SyntheticEvent,
    value: number | null
  ) => {
    setNewReview({ ...newReview, rating: value || 0 });
  };

  const handleSubmit = () => {
    if (newReview.user && newReview.rating && newReview.comment) {
      setAllReviews([
        {
          userId: `${Date.now()}`,
          ...newReview,
          date: new Date().toLocaleDateString(),
        },
        ...allReviews,
      ]);
      setNewReview({ user: "", rating: 0, comment: "" });
      setCurrentPage(1);
    }
  };

  return (
    <Paper sx={{ p: 4, mb: 4 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Customer Reviews
      </Typography>
      <Divider sx={{ mb: 2 }} />

      {/* Summary */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Summary
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <Rating value={averageRating} readOnly precision={0.1} />
          <Typography variant="body2">
            {averageRating.toFixed(1)} out of 5 stars | {allReviews.length}{" "}
            Reviews
          </Typography>
        </Stack>
      </Box>

      {/* Good Reviews */}
      {bestReviews.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }} color="primary">
            🌟 Best Reviews
          </Typography>
          <Grid container spacing={2}>
            {bestReviews.slice(0, 2).map((review) => (
              <Grid item xs={12} sm={6} key={review.userId}>
                <Paper sx={{ p: 2, borderRadius: 2 }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar sx={{ bgcolor: "primary.main" }}>
                      {review.user.charAt(0).toUpperCase()}
                    </Avatar>
                    <Box>
                      <Typography variant="h6">{review.user}</Typography>
                      <Rating value={review.rating} readOnly precision={0.1} />
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        {review.date}
                      </Typography>
                    </Box>
                  </Stack>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {review.comment}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Not-So-Good Reviews */}
      {notSoGoodReviews.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }} color="error">
            😞 Not-So-Good Reviews
          </Typography>
          <Grid container spacing={2}>
            {notSoGoodReviews.slice(0, 2).map((review) => (
              <Grid item xs={12} sm={6} key={review.userId}>
                <Paper sx={{ p: 2, borderRadius: 2 }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar sx={{ bgcolor: "error.main" }}>
                      {review.user.charAt(0).toUpperCase()}
                    </Avatar>
                    <Box>
                      <Typography variant="h6">{review.user}</Typography>
                      <Rating value={review.rating} readOnly precision={0.1} />
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        {review.date}
                      </Typography>
                    </Box>
                  </Stack>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {review.comment}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* All Reviews */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        All Reviews
      </Typography>
      <Grid container spacing={2}>
        {displayedReviews.map((review) => (
          <Grid item xs={12} sm={6} md={4} key={review.userId}>
            <Paper sx={{ p: 2, borderRadius: 2, height: "100%" }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar sx={{ bgcolor: "primary.main" }}>
                  {review.user.charAt(0).toUpperCase()}
                </Avatar>
                <Box>
                  <Typography variant="h6">{review.user}</Typography>
                  <Rating value={review.rating} readOnly precision={0.1} />
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {review.date}
                  </Typography>
                </Box>
              </Stack>
              <Typography variant="body2" sx={{ mt: 1 }}>
                {review.comment}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      {allReviews.length > reviewsPerPage && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 4,
          }}
        >
          <Button
            variant="outlined"
            onClick={handlePrevious}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Typography>
            Page {currentPage} of {totalPages}
          </Typography>
          <Button
            variant="outlined"
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </Box>
      )}

      {/* Feedback Form */}
      <Box
        sx={{
          mt: 4,
          p: 3,
          bgcolor: "background.default",
          borderRadius: 2,
          boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Leave a Review
        </Typography>
        <Stack spacing={2}>
          <TextField
            label="Your Name"
            variant="outlined"
            name="user"
            value={newReview.user}
            onChange={handleInputChange}
            fullWidth
          />
          <Rating
            name="rating"
            value={newReview.rating}
            onChange={handleRatingChange}
          />
          <TextField
            label="Your Feedback"
            variant="outlined"
            name="comment"
            value={newReview.comment}
            onChange={handleInputChange}
            multiline
            rows={3}
            fullWidth
          />
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
};

export default CustomerReviews;
