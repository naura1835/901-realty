import SmartHousing from "@/screens/smart-housing";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Smart Housing",
  description:
    "Discover the latest in smart home technology, energy-efficient systems, and modern living innovations. Explore gadgets, videos, and insights that redefine the future of housing with 901 Realty.",
};

const SmartHousingPage = () => {
  return <SmartHousing />;
};

export default SmartHousingPage;
