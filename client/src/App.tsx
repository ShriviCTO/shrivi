import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Products from "./pages/Products";
import Blog from "./pages/Blog";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import BulkOrders from "./pages/BulkOrders";
import Careers from "./pages/Careers";
import Header from "./components/Header";
import Footer from "./components/Footer";
import UrvarukaProduct from "./pages/UrvarukaProduct";

const App: React.FC = () => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Header />
      <div style={{ flex: 1 }}>
        {/* Main Content */}
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/about-us" element={<AboutUs></AboutUs>}></Route>
          <Route path="/products" element={<Products></Products>}></Route>
          <Route
            path="/products/urvaruka"
            element={<UrvarukaProduct></UrvarukaProduct>}
          ></Route>
          <Route path="/blog" element={<Blog></Blog>}></Route>
          <Route path="/faq" element={<FAQ></FAQ>}></Route>
          <Route path="/contact" element={<Contact></Contact>}></Route>
          <Route
            path="/bulk-orders"
            element={<BulkOrders></BulkOrders>}
          ></Route>
          <Route path="/careers" element={<Careers></Careers>}></Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
