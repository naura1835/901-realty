import About from "@/screens/About";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Discover the story behind 901 Realty. Learn how we bring precision, innovation, and craftsmanship to construction, real estate development, and smart housing.",
};

const AboutUs = () => {
  return <About />;
};

export default AboutUs;
