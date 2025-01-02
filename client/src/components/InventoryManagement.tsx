import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  IconButton,
  Tooltip,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Divider,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { setModalOpen } from "../slices/productSlice";
import AddProductModal from "./AddProductModal";

const InventoryManagement = () => {
  const dispatch = useDispatch();
  const initialData = [
    {
      id: 1,
      product: "Product A",
      tagline: "Tagline A",
      description: "Description of Product A",
      keyFeatures: [
        { icon: "RecyclingIcon", label: "Eco-Friendly" },
        { icon: "StarIcon", label: "Top Quality" },
      ],
      primaryImage: "/images/product-a.jpg",
    },
    {
      id: 2,
      product: "Product B",
      tagline: "Tagline B",
      description: "Description of Product B",
      keyFeatures: [
        { icon: "PetsIcon", label: "Pet Safe" },
        { icon: "StarIcon", label: "Highly Rated" },
      ],
      primaryImage: "/images/product-b.jpg",
    },
  ];

  const predefinedIcons = [
    { value: "RecyclingIcon", label: "Recycling Icon" },
    { value: "StarIcon", label: "Star Icon" },
    { value: "PetsIcon", label: "Pets Icon" },
    { value: "ShoppingCartIcon", label: "Shopping Cart Icon" },
    { value: "Custom", label: "Custom Icon" },
  ];

  const [data, setData] = useState(initialData);
  const [filter, setFilter] = useState("");
  const [expanded, setExpanded] = useState<number | false>(false);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value.toLowerCase());
  };

  const handleAccordionChange = (panel: number) => {
    setExpanded(expanded === panel ? false : panel);
  };

  const filteredData = data.filter((item) =>
    item.product.toLowerCase().includes(filter)
  );

  const handleAddProduct = () => {
    dispatch(setModalOpen(true));
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Inventory Management
      </Typography>

      <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2 }}>
        <TextField
          label="Filter Products"
          variant="outlined"
          size="small"
          onChange={handleFilterChange}
        />
        <Button
          variant="contained"
          startIcon={<AddCircleIcon />}
          sx={{ mb: 2 }}
          onClick={handleAddProduct}
        >
          Add Product
        </Button>
      </Box>

      <Paper
        sx={{
          p: 3,
          borderRadius: 2,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          bgcolor: "white",
        }}
      >
        {filteredData.map((item, index) => (
          <Accordion
            key={item.id}
            expanded={expanded === index}
            onChange={() => handleAccordionChange(index)}
            sx={{ mb: 2 }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel-${index}-content`}
              id={`panel-${index}-header`}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  width: "100%",
                }}
              >
                <Box
                  component="img"
                  src={item.primaryImage}
                  alt={`${item.product} Image`}
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
                <Typography sx={{ flexGrow: 1 }}>{item.product}</Typography>
                <Typography variant="body2">{item.tagline}</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Description:
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                {item.description}
              </Typography>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Key Features:
              </Typography>
              <TableContainer>
                <Table>
                  <TableBody>
                    {item.keyFeatures.map((feature, i) => (
                      <TableRow key={i}>
                        <TableCell>{feature.icon}</TableCell>
                        <TableCell>{feature.label}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
                <Tooltip title="Edit Product">
                  <IconButton
                    color="primary"
                    onClick={() => alert(`Editing ${item.product}`)}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete Product">
                  <IconButton
                    color="error"
                    onClick={() => alert(`Deleting ${item.product}`)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </Paper>
      <AddProductModal />
    </Box>
  );
};

export default InventoryManagement;
