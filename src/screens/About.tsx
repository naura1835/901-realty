"use client";
import Image from "next/image";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import VideoPlayer from "@/components/shared/VideoPlayer";
import Footer from "@/components/shared/Footer";
import Link from "next/link";

gsap.registerPlugin(SplitText, ScrollTrigger, useGSAP);

const About = () => {
  const aboutRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const about = aboutRef.current;
      if (!about) return;

      const paragraphs = gsap.utils.toArray<HTMLElement>(".paragraph-block");
      const split = SplitText.create(".split-lines", { type: "lines" });

      gsap.from(split.lines, {
        y: 50,
        autoAlpha: 0,
        stagger: {
          each: 0.3,
        },
        scrollTrigger: {
          trigger: about,
          start: "top 80%",
          end: "bottom 40%",
          scrub: false,
        },
      });
      paragraphs.forEach((el) => {
        gsap.from(el, {
          y: 50,
          autoAlpha: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
      gsap.from(".contact-info", {
        y: 50,
        autoAlpha: 0,
        scrollTrigger: {
          trigger: ".contact-info",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    },
    {
      scope: aboutRef,
    },
  );
  return (
    <>
      <section
        ref={aboutRef}
        aria-labelledby="section-title"
        className="relative mx-auto mt-[100px] flex w-full flex-col items-center gap-16 p-5 sm:p-10 md:max-w-[80%] lg:px-14"
      >
        <div className="flex flex-col gap-4">
          <div className="space-y-3">
            <h3 className="split-lines text-2xl font-medium uppercase md:text-3xl lg:text-4xl">
              Building With Purpose. Innovating for the Future.
            </h3>
            <p className="paragraph-block text-sm font-medium md:text-base">
              At 901 Realty, we believe construction is more than just putting
              up walls — it&apos;s about creating spaces that inspire, connect,
              and endure. With years of expertise in construction, real estate
              development, and smart housing, we&apos;ve built a reputation for
              excellence, innovation, and trust.
            </p>
            <p className="paragraph-block text-sm font-medium md:text-base">
              Our approach is rooted in precision, thoughtful design, and a deep
              understanding of modern living. Every project we undertake
              reflects our commitment to quality and long-term value, from
              groundbreaking constructions to forward-thinking smart homes. We
              collaborate closely with our clients, ensuring each space we
              create is not only functional but meaningful
            </p>
          </div>
          <div className="paragraph-block h-[400px] w-full">
            <VideoPlayer
              videoUrl="/about-us.mp4"
              autoPlay={false}
              showVolumeBtn
            />
          </div>
          <div className="space-y-3">
            <p className="paragraph-block text-sm font-medium md:text-base">
              Over the years, we&apos;ve grown into a multidisciplinary team who
              are passionate about redefining the built environment. Whether
              we&apos;re constructing a residential community or integrating
              smart features into modern homes, our goal is to combine
              craftsmanship with technology—creating spaces that feel intuitive,
              efficient, and future-ready.
            </p>
            <p className="paragraph-block text-sm font-medium md:text-base">
              What sets us apart is our belief that every project tells a story.
              We take the time to understand the people who will live, work, and
              grow in these spaces, tailoring our solutions to meet real human
              needs. From concept to completion, we prioritize sustainability,
              durability, and design that stands the test of time, ensuring that
              every project delivers lasting value for generations.
            </p>
          </div>
          <div className="paragraph-block mx-auto flex w-fit items-center gap-4 md:text-base">
            <Image
              src="/CAC logo.jpg"
              alt="CAC logo"
              height={3000}
              width={3000}
              className="size-[100px]"
            />
            <p className="max-w-[400px] text-sm">
              901 Realty has been successfully evaluated by the Corporate
              Affairs Commission (CAC), Nigeria&apos;s leading authority for
              business registration and compliance.
            </p>
          </div>
        </div>
        <div className="paragraph-block flex flex-col items-center gap-4">
          <p className="w-[17ch] text-center text-2xl font-medium md:text-4xl lg:text-8xl">
            Let&apos;s build something great together
          </p>
          <Link
            href={"/contact-us"}
            className="bg-foreground border-foreground hover:text-foreground w-full max-w-[200px] rounded-md border px-4 py-3 text-center text-xs font-semibold text-white uppercase hover:bg-transparent"
          >
            Let&apos;s talk
          </Link>
        </div>
      </section>
      <div className="flex flex-col justify-between gap-3 p-5 sm:p-10 md:flex-row lg:px-14">
        <div className="contact-info">
          <p className="text-base font-semibold uppercase">Address</p>
          <p className="text-foreground text-sm">
            Suite 09 Kaltume House, Maiduguri Road. Kano.
          </p>
        </div>
        <div className="contact-info">
          <p className="text-base font-semibold uppercase">Contact us</p>
          <p className="text-sm">
            <a href="tel:08033486662" className="text-foreground no-underline">
              0 803 348 6662
            </a>
          </p>
        </div>
        <div className="contact-info flex flex-col md:items-end">
          <p className="text-base font-semibold uppercase">Email</p>
          <p className="text-sm">
            <a
              href="mailto:901concepts@gmail.com"
              className="text-foreground no-underline"
            >
              901concepts@gmail.com
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
