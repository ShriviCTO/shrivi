import React from "react";
import { Box, Typography, Divider, Paper } from "@mui/material";
import ReactMarkdown, { Components } from "react-markdown";

interface Product {
  description: string;
  nutritionalContent: string;
  usageInstructions: string;
  certifications: string;
  environmentalImpact: string;
  faqs: string;
}

interface ProductDescriptionProps {
  product: Product;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({ product }) => {
  const markdownComponents: Components = {
    h1: ({ children }) => (
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
        {children as React.ReactNode}
      </Typography>
    ),
    h2: ({ children }) => (
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
        {children as React.ReactNode}
      </Typography>
    ),
    p: ({ children }) => (
      <Typography variant="body1" sx={{ color: "text.secondary", mb: 1 }}>
        {children as React.ReactNode}
      </Typography>
    ),
    ul: ({ children }) => (
      <Box component="ul" sx={{ pl: 2, mb: 2 }}>
        {children as React.ReactNode}
      </Box>
    ),
    li: ({ children }) => (
      <Box component="li" sx={{ mb: 1 }}>
        <Typography variant="body1">{children as React.ReactNode}</Typography>
      </Box>
    ),
    blockquote: ({ children }) => (
      <Box
        component="blockquote"
        sx={{
          borderLeft: "4px solid #ddd",
          pl: 2,
          color: "text.secondary",
          fontStyle: "italic",
          mb: 2,
        }}
      >
        <Typography variant="body2">{children as React.ReactNode}</Typography>
      </Box>
    ),
  };

  return (
    <Paper sx={{ p: 4, mb: 4, bgcolor: "secondary.light" }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 4,
        }}
      >
        {/* Product Description */}
        {product.description && (
          <Box
            sx={{
              border: "1px solid #ddd",
              borderRadius: 2,
              p: 2,
              bgcolor: "background.paper",
              gridColumn: { xs: "span 1", md: "span 2" },
            }}
          >
            <Typography variant="h3" sx={{ mb: 2 }}>
              Product Description
            </Typography>
            <Divider />
            <Box sx={{ mt: 2 }}>
              <ReactMarkdown components={markdownComponents}>
                {product.description}
              </ReactMarkdown>
            </Box>
          </Box>
        )}

        {/* Usage Instructions */}
        {product.usageInstructions && (
          <Box
            sx={{
              border: "1px solid #ddd",
              borderRadius: 2,
              p: 2,
              bgcolor: "background.paper",
            }}
          >
            <Typography variant="h3" sx={{ mb: 2 }}>
              Usage Instructions
            </Typography>
            <Divider />
            <Box sx={{ mt: 2 }}>
              <ReactMarkdown components={markdownComponents}>
                {product.usageInstructions}
              </ReactMarkdown>
            </Box>
          </Box>
        )}

        {/* Nutritional Content */}
        {product.nutritionalContent && (
          <Box
            sx={{
              border: "1px solid #ddd",
              borderRadius: 2,
              p: 2,
              bgcolor: "background.paper",
            }}
          >
            <Typography variant="h3" sx={{ mb: 2 }}>
              Nutritional Content
            </Typography>
            <Divider />
            <Box sx={{ mt: 2 }}>
              <ReactMarkdown components={markdownComponents}>
                {product.nutritionalContent}
              </ReactMarkdown>
            </Box>
          </Box>
        )}

        {/* Certifications */}
        {product.certifications && (
          <Box
            sx={{
              border: "1px solid #ddd",
              borderRadius: 2,
              p: 2,
              bgcolor: "background.paper",
              gridColumn: { xs: "span 1", md: "span 2" },
            }}
          >
            <Typography variant="h3" sx={{ mb: 2 }}>
              Certifications
            </Typography>
            <Divider />
            <Box sx={{ mt: 2 }}>
              <ReactMarkdown components={markdownComponents}>
                {product.certifications}
              </ReactMarkdown>
            </Box>
          </Box>
        )}

        {/* Environmental Impact */}
        {product.environmentalImpact && (
          <Box
            sx={{
              border: "1px solid #ddd",
              borderRadius: 2,
              p: 2,
              bgcolor: "background.paper",
              gridColumn: { xs: "span 1", md: "span 2" },
            }}
          >
            <Typography variant="h3" sx={{ mb: 2 }}>
              Environmental Impact
            </Typography>
            <Divider />
            <Box sx={{ mt: 2 }}>
              <ReactMarkdown components={markdownComponents}>
                {product.environmentalImpact}
              </ReactMarkdown>
            </Box>
          </Box>
        )}

        {/* FAQ Section */}
        {product.faqs && (
          <Box
            sx={{
              border: "1px solid #ddd",
              borderRadius: 2,
              p: 2,
              bgcolor: "background.paper",
              gridColumn: { xs: "span 1", md: "span 2" },
            }}
          >
            <Typography variant="h3" sx={{ mb: 2 }}>
              Frequently Asked Questions
            </Typography>
            <Divider />
            <Box sx={{ mt: 2 }}>
              <ReactMarkdown components={markdownComponents}>
                {product.faqs}
              </ReactMarkdown>
            </Box>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default ProductDescription;
