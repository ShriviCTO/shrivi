import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6d9835", // Vibrant leafy green
      light: "#a4c639", // Soft lime green for highlights
      dark: "#4c6b24", // Dark green for contrasts
    },
    secondary: {
      main: "#f89b2a", // Warm orange for fertilizers
      light: "#ffbe50", // Soft yellow-orange
      dark: "#c67100", // Rich dark orange
    },
    background: {
      default: "#f6f7f0", // Light beige for backgrounds
      paper: "#ffffff", // White for cards and modals
    },
    text: {
      primary: "#354b22", // Dark green for text
      secondary: "#6c6f49", // Muted green-gray for secondary text
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
