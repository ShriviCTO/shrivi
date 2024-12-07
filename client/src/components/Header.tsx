import React from "react";
import { useLocation, Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about-us" },
  { label: "Products", path: "/products" },
  { label: "Blog", path: "/blog" },
  { label: "FAQ", path: "/faq" },
  { label: "Contact", path: "/contact" },
];

const Header: React.FC = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const location = useLocation(); // Get the current route path

  // Open and close the mobile menu
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "primary.main" }}>
      <Toolbar
        sx={{
          justifyContent: "space-between",
          px: 2, // Padding for the toolbar
        }}
      >
        {/* Logo and name */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* Logo redirects to home unless already on home */}
          <IconButton
            component={location.pathname === "/" ? "div" : Link}
            to="/"
            sx={{ cursor: location.pathname === "/" ? "default" : "pointer" }}
            disableRipple={location.pathname === "/"} // No ripple effect if on the home page
          >
            <Avatar
              src="/logo192.png"
              alt="Shrivi Organics Logo"
              sx={{
                width: 40,
                height: 40,
                bgcolor: "white",
                mr: { md: 2 }, // Margin-right for space on md and higher screens
              }}
            />
          </IconButton>
          <Typography
            variant="h5"
            sx={{
              fontFamily: "'Dancing Script', cursive",
              fontWeight: "bold",
              color: "white",
              textAlign: { xs: "center", md: "left" },
              display: { xs: "none", md: "block" }, // Show only on md and above
              fontSize: { xs: "1.5rem", md: "2rem" }, // Explicitly set font size (smaller for xs, larger for md)
            }}
          >
            Shrivi Organics
          </Typography>
        </Box>

        {/* Centered Name on Smaller Screens */}
        <Typography
          variant="h5"
          sx={{
            fontFamily: "'Dancing Script', cursive",
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
            flexGrow: 1,
            display: { xs: "block", md: "none" }, // Show only on smaller screens
            fontSize: "1.8rem", // Slightly larger font size for small screens
          }}
        >
          Shrivi Organics
        </Typography>

        {/* Desktop navigation links */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" }, // Hide on smaller screens
            gap: 2, // Space between buttons
          }}
        >
          {navLinks.map((link) => (
            <Button
              key={link.label}
              component={location.pathname === link.path ? "div" : Link} // Disable click for the current page
              to={link.path}
              sx={{
                color:
                  location.pathname === link.path ? "secondary.main" : "white", // Highlight current page
                fontWeight: location.pathname === link.path ? "bold" : "normal", // Bold for active page
                textTransform: "none", // Keep natural casing
                pointerEvents:
                  location.pathname === link.path ? "none" : "auto", // Disable pointer for the current page
                cursor: location.pathname === link.path ? "default" : "pointer", // Show pointer only for non-current pages
              }}
            >
              {link.label}
            </Button>
          ))}
        </Box>

        {/* Mobile menu icon */}
        <Box
          sx={{
            display: { xs: "flex", md: "none" }, // Show only on smaller screens
          }}
        >
          <IconButton
            size="large"
            aria-label="menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon fontSize="large" />
          </IconButton>
          {/* Mobile menu */}
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
          >
            {navLinks.map((link) => (
              <MenuItem
                key={link.label}
                component={location.pathname === link.path ? "div" : Link} // Disable click for the current page
                to={link.path}
                onClick={handleCloseNavMenu}
                sx={{
                  fontWeight:
                    location.pathname === link.path ? "bold" : "normal", // Bold for active page
                  color:
                    location.pathname === link.path
                      ? "secondary.main"
                      : "inherit", // Highlight current page
                  pointerEvents:
                    location.pathname === link.path ? "none" : "auto", // Disable pointer for the current page
                  cursor:
                    location.pathname === link.path ? "default" : "pointer", // Show pointer only for non-current pages
                }}
              >
                {link.label}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
