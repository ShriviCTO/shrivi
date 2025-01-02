import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoadingSpinner from "./components/LoadingSpinner"; // For Suspense fallback
import ErrorBoundary from "./components/ErrorBoundary"; // For handling errors

// Lazy-loaded components for better performance
const Home = lazy(() => import("./pages/Home"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Products = lazy(() => import("./pages/Products"));
const UrvarukaProduct = lazy(() => import("./pages/UrvarukaProduct"));
const Blog = lazy(() => import("./pages/Blog"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Contact = lazy(() => import("./pages/Contact"));
const BulkOrders = lazy(() => import("./pages/BulkOrders"));
const Careers = lazy(() => import("./pages/Careers"));
const LoginPage = lazy(() => import("./pages/Login"));
const TermsPage = lazy(() => import("./pages/TermsPage"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Product = lazy(() => import("./pages/Product"));

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/product" element={<Product />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/urvaruka" element={<UrvarukaProduct />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/bulk-orders" element={<BulkOrders />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
};

export default App;
