import React, { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  BottomNavigation,
  BottomNavigationAction,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import SummaryView from "../components/SummaryView";
import InventoryManagement from "../components/InventoryManagement";
import UserManagement from "../components/UserManagement";
import ReportsView from "../components/ReportsView";

const Dashboard: React.FC = () => {
  const [selectedView, setSelectedView] = useState("summary");
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleViewChange = (view: string) => {
    setSelectedView(view);
  };

  const renderContent = (selectedView: string) => {
    switch (selectedView) {
      case "summary":
        return <SummaryView />;
      case "inventory":
        return <InventoryManagement />;
      case "users":
        return <UserManagement />;
      case "reports":
        return <ReportsView />;
      default:
        return <Typography>Invalid view</Typography>;
    }
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      {isSmallScreen ? (
        // Bottom Navigation for Small Screens
        <BottomNavigation
          value={selectedView}
          onChange={(event, newValue) => handleViewChange(newValue)}
          showLabels
          sx={{
            position: "fixed",
            bottom: 0,
            width: "100%",
            bgcolor: "primary.main",
            color: "white",
          }}
        >
          <BottomNavigationAction
            label="Summary"
            value="summary"
            icon={<DashboardIcon />}
            sx={{
              color: selectedView === "summary" ? "secondary.main" : "white",
            }}
          />
          <BottomNavigationAction
            label="Inventory"
            value="inventory"
            icon={<InventoryIcon />}
            sx={{
              color: selectedView === "inventory" ? "secondary.main" : "white",
            }}
          />
          <BottomNavigationAction
            label="Users"
            value="users"
            icon={<PeopleIcon />}
            sx={{
              color: selectedView === "users" ? "secondary.main" : "white",
            }}
          />
          <BottomNavigationAction
            label="Reports"
            value="reports"
            icon={<BarChartIcon />}
            sx={{
              color: selectedView === "reports" ? "secondary.main" : "white",
            }}
          />
        </BottomNavigation>
      ) : (
        // Sidebar for Larger Screens
        <Box
          sx={{
            width: 250,
            bgcolor: "primary.main",
            color: "white",
            display: "flex",
            flexDirection: "column",
            p: 3,
          }}
        >
          <Typography variant="h5" sx={{ mb: 4, fontWeight: "bold" }}>
            Dashboard
          </Typography>
          <List>
            <ListItem
              component="div"
              onClick={() => handleViewChange("summary")}
              sx={{
                bgcolor:
                  selectedView === "summary" ? "secondary.main" : "inherit",
                borderRadius: 1,
                mb: 1,
                cursor: "pointer",
              }}
            >
              <ListItemIcon>
                <DashboardIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Summary" />
            </ListItem>
            <ListItem
              component="div"
              onClick={() => handleViewChange("inventory")}
              sx={{
                bgcolor:
                  selectedView === "inventory" ? "secondary.main" : "inherit",
                borderRadius: 1,
                mb: 1,
                cursor: "pointer",
              }}
            >
              <ListItemIcon>
                <InventoryIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Inventory" />
            </ListItem>
            <ListItem
              component="div"
              onClick={() => handleViewChange("users")}
              sx={{
                bgcolor:
                  selectedView === "users" ? "secondary.main" : "inherit",
                borderRadius: 1,
                mb: 1,
                cursor: "pointer",
              }}
            >
              <ListItemIcon>
                <PeopleIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItem>
            <ListItem
              component="div"
              onClick={() => handleViewChange("reports")}
              sx={{
                bgcolor:
                  selectedView === "reports" ? "secondary.main" : "inherit",
                borderRadius: 1,
                mb: 1,
                cursor: "pointer",
              }}
            >
              <ListItemIcon>
                <BarChartIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Reports" />
            </ListItem>
          </List>
        </Box>
      )}

      {/* Main Content */}
      <Box sx={{ flex: 1, p: 4 }}>{renderContent(selectedView)}</Box>
    </Box>
  );
};

export default Dashboard;
