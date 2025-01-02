import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Divider,
  Tabs,
  Tab,
  Grid,
} from "@mui/material";
import { useSpring, animated } from "@react-spring/web";

interface AnimatedNumberProps {
  value: number;
}

const AnimatedNumber = ({ value }: AnimatedNumberProps) => {
  const { number } = useSpring({
    from: { number: 0 },
    to: { number: value },
    config: { duration: 2000 },
  });

  return (
    <animated.div>
      {number.to((n) => Math.floor(n).toLocaleString())}
    </animated.div>
  );
};

const SummaryView = () => {
  const [selectedFilter, setSelectedFilter] = useState<number>(0);

  const filters = [
    { label: "This Calendar Month", value: "thisMonth" },
    { label: "Last 30 Days", value: "last30days" },
    { label: "Last 60 Days", value: "last60days" },
    { label: "Last 90 Days", value: "last90days" },
  ];

  const handleFilterChange = (
    event: React.SyntheticEvent,
    newValue: number
  ): void => {
    setSelectedFilter(newValue);
    // Placeholder for logic to fetch or filter data based on selected tab
    console.log(`Selected Filter: ${filters[newValue].value}`);
  };

  const analyticsCards = [
    { label: "Total Sales", value: 125000, color: "#FFB74D" },
    { label: "Net Profit", value: 50000, color: "#81C784" },
    { label: "Expenses", value: 75000, color: "#E57373" },
    {
      label: "Revenue Growth",
      value: 15,
      color: "#4DB6AC",
      isPercentage: true,
    },
    { label: "Inventory Level", value: 540, color: "#64B5F6" },
    { label: "Pending Orders", value: 25, color: "#FFB74D" },
    { label: "Shipped Orders", value: 120, color: "#81C784" },
    { label: "Returned Items", value: 3, color: "#E57373", isPercentage: true },
    { label: "Pending Claims", value: 12, color: "#FFB74D" },
    { label: "Resolved Claims", value: 150, color: "#81C784" },
    { label: "Claim Payouts", value: 30000, color: "#4DB6AC" },
    { label: "Rejected Claims", value: 5, color: "#E57373" },
    {
      label: "Attendance Rate",
      value: 85,
      color: "#4DB6AC",
      isPercentage: true,
    },
    { label: "Active Employees", value: 120, color: "#FFB74D" },
    { label: "New Hires", value: 5, color: "#81C784" },
    { label: "Open Positions", value: 3, color: "#E57373" },
  ];

  const categories = {
    Financials: analyticsCards.slice(0, 4),
    Operations: analyticsCards.slice(4, 8),
    Claims: analyticsCards.slice(8, 12),
    "Personnel Management": analyticsCards.slice(12),
  };

  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Summary
        </Typography>
        <Tabs
          value={selectedFilter}
          onChange={handleFilterChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
          {filters.map((filter, index) => (
            <Tab key={index} label={filter.label} />
          ))}
        </Tabs>
      </Box>

      {Object.entries(categories).map(([category, cards], idx) => (
        <React.Fragment key={idx}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            {category}
          </Typography>
          <Grid container spacing={2}>
            {cards.map((card, index) => (
              <Grid
                key={index}
                xs={12}
                sm={6}
                md={3}
                sx={{
                  display: "flex",
                  alignItems: "stretch",
                }}
              >
                <Paper
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    textAlign: "center",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    bgcolor: "white",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0 6px 16px rgba(0, 0, 0, 0.2)",
                    },
                    flex: 1,
                  }}
                >
                  <Typography variant="h6" sx={{ color: "gray", mb: 1 }}>
                    {card.label}
                  </Typography>
                  <Typography
                    variant="h4"
                    component="div"
                    sx={{
                      fontWeight: "bold",
                      color: card.color,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "baseline",
                    }}
                  >
                    <AnimatedNumber value={card.value} />
                    {card.isPercentage && (
                      <Typography variant="h6">%</Typography>
                    )}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
          {idx < Object.keys(categories).length - 1 && (
            <Divider sx={{ my: 4 }} />
          )}
        </React.Fragment>
      ))}
    </>
  );
};

export default SummaryView;
