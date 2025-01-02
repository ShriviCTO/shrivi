import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  Stepper,
  Step,
  StepLabel,
  Modal,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  setModalOpen,
  updateProduct,
  resetProduct,
} from "../slices/productSlice";

const AddProductModal = () => {
  const dispatch = useDispatch();
  const productState = useSelector((state: RootState) => state.product);

  const [formErrors, setFormErrors] = useState<{
    name?: string;
    tagline?: string;
    description?: string;
    features?: string;
    image?: string;
  }>({});
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [activeStep, setActiveStep] = useState(0);

  const steps = ["General Info", "Key Features", "Image"];

  const handleInputChange = (field: string, value: any) => {
    dispatch(updateProduct({ [field]: value }));
  };

  const handleImageChange = (file: File) => {
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const validateImage = (file: File): Promise<string | null> => {
    return new Promise((resolve) => {
      const fileExtension = file.name.split(".").pop()?.toLowerCase();
      const allowedExtensions = ["jpg", "jpeg", "png"];
      const maxFileSize = 15 * 1024 * 1024; // 15 MB

      if (!allowedExtensions.includes(fileExtension || "")) {
        resolve("Only JPG, JPEG, or PNG files are allowed.");
      } else if (file.size > maxFileSize) {
        resolve("Image size must not exceed 15 MB.");
      } else {
        const img = new Image();
        img.onload = () => {
          const isMostlySquare =
            Math.abs(img.width - img.height) /
              Math.max(img.width, img.height) <=
            0.1;
          if (!isMostlySquare) {
            resolve("Image dimensions must be mostly squarish.");
          } else {
            resolve(null); // Valid image
          }
        };
        img.src = URL.createObjectURL(file);
      }
    });
  };

  const validateStep = async () => {
    const errors: Record<string, string> = {};

    if (activeStep === 0) {
      if (!productState.name) {
        errors.name = "Product name is required.";
      } else if (!/^[a-zA-Z0-9\s\-]+$/.test(productState.name)) {
        errors.name = "Only alphanumeric characters and hyphens are allowed.";
      } else if (
        productState.name.length < 4 ||
        productState.name.length > 25
      ) {
        errors.name = "Product name must be between 4 and 25 characters.";
      }

      if (!productState.tagline) {
        errors.tagline = "Tagline is required.";
      } else if (productState.tagline.length > 140) {
        errors.tagline = "Tagline cannot exceed 140 characters.";
      }

      if (!productState.description) {
        errors.description = "Description is required.";
      }
    } else if (activeStep === 1) {
      if (productState.features.some((f: any) => !f.label)) {
        errors.features = "All key features must have labels.";
      }
    } else if (activeStep === 2) {
      if (!image) {
        errors.image = "Please upload an image.";
      } else {
        const error = await validateImage(image);
        if (error) {
          errors.image = error;
        }
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = async () => {
    if (await validateStep()) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    if (await validateStep()) {
      alert("Product submitted successfully!");
      dispatch(setModalOpen(false));
    }
  };

  return (
    <Modal
      open={productState.isOpen}
      onClose={() => dispatch(setModalOpen(false))}
      aria-labelledby="add-product-modal"
      aria-describedby="add-product-modal-description"
    >
      <Box
        sx={{
          width: "90%",
          maxWidth: "600px",
          bgcolor: "white",
          p: 4,
          borderRadius: 2,
          mx: "auto",
          mt: "5%",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
        }}
      >
        <Typography variant="h5" sx={{ mb: 3 }}>
          Add / Edit Product
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === 0 && (
          <Box>
            <TextField
              label="Name"
              fullWidth
              value={productState.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              error={!!formErrors.name}
              helperText={formErrors.name}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Tagline"
              fullWidth
              value={productState.tagline}
              onChange={(e) => handleInputChange("tagline", e.target.value)}
              error={!!formErrors.tagline}
              helperText={formErrors.tagline}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={3}
              value={productState.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              error={!!formErrors.description}
              helperText={formErrors.description}
              sx={{ mb: 2 }}
            />
          </Box>
        )}

        {activeStep === 1 && <Box>{/* Key Features Input */}</Box>}

        {activeStep === 2 && (
          <Box>
            <Button variant="contained" component="label" sx={{ mb: 2 }}>
              Upload Image
              <input
                type="file"
                accept="image/jpeg, image/png"
                hidden
                onChange={(e) =>
                  e.target.files && handleImageChange(e.target.files[0])
                }
              />
            </Button>
            {imagePreview && (
              <Box>
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{ maxWidth: "100%", maxHeight: "300px" }}
                />
              </Box>
            )}
            {formErrors.image && (
              <Typography color="error">{formErrors.image}</Typography>
            )}
          </Box>
        )}

        <Divider sx={{ my: 3 }} />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            variant="contained"
            color="secondary"
          >
            Back
          </Button>
          {activeStep === steps.length - 1 ? (
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddCircleIcon />}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          ) : (
            <Button variant="contained" onClick={handleNext}>
              Next
            </Button>
          )}
          <Button
            variant="outlined"
            color="error"
            startIcon={<CancelIcon />}
            onClick={() => dispatch(setModalOpen(false))}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddProductModal;
