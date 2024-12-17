import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { HelmetProvider } from "react-helmet-async";
import { Provider as ReduxProvider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import { getCLS, getFID, getLCP, Metric } from "web-vitals";
import theme from "./theme";
import App from "./App";
import store from "./store";

// React Query Client
const queryClient = new QueryClient();

// Function to send Web Vitals metrics to Google Analytics
function sendToAnalytics(metric: Metric) {
  if (window.gtag) {
    window.gtag("event", metric.name, {
      value: metric.value,
      delta: metric.delta,
      id: metric.id,
    });
  }
}

// Measure Web Vitals
getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getLCP(sendToAnalytics);

// React 18 Root Rendering
const rootElement = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <ReduxProvider store={store}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <App />
            </ThemeProvider>
          </BrowserRouter>
        </QueryClientProvider>
      </ReduxProvider>
    </HelmetProvider>
  </React.StrictMode>
);
