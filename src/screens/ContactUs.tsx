"use client";

import ContactForm from "@/components/ContactForm";
import NewsletterForm from "@/components/NewsletterForm";
import Footer from "@/components/shared/Footer";
import TitleSection from "@/components/shared/TitleSection";

const ContactUs = () => {
  return (
    <>
      <section
        aria-labelledby="section-title"
        className="relative mt-[100px] grid grid-cols-1 gap-8 p-5 sm:p-10 md:auto-rows-min md:grid-cols-2 md:gap-y-3 lg:gap-y-0 lg:px-14"
      >
        <div className="space-y-3">
          <h3 className="text-2xl font-medium uppercase md:text-3xl lg:text-4xl">
            Let&apos;s Build Something Exceptional together.
          </h3>
          <p className="text-sm font-medium">
            Whether you&apos;re planning your next project, exploring smart
            housing options, or seeking expert consultation.
          </p>
          <div className="space-y-2.5">
            <p className="text-sm font-medium">
              <a
                href="tel:08033486662"
                className="text-foreground no-underline"
              >
                0 803 348 6662
              </a>
            </p>
            <p className="text-sm font-medium">
              <a
                href="mailto:901concepts@gmail.com"
                className="text-foreground no-underline"
              >
                901concepts@gmail.com
              </a>
            </p>
          </div>
        </div>
        <ContactForm />
        <NewsletterForm />
        <TitleSection
          title="Contact us"
          className="relative inset-0 hidden md:col-span-2 md:block lg:col-span-1"
        />
      </section>
      <Footer />
    </>
  );
};

export default ContactUs;
