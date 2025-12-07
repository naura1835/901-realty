"use client";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger, useGSAP);

const TitleSection = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const el = titleRef.current;
      if (!el) return;

      const split = SplitText.create(el, { type: "chars" });
      gsap.from(split.chars, {
        y: 20,
        autoAlpha: 0,
        stagger: { each: 0.04 },
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top bottom-=50",
          end: "bottom center",
          toggleActions: "restart none reverse pause",
        },
      });
    },
    { scope: titleRef },
  );
  return (
    <h2
      ref={titleRef}
      id="section-title"
      className={cn(
        "fixed bottom-0 left-0 text-6xl font-semibold uppercase",
        className,
      )}
    >
      {title}
    </h2>
  );
};

export default TitleSection;
