import Home from "@/screens/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  description:
    "Discover 901 Realty, a leader in modern construction, smart housing innovation, and real estate development in Nigeria. Explore our projects, services, and smart living solutions built with precision, quality, and excellence.",
};

export default function HomePage() {
  return <Home />;
}
