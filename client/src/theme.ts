import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#8c5f66", // Rose Taupe
      light: "#e09891", // Light Coral
      dark: "#5a3c42", // Dark muted red-brown
    },
    secondary: {
      main: "#adbca5", // Ash Gray
      light: "#e8b9ab", // Melon for highlights
      dark: "#5a3c42", // Dark muted gray-brown for contrast
    },
    background: {
      default: "#e8b9ab", // Melon for a soft, warm background
      paper: "#f6f6f6", // Off-white for cards and modals
    },
    text: {
      primary: "#2f2f2f", // Charcoal gray for primary text
      secondary: "#6c6f49", // Subtle green-gray for secondary text
    },
  },
  typography: {
    fontFamily: '"Nunito", "Arial", sans-serif', // Fun, professional, and approachable font
    h1: {
      fontSize: "3rem",
      fontWeight: 700,
      letterSpacing: "0.1rem",
    },
    h2: {
      fontSize: "2.25rem",
      fontWeight: 600,
      letterSpacing: "0.05rem",
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 600,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 500,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 500,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 500,
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
    },
    body2: {
      fontSize: "0.875rem",
      fontWeight: 400,
    },
    button: {
      textTransform: "none", // Keep button text capitalization natural
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 16, // Rounded corners for buttons and cards
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 24, // Extra rounded buttons
          padding: "8px 16px",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16, // Soft card edges
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        },
      },
    },
  },
});

export default theme;
