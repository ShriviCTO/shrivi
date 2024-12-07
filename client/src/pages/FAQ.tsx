import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import NatureIcon from "@mui/icons-material/Nature";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import GroupIcon from "@mui/icons-material/Group";

const faqData = [
  {
    category: "General Questions",
    icon: <NatureIcon />,
    questions: [
      {
        question: "What is Shrivi Organics all about?",
        answer:
          "Shrivi Organics is a company dedicated to creating a greener, more sustainable world. We specialize in premium organic fertilizers, innovative sustainable proteins, and cutting-edge research aimed at reducing environmental impact. At Shrivi Organics, we believe in empowering individuals, farmers, and businesses to adopt eco-friendly practices without compromising on quality or results.",
      },
      {
        question: "Where are you located?",
        answer:
          "We’re proudly based in Ahmedabad, Gujarat, where all the magic happens! Our headquarters is where we produce, innovate, and collaborate. If you’d like to connect with us in person, you can find our exact location in the Contact Us section, complete with an embedded map for easy navigation.",
      },
      {
        question: "Do you ship products pan-India?",
        answer:
          "Yes, absolutely! We’re committed to reaching every corner of India with our eco-friendly solutions. Whether you’re in a bustling city or a quiet rural area, we’ll make sure our products get to you safely. Please note, shipping charges may vary based on your location and order size.",
      },
    ],
  },
  {
    category: "Products",
    icon: <ShoppingCartIcon />,
    questions: [
      {
        question: "What is Urvaruka?",
        answer:
          "Urvaruka is our flagship product—a premium organic soil amendment made from Black Soldier Fly (BSF) frass. It’s nutrient-rich, eco-friendly, and designed to improve soil fertility, boost plant immunity, and promote sustainable farming practices. Whether you’re an avid gardener or a professional farmer, Urvaruka is the perfect partner for healthy, thriving plants.",
      },
      {
        question:
          "What makes your products different from regular fertilizers?",
        answer:
          "Unlike regular chemical fertilizers, our products are 100% organic and free from harmful pesticides. They’re crafted using natural processes that enrich soil health over time, rather than depleting it. Plus, our fertilizers are sustainable and scientifically tested to deliver outstanding results without compromising the environment or safety of your plants, pets, and family.",
      },
      {
        question: "How do I use your products for gardening?",
        answer:
          "Using our products is simple! Each package comes with detailed instructions tailored to different types of plants. For example, mix the recommended quantity of fertilizer into the soil around your plants, water them thoroughly, and watch them thrive. You can also visit our product pages for more guides and tips specific to your gardening needs.",
      },
      {
        question: "Are your products pet-safe?",
        answer:
          "Yes, all our products are designed with safety in mind. When used as directed, they pose no harm to your furry friends. However, to be on the safe side, we recommend storing them out of reach of pets, as some may find the smell tempting!",
      },
    ],
  },
  {
    category: "Orders and Shipping",
    icon: <LocalShippingIcon />,
    questions: [
      {
        question: "How do I place an order?",
        answer:
          "Placing an order is easy! Visit our Products page, select the items you’d like to purchase, and fill out the order form. After completing the payment, you’ll receive a confirmation email with all the details. If you have any trouble, our team is just a message away!",
      },
      {
        question: "What is the maximum order quantity for retail purchases?",
        answer:
          "For retail customers, we allow a maximum of 5 items per order to ensure availability for everyone. For larger quantities, we recommend placing a bulk order through our dedicated Bulk Orders page, where we can cater to your specific requirements.",
      },
      {
        question: "How long does delivery take?",
        answer:
          "Once your order is confirmed, you can expect delivery within 5-7 business days. However, delivery times may vary depending on your location. Don’t worry—we’ll keep you updated every step of the way!",
      },
      {
        question: "What if my order arrives damaged?",
        answer:
          "We’re sorry for any inconvenience caused! If your order arrives damaged, please contact us immediately through the Contact Us page with a photo of the damaged product. We’ll work swiftly to arrange a replacement or refund.",
      },
    ],
  },
  {
    category: "Sustainability and Innovation",
    icon: <NatureIcon />,
    questions: [
      {
        question: "What sustainable practices does Shrivi Organics follow?",
        answer:
          "Sustainability is at the core of everything we do. From sourcing raw materials responsibly to using eco-friendly packaging, we ensure our processes have minimal environmental impact. By turning organic waste into premium fertilizers and proteins, we’re closing the loop and promoting circular farming practices.",
      },
      {
        question: "What research is Shrivi Organics involved in?",
        answer:
          "We’re heavily invested in innovative research to create sustainable solutions for agriculture and beyond. Our current focus areas include exploring the potential of Black Soldier Fly larvae for protein production, developing plant-based cures using chitin, and designing advanced soil enhancers that combat climate change.",
      },
      {
        question: "Why is using organic fertilizer better for the environment?",
        answer:
          "Organic fertilizers like ours improve soil health naturally by boosting microbial activity, retaining moisture, and adding essential nutrients. Unlike chemical fertilizers, they don’t contribute to water pollution or degrade soil quality, making them a win-win for the planet and your plants.",
      },
    ],
  },
  {
    category: "Bulk Orders and Partnerships",
    icon: <GroupIcon />,
    questions: [
      {
        question: "Can I request a custom order?",
        answer:
          "Yes, we’re happy to accommodate custom orders for bulk quantities or specific requirements. Simply fill out the Bulk Orders form or reach out to us directly, and we’ll work with you to tailor a solution that fits your needs.",
      },
      {
        question: "Do you collaborate with businesses or institutions?",
        answer:
          "Absolutely! Collaboration is key to driving sustainability forward. We partner with businesses, NGOs, and educational institutions to promote eco-friendly practices and innovate together. If you’re interested, let’s talk!",
      },
      {
        question: "Can I become a distributor of Shrivi Organics products?",
        answer:
          "Yes, we’re actively exploring distribution opportunities. If you’re passionate about sustainability and interested in joining our network, reach out to us for more details on how we can work together.",
      },
    ],
  },
];

const FAQ: React.FC = () => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAccordionChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="lg">
        {/* Title and Subtitle */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
            Your Questions, Answered!
          </Typography>
          <Typography variant="h6">
            Have a question about our products, services, or mission? We’re here
            to help!
          </Typography>
        </Box>

        {/* Search Bar */}
        <Box sx={{ mb: 6, display: "flex", justifyContent: "center" }}>
          <TextField
            variant="outlined"
            placeholder="Search FAQs..."
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1 }} />,
            }}
            sx={{ width: "100%", maxWidth: "600px" }}
          />
        </Box>

        {/* FAQ Accordion */}
        {faqData.map((category, index) => (
          <Box key={index} sx={{ mb: 4 }}>
            <Typography
              variant="h5"
              sx={{
                display: "flex",
                alignItems: "center",
                fontWeight: "bold",
                mb: 2,
              }}
            >
              {category.icon} <Box sx={{ ml: 1 }}>{category.category}</Box>
            </Typography>
            {category.questions
              .filter((faq) => faq.question.toLowerCase().includes(searchTerm))
              .map((faq, i) => (
                <Accordion
                  key={i}
                  expanded={expanded === `${category.category}-${i}`}
                  onChange={handleAccordionChange(`${category.category}-${i}`)}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`${category.category}-${i}-content`}
                    id={`${category.category}-${i}-header`}
                  >
                    <Typography
                      sx={{
                        fontFamily: "Nunito, sans-serif",
                        fontWeight: "bold",
                        color: "primary.main",
                      }}
                    >
                      {faq.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography
                      sx={{
                        fontFamily: "Roboto, sans-serif",
                        color: "text.secondary",
                      }}
                    >
                      {faq.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
          </Box>
        ))}

        {/* CTA Section */}
        <Box sx={{ textAlign: "center", mt: 6 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Can’t find your question? Contact us directly!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            href="/contact"
            sx={{ px: 4, py: 1.5, borderRadius: "20px", fontWeight: "bold" }}
          >
            Contact Us
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default FAQ;
