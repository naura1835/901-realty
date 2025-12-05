import Works from "@/screens/works";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Projects",
  description:
    "Explore completed and ongoing projects by 901 Realty. View our portfolio of contemporary homes, commercial builds, and smart housing developments crafted with quality and detail.",
};

const WorksPage = () => {
  return <Works />;
};

export default WorksPage;
