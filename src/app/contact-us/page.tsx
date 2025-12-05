import ContactUs from "@/screens/ContactUs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with 901 Realty for inquiries, consultations, or project discussions. Our team is ready to help you build smarter, better, and with precision. Reach out today",
};

const ContactUsPage = () => {
  return <ContactUs />;
};

export default ContactUsPage;
