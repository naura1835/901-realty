"use client";
import TitleSection from "@/components/shared/TitleSection";
import Image from "next/image";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import Instagram from "@/icons/instagram";

gsap.registerPlugin(SplitText, ScrollTrigger, useGSAP);

const About = () => {
  const aboutRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const about = aboutRef.current;
      if (!about) return;
      const split = SplitText.create("split-lines", { type: "line" });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: about,
          start: "top 80%",
          end: "bottom 40%",
          scrub: false,
          markers: true,
        },
      });

      tl.from(
        ".img-wrapper",
        {
          y: 50,
          autoAlpha: 0,
          ease: "power3.out",
        },
        "s",
      );
      tl.from(
        split.lines,
        {
          y: 20,
          autoAlpha: 0,
          stagger: {
            each: 0.04,
          },
        },
        "s+1",
      );
      tl.from(
        ".paragraph-block",
        {
          y: 50,
          autoAlpha: 0,
          stagger: {
            each: 0.04,
          },
        },
        "s+1",
      );
      tl.from(".contact-info", { y: 50, autoAlpha: 0 });
    },
    {
      scope: aboutRef,
    },
  );
  return (
    <section
      ref={aboutRef}
      aria-labelledby="section-title"
      className="relative mt-[100px] grid grid-cols-1 gap-16 p-5 sm:p-10 lg:h-[calc(100vh-120px)] lg:grid-cols-[1fr_1fr] lg:px-14"
    >
      <div className="img-wrapper h-[264px] w-full lg:col-start-2 lg:w-[80%] xl:self-center">
        {/* <Blocks /> */}
        <Image
          src={"/construction-01.jpeg"}
          alt="construction"
          height={3000}
          width={3000}
          className="h-full w-full object-cover object-top"
        />
      </div>
      <div className="flex flex-col gap-4 lg:col-start-1 lg:row-start-1">
        <div className="space-y-3">
          <h3 className="split-lines text-2xl font-medium uppercase md:text-3xl lg:text-4xl">
            Building With Purpose. Innovating for the Future.
          </h3>
          <p className="paragraph-block text-sm font-medium">
            At 901 Realty, we believe construction is more than just putting up
            walls — it&apos;s about creating spaces that inspire, connect, and
            endure. With years of expertise in construction, real estate
            development, and smart housing, we&apos;ve built a reputation for
            excellence, innovation, and trust.
          </p>
          <p className="paragraph-block text-sm font-medium">
            Our approach is rooted in precision, thoughtful design, and a deep
            understanding of modern living. Every project we undertake reflects
            our commitment to quality and long-term value, from groundbreaking
            constructions to forward-thinking smart homes. We collaborate
            closely with our clients, ensuring each space we create is not only
            functional but meaningful
          </p>
        </div>
        <div className="paragraph-block flex items-center gap-4 lg:absolute lg:right-0 lg:bottom-14 lg:w-1/2 xl:relative xl:inset-0 xl:w-full">
          <Image
            src="/CAC logo.jpg"
            alt="CAC logo"
            height={3000}
            width={3000}
            className="size-[100px]"
          />
          <p className="text-sm">
            901 Realty has been successfully evaluated by the Corporate Affairs
            Commission (CAC), Nigeria&apos;s leading authority for business
            registration and compliance.
          </p>
        </div>
        <div className="space-y-2.5 md:flex md:gap-7 md:space-y-0 lg:absolute lg:right-14 lg:bottom-0">
          <p className="contact-info text-sm font-semibold uppercase">
            Contact us
          </p>
          <p className="contact-info text-sm">
            <a href="tel:08033486662" className="text-foreground no-underline">
              0 803 348 6662
            </a>
          </p>
          <p className="contact-info text-sm">
            <a
              href="mailto:901concepts@gmail.com"
              className="text-foreground no-underline"
            >
              901concepts@gmail.com
            </a>
          </p>
          <p className="contact-info text-sm">
            <a
              href="https://www.instagram.com/901.realty/"
              className="text-foreground no-underline"
            >
              <Instagram className="fill-foreground size-5" />
            </a>
          </p>
        </div>
      </div>
      <TitleSection
        title="About us"
        className="relative lg:absolute lg:bottom-0 lg:left-14"
      />
    </section>
  );
};

export default About;
