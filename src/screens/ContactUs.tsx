"use client";

import ContactForm from "@/components/ContactForm";
import NewsletterForm from "@/components/NewsletterForm";
import Footer from "@/components/shared/Footer";
import TitleSection from "@/components/shared/TitleSection";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger, useGSAP);

const ContactUs = () => {
  const contactRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = contactRef.current;
      if (!el) return;

      const animateText = gsap.utils.toArray(".paragraph-animation");

      gsap.set(animateText, { y: 20, autoAlpha: 0 });
      gsap.set([".newsletter", ".contact-form"], {
        y: 30,
        autoAlpha: 0,
      });
      const tl = gsap.timeline();

      SplitText.create(".split", {
        type: "chars",
        onSplit: (self) => {
          tl.from(self.chars, {
            y: 20,
            autoAlpha: 0,
            stagger: {
              each: 0.04,
            },
            scrollTrigger: {
              trigger: ".split",
              start: "top center+=250",
              end: "bottom center",
              toggleActions: "restart none reverse pause",
            },
          });
        },
      });
      animateText.forEach((txt) => {
        const textEl = txt as HTMLElement;

        tl.to(
          textEl,
          {
            autoAlpha: 1,
            y: 0,
            scrollTrigger: textEl,
          },
          "start+1",
        );
      });
      [".newsletter", ".contact-form"].forEach((selector) => {
        tl.to(
          selector,
          {
            y: 0,
            autoAlpha: 1,
            ease: "power1.out",
            scrollTrigger: {
              trigger: selector,
              start: "top 85%",
              end: "top 40%",
              invalidateOnRefresh: true,
            },
          },
          "start+1",
        );
      });
    },
    { scope: contactRef },
  );
  return (
    <>
      <section
        aria-labelledby="section-title"
        ref={contactRef}
        className="relative mt-[100px] grid grid-cols-1 gap-8 p-5 sm:p-10 md:auto-rows-min md:grid-cols-2 md:gap-y-3 lg:gap-y-0 lg:px-14"
      >
        <div className="space-y-3">
          <h3 className="split text-2xl font-medium uppercase md:text-3xl lg:text-4xl">
            Let&apos;s Build Something <br />
            Exceptional together.
          </h3>
          <p className="paragraph-animation text-sm font-medium">
            Whether you&apos;re planning your next project, exploring smart
            housing options, or seeking expert consultation.
          </p>
          <div className="space-y-2.5">
            <p className="paragraph-animation text-sm font-medium">
              <a
                href="tel:08033486662"
                className="text-foreground no-underline"
              >
                0 803 348 6662
              </a>
            </p>
            <p className="paragraph-animation text-sm font-medium">
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
