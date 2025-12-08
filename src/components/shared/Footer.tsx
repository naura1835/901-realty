"use client";
import Link from "next/link";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import Instagram from "@/icons/instagram";

gsap.registerPlugin(SplitText, ScrollTrigger, useGSAP);

const menuItems = [
  { id: 0, title: "About us", url: "/about-us" },
  { id: 1, title: "Works", url: "/works" },
  { id: 2, title: "Smart housing", url: "/smart-housing" },
  { id: 3, title: "Get in touch", style: "link-btn", url: "/contact-us" },
];

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  useGSAP(
    () => {
      const footerEl = footerRef.current;
      if (!footerEl) return;

      const split = SplitText.create(".footer-split-text", {
        type: "chars",
      });

      gsap.from(split.chars, {
        y: 20,
        autoAlpha: 0,
        stagger: {
          each: 0.04,
        },
        scrollTrigger: {
          trigger: footerEl,
          start: "top center+=250",
          toggleActions: "play none reverse restart",
        },
      });
    },
    { scope: footerRef },
  );
  return (
    <footer
      ref={footerRef}
      className="flex flex-col bg-[#F4F3EE] px-5 pt-[100px] pb-10 lg:px-14"
    >
      <div className="flex flex-col justify-between gap-5 md:flex-row">
        <p className="footer-split-text text-4xl font-semibold uppercase md:w-[12ch]">
          Let&apos;s build <br /> together
        </p>
        <ul className="flex list-none flex-col gap-3 md:flex-row md:items-center md:gap-5">
          {menuItems.map((item) => (
            <li
              key={item.id}
              className="text-sm font-medium uppercase"
              onMouseEnter={() => setHovered(item.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <Link
                href={item.url}
                className={`inline-block text-xs font-semibold uppercase ${
                  item.style === "link-btn"
                    ? "bg-foreground rounded-md px-4 py-3 text-white"
                    : ""
                } ${
                  hovered !== null && hovered !== item.id && !item.style
                    ? "opacity-30"
                    : "opacity-100"
                }`}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="@container">
        <ul className="flex list-none flex-col items-center gap-3 pt-14 sm:justify-center md:gap-8 @sm:flex-row">
          <li className="text-center text-xs font-semibold uppercase">
            <a
              href="https://www.instagram.com/901.realty/"
              className="text-foreground no-underline"
            >
              <Instagram className="fill-foreground size-5" />
            </a>
          </li>
          <li className="text-center text-xs font-semibold uppercase">
            privacy policy
          </li>
          <li className="text-center text-xs font-semibold uppercase">
            © 2025 901REALTY
          </li>
          <li className="text-center text-xs font-semibold uppercase">
            MADE BY NAURACODES
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
