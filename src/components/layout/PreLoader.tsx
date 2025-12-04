"use client";
import { ReactNode, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const PreLoader = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const preLoaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.set(".logo--text", {
      y: 120,
    });
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.to(".logo--icon", {
        autoAlpha: 1,
        scale: 1,
        ease: "elastic.inOut(1,0.75)",
        duration: 0.7,
        delay: 0.4,
      })
        .to(".logo--text", {
          autoAlpha: 1,
          y: 0,
          stagger: 0.2,
          ease: "power3.inOut",
          duration: 1,
        })
        .to([".logo--icon", ".logo--text"], {
          y: 150,
          ease: "power3.in",
          duration: 0.7,
          delay: 0.5,
        })
        .to(preLoaderRef.current, {
          duration: 0.8,
          ease: "power3.inOut",
          clipPath: "inset(0 0 100% 0)", // slide upwards like a drawer
          onComplete: () => setLoading(false),
        });
    },
    { scope: preLoaderRef },
  );

  if (loading) {
    return (
      <div
        ref={preLoaderRef}
        className="bg-foreground flex h-screen items-center justify-center"
      >
        <div className="overflow-y-hidden">
          <svg
            width="208"
            height="40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="logo--icon"
              d="M19.54 0a19.53 19.53 0 1 0-.02 39.0602A19.53 19.53 0 0 0 19.54 0Zm8.8 26.46h-4.09v-5.9l-4.71-4.16-4.72 4.16v5.9h-4.09v-7.75l8.81-7.76 8.8 7.76v7.75Zm-4.11-11.4V11h4.06v4.06h-4.06Z"
              fill="#fff"
            />
            <path
              className="logo--text"
              d="M58.7 14.65a5.3698 5.3698 0 0 0-1-1.41l-.29-.26a5.0897 5.0897 0 0 0-3.3-1.19 5.1602 5.1602 0 0 0-4.9723 7.182A5.1601 5.1601 0 0 0 54.11 22.1h.78l.44-.09-2.76 5.3h2l4-7.67a5.1894 5.1894 0 0 0 .25-4.58l-.12-.41Zm-2.12 4.6a2.1905 2.1905 0 0 1-.39.36 3.3606 3.3606 0 0 1-1.71.72h-.39a3.4093 3.4093 0 0 1-2.7599-1.4036A3.41 3.41 0 0 1 56.09 14.16l.3.24a3.4397 3.4397 0 0 1 1 1.57c.052.1697.0888.3437.11.52a3.1365 3.1365 0 0 1 0 .44 3.3595 3.3595 0 0 1-.92 2.32Z"
              fill="#fff"
            />
            <path
              className="logo--text"
              d="M74.41 13.72a7.7184 7.7184 0 0 0-1.75-1.16l-.38-.18a7.8099 7.8099 0 0 0-3-.59 7.7108 7.7108 0 0 0-4.19 1.23 3.6201 3.6201 0 0 0-.32.22 7.735 7.735 0 0 0-1.31 1.18l-.24.29a7.72 7.72 0 0 0-1.68 4.81v.81a7.6593 7.6593 0 0 0 .38 1.72c0 .12.09.24.14.36a7.7696 7.7696 0 0 0 7.1829 4.8498A7.7695 7.7695 0 0 0 72.23 26.67l.38-.18a7.4294 7.4294 0 0 0 1.75-1.17 4.2514 4.2514 0 0 0 .38-.36 7.7098 7.7098 0 0 0 .08-10.9c-.15-.1-.28-.22-.41-.34Zm.38 8.16a4.6852 4.6852 0 0 1-.38.74 5.8382 5.8382 0 0 1-1.75 1.85 3.9757 3.9757 0 0 1-.38.24 6.0007 6.0007 0 0 1-4.8981.4836A6 6 0 0 1 63.77 21.85l-.14-.36a6.1311 6.1311 0 0 1-.33-1.88v-.52a6.0007 6.0007 0 0 1 .85-2.67c.09-.15.19-.29.29-.43a5.9238 5.9238 0 0 1 1.35-1.34l.32-.21a6 6 0 0 1 6.15-.1l.38.24a5.8382 5.8382 0 0 1 1.75 1.85 4.681 4.681 0 0 1 .38.74 5.899 5.899 0 0 1 0 4.71h.02Z"
              fill="#fff"
            />
            <path
              className="logo--text"
              d="M80.25 11.79V27.26H82V11.79h-1.75Z"
              fill="#fff"
            />
            <path
              className="logo--text"
              d="m108.82 26.84-4.69-6.16h-3.5v6.16h-1.71V12.21h7c3 0 4.84 1.59 4.84 4.24a4.0013 4.0013 0 0 1-1.04 2.869 3.999 3.999 0 0 1-2.76 1.301l-.73.09 4.68 6.13h-2.09Zm-8.19-7.66h5.19c2 0 3.22-1 3.22-2.73s-1.2-2.74-3.22-2.74h-5.23l.04 5.47Z"
              fill="#fff"
            />
            <path
              className="logo--text"
              d="M118.35 26.84V12.21h9.83v1.5h-8.11v5.05h7.95v1.5h-7.95v5.07h8.11v1.51h-9.83Z"
              fill="#fff"
            />
            <path
              className="logo--text"
              d="m147.42 26.84-1.54-3.5h-8.27l-1.54 3.5h-1.71l6.39-14.63h2.07l6.39 14.63h-1.79Zm-9.16-5h7l-3.46-7.94-3.54 7.94Z"
              fill="#fff"
            />
            <path
              className="logo--text"
              d="M155.84 26.84V12.21h1.72v13.12h8.11v1.51h-9.83Z"
              fill="#fff"
            />
            <path
              className="logo--text"
              d="M173.93 26.84V13.71h-5.19v-1.5h12.1v1.5h-5.19v13.13h-1.72Z"
              fill="#fff"
            />
            <path
              className="logo--text"
              d="M191.86 26.84v-5.29l-5.61-9.34h1.82l4.67 7.77 4.65-7.77h1.78l-5.59 9.34v5.29h-1.72Z"
              fill="#fff"
            />
          </svg>
        </div>
      </div>
    );
  }
  return <>{children}</>;
};

export default PreLoader;
