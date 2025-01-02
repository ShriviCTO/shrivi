import { useState, useEffect, useRef } from "react";
import { Box, Fab } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import HeroSection from "../components/Product/HeroSection";
import SizesVariants from "../components/Product/SizesVariants";
import ProductDescription from "../components/Product/ProductDescription";
import CustomerReviews from "../components/Product/CustomerReviews";

const Product = () => {
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const sizesVariantsRef = useRef<HTMLDivElement | null>(null);
  const customerReviewsRef = useRef<HTMLDivElement | null>(null);

  const scrollToSizesVariants = () => {
    sizesVariantsRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const scrollToReviews = () => {
    customerReviewsRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const cutoffHeight = window.innerHeight;
    setShowScrollToTop(scrollPosition > cutoffHeight);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const product = {
    name: "Urvaruka – Premium Organic Fertilizer",
    tagline: "Nurture Your Plants Naturally, Sustainably, and Powerfully!",
    description: `
**Urvaruka** is crafted from 100% Black Soldier Fly (BSF) frass, a nutrient-rich organic material.

This premium fertilizer:
- Enhances soil fertility
- _Boosts plant immunity_
- Promotes **vigorous growth**

It is perfect for:
- Indoor plants
- Gardens
- Large-scale crops

> Reduce your dependency on chemical fertilizers and embrace eco-friendly and sustainable farming practices.
`,
    discount: 20, // Optional
    discountValidUntil: "2025-01-15", // Optional
    sizes: [
      {
        productId: "6769c66071e91d1f625c7ddc",
        label: "Mini",
        price: 200,
        sku: "URV-0.5KG",
        stock: 50,
        dimensions: {
          weight: "0.5kg",
          height: "15cm",
          width: "10cm",
          depth: "5cm",
        },
        packaging: "Eco-friendly pouch",
        description: "Ideal for small indoor plants or balcony gardens.",
      },
      {
        productId: "6769c66071e91d1f625c7ddd",
        label: "Regular",
        price: 350,
        sku: "URV-1KG",
        stock: 30,
        dimensions: {
          weight: "1kg",
          height: "20cm",
          width: "15cm",
          depth: "7cm",
        },
        packaging: "Resealable bag",
        description: "Perfect for regular household gardening needs.",
      },
      {
        productId: "6769c66071e91d1f625c7dde",
        label: "Large",
        price: 1500,
        sku: "URV-5KG",
        stock: 10,
        dimensions: {
          weight: "5kg",
          height: "30cm",
          width: "20cm",
          depth: "15cm",
        },
        packaging: "Durable bag with carry handle",
        description:
          "Recommended for large outdoor gardens or community gardening.",
      },
      {
        productId: "6769c66071e91d1f625c7dd0",
        label: "Extra Large",
        price: 2750,
        sku: "URV-10KG",
        stock: 5,
        dimensions: {
          weight: "10kg",
          height: "40cm",
          width: "30cm",
          depth: "20cm",
        },
        packaging: "Heavy-duty sack",
        description: "Best suited for farms or large-scale applications.",
      },
    ],
    bundleOptions: [
      {
        name: "Starter Kit",
        image: "bundle_image.jpg",
        description: "Includes 1kg fertilizer and gloves.",
        price: 400,
        discount: 20,
        items: ["1kg Fertilizer", "Gardening Gloves"],
      },
      {
        name: "Gardener's Pack",
        image: "bundle_image1.jpg",
        description: "5kg fertilizer + 2 compost bins.",
        price: 1800,
        discount: 20,
        items: ["5kg Fertilizer", "2 Compost Bins"],
      },
    ],
    features: [
      { icon: "recycling", label: "100% Organic" },
      { icon: "pets", label: "Pet-Safe" },
      { icon: "star", label: "Highly Nutrient-Rich" },
    ],
    images: [
      {
        url: "/images/urvaruka-1.jpg",
        altText: "Urvaruka product image 1",
        isPrimary: true,
      },
      { url: "/images/urvaruka-2.jpg", altText: "Urvaruka product image 2" },
      { url: "/images/urvaruka-3.jpg", altText: "Urvaruka product image 3" },
    ],
    videos: [
      { url: "/videos/urvaruka-usage.mp4", title: "How to Use Urvaruka" },
    ],
    nutritionalContent: `### Ingredients:

- **Black Soldier Fly Frass**  
  A nutrient-rich by-product of Black Soldier Fly larvae, packed with essential minerals.

- **Organic Carbon**  
  Supports microbial activity in the soil, enhancing soil fertility.

- **Nitrogen**  
  Boosts leafy growth and helps plants develop vibrant foliage.

- **Phosphorus**  
  Essential for strong root development and flowering.

- **Potassium**  
  Enhances plant immunity and overall vigor, promoting healthier crops.

---

### Composition:

- **NPK Ratio: 3-2-3**  
  A balanced formulation to meet the fundamental nutrient requirements of plants.

- **pH Range: 6.5-7.5**  
  Perfectly tuned for most soil types, ensuring optimal nutrient uptake.

- **Organic Matter: 85%**  
  Enriches the soil with humus, improving structure and water retention.

---

### Why It’s Unique:

- Contains **all-natural ingredients**, safe for organic gardening.
- Promotes **microbial diversity**, improving soil health over time.
- Encourages **sustainable farming practices** with a lower environmental footprint.
`,
    certifications: `### Certifications:

- **Organic Certified**  
  *Issued by:* Indian Organic Board  
  *Year:* 2024  
  Recognized for meeting stringent organic farming standards and ensuring a chemical-free approach to plant nutrition.

- **Eco-Friendly Packaging**  
  *Issued by:* Green Council  
  *Year:* 2023  
  Commended for utilizing sustainable and 100% recyclable materials in packaging.

- **Sustainable Agriculture Excellence Award**  
  *Issued by:* Global Sustainability Alliance  
  *Date:* January 15, 2025  
  A prestigious acknowledgment of the product's contribution to sustainable farming and environmental preservation worldwide.
`,
    usageInstructions: `### Application Rates:

#### Indoor Plants
Mix **50g of Urvaruka** per liter of potting soil. Apply every **4 weeks** for optimal plant health and growth.

#### Outdoor Gardens
Apply **100g per square meter**. Work it into the topsoil and water thoroughly to enrich the soil and boost fertility.

#### Large-Scale Crops
Use **200kg per hectare** during planting or as a top dressing. Ensures robust crop yield and soil rejuvenation.

---

### Safety Tips:

- **Store in a cool, dry place** to maintain product efficacy.
- **Keep out of reach of children and pets** for safety.
- Always **use gloves while handling the product** to avoid direct contact.`,
    customerReviews: [
      {
        userId: "1",
        user: "Rohit Mehta",
        rating: 5,
        comment:
          "Absolutely loved it! My vegetable garden is thriving like never before.",
        date: "2024-12-01",
      },
      {
        userId: "2",
        user: "Neha Patel",
        rating: 4,
        comment: "Great product, but delivery took longer than expected.",
        date: "2024-12-02",
      },
      {
        userId: "3",
        user: "Amit Kumar",
        rating: 5,
        comment:
          "This fertilizer is amazing. My roses have never looked so vibrant.",
        date: "2024-12-03",
      },
      {
        userId: "4",
        user: "Sonal Verma",
        rating: 3,
        comment:
          "Decent product, but I didn’t notice much difference in my plants.",
        date: "2024-12-04",
      },
      {
        userId: "5",
        user: "Vikas Gupta",
        rating: 5,
        comment:
          "Completely organic and easy to use. I’ll definitely recommend it to my friends.",
        date: "2024-12-05",
      },
      {
        userId: "6",
        user: "Priya Singh",
        rating: 4,
        comment:
          "Effective for indoor plants, but I wish it came with better instructions.",
        date: "2024-12-06",
      },
      {
        userId: "7",
        user: "Rahul Chatterjee",
        rating: 5,
        comment:
          "Impressive results on my tomato plants. Very satisfied with the purchase!",
        date: "2024-12-07",
      },
      {
        userId: "8",
        user: "Anjali Sharma",
        rating: 4,
        comment:
          "It’s good, but the packaging could be improved. Some spillage during delivery.",
        date: "2024-12-08",
      },
      {
        userId: "9",
        user: "Deepak Jain",
        rating: 2,
        comment:
          "Not worth the price. Didn’t see significant results in my outdoor garden.",
        date: "2024-12-09",
      },
      {
        userId: "10",
        user: "Meera Joshi",
        rating: 5,
        comment:
          "Outstanding product! My orchids have started blooming beautifully.",
        date: "2024-12-10",
      },
      {
        userId: "11",
        user: "Siddharth Nair",
        rating: 4,
        comment:
          "Very effective for my balcony plants. Just wish the delivery was quicker.",
        date: "2024-12-11",
      },
      {
        userId: "12",
        user: "Kavita Rao",
        rating: 5,
        comment:
          "The eco-friendly packaging is a big plus for me. Highly recommend!",
        date: "2024-12-12",
      },
      {
        userId: "13",
        user: "Nitin Sharma",
        rating: 3,
        comment:
          "It’s okay. My plants seem slightly better, but it didn’t meet my expectations.",
        date: "2024-12-13",
      },
      {
        userId: "14",
        user: "Shreya Dutta",
        rating: 5,
        comment:
          "Incredible results on my herb garden! The basil and mint are growing like crazy.",
        date: "2024-12-14",
      },
      {
        userId: "15",
        user: "Manoj Yadav",
        rating: 4,
        comment:
          "Good product, but I feel it’s a bit pricey for the quantity provided.",
        date: "2024-12-15",
      },
      {
        userId: "16",
        user: "Anita Roy",
        rating: 5,
        comment:
          "Perfect for my large-scale vegetable farm. Very happy with the outcome.",
        date: "2024-12-16",
      },
      {
        userId: "17",
        user: "Karan Desai",
        rating: 3,
        comment: "Mediocre product. Works better on some plants than others.",
        date: "2024-12-17",
      },
    ],
    faqs: `### Frequently Asked Questions:

- **Q: Can I use this for hydroponics?**  
  **A:** Unfortunately, Urvaruka is not designed for hydroponic systems as it works best when mixed with soil. Its nutrients are optimized for soil-based absorption, giving your plants the nourishment they need in traditional gardening setups.

- **Q: Is this safe for pets?**  
  **A:** Absolutely! Urvaruka is 100% pet-safe and free from harmful chemicals. While it’s safe for pets to be around treated plants, we recommend storing the fertilizer out of reach to avoid accidental ingestion.

- **Q: How should I store Urvaruka?**  
  **A:** Store Urvaruka in a cool, dry place away from direct sunlight and moisture. Proper storage will help maintain its nutrient composition and ensure it remains effective for longer.

- **Q: How soon will I see results after using Urvaruka?**  
  **A:** Most users notice healthier, more vibrant plants within a few weeks. It depends on the type of plants and their growth cycle, but consistent use will yield visible improvements over time.

- **Q: Can I use Urvaruka for flowering plants?**  
  **A:** Yes, Urvaruka is perfect for flowering plants! Its balanced NPK ratio and organic matter content encourage robust blooms and healthier foliage, making it ideal for roses, marigolds, and other flowering varieties.
`,
    environmentalImpact: `**Environmental Impact:**

- **Eco-Friendly Practices:**  
  Produced using sustainable Black Soldier Fly technology.  
  This innovative method helps reduce waste and promotes a circular economy, benefiting the environment.  

- **Recycling Information:**  
  Packaging is 100% recyclable. Please dispose responsibly.  
  By choosing this product, you contribute to reducing landfill waste and supporting sustainable practices.

---

**Return Policy:**

- **Policy Description:**  
  You can return the product within **30 days** if it is unopened.  

- **Return Process:**  
  Contact our customer support team with your purchase details to initiate a return.  
  Ensure that the product is unused and in its original packaging to qualify for a refund.  

We strive to make your experience as seamless as possible!
`,
    returnPolicy: {
      description: "You can return the product within 30 days if unopened.",
      process:
        "Contact customer support with your purchase details to initiate a return.",
    },
  };

  return (
    <Box sx={{ p: 4 }}>
      <HeroSection
        product={product}
        onBuyNowClick={scrollToSizesVariants}
        onReviewsClick={scrollToReviews}
      />

      <ProductDescription product={product} />

      <Box ref={sizesVariantsRef}>
        <SizesVariants product={product} />
      </Box>

      <Box ref={customerReviewsRef}>
        <CustomerReviews product={product} />
      </Box>

      {/* Scroll to Top Button */}
      {showScrollToTop && (
        <Fab
          color="primary"
          size="small"
          onClick={scrollToTop}
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
            boxShadow: 3,
            zIndex: 1000,
          }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      )}
    </Box>
  );
};

export default Product;
