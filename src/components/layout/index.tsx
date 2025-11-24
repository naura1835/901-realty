"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { XIcon } from "lucide-react";
import Image from "next/image";

const menuItems = [
  { id: 0, title: "About us", url: "/about-us" },
  { id: 1, title: "Works", url: "/works" },
  { id: 2, title: "Smart housing", url: "/smart-housing" },
  { id: 3, title: "Services", url: "#" },
  { id: 4, title: "Get in touch", style: "link-btn", url: "/contact-us" },
];

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [openMenu, setOpenMenu] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!isMobile) setOpenMenu(true);
    else setOpenMenu(false);
  }, [isMobile]);

  return (
    <div className="relative">
      <nav className="fixed inset-0 z-1000 mx-5 flex h-fit items-center justify-between pt-10 md:pt-12 lg:mx-14">
        <Link href="/">
          <Image
            src={
              isMobile ? "/Logo--mobile-white.svg" : "/Logo--desktop-white.svg"
            }
            alt="901 Realty logo"
            height={500}
            width={500}
            className="h-10 w-fit mix-blend-difference invert"
          />
        </Link>
        <div
          className={`relative before:absolute before:top-0 before:right-0 before:z-10 before:block before:h-80 before:w-[calc(100vw-3rem)] before:origin-top-right before:transform before:rounded-md before:bg-white before:shadow-sm before:inset-shadow-2xs before:transition-transform before:duration-300 before:ease-in-out before:content-[''] ${
            openMenu && isMobile
              ? "before:scale-100"
              : "before:scale-0 before:delay-500"
          }`}
        >
          <Button
            size="lg"
            className={`text-foreground relative cursor-pointer rounded-md bg-white text-xs font-semibold uppercase shadow-sm inset-shadow-2xs hover:bg-white md:hidden ${openMenu && isMobile ? "-z-1 *:first:opacity-0" : "z-0"}`}
            onClick={() => setOpenMenu(!openMenu)}
          >
            <span>Menu</span>
            <div
              className={`*:bg-foreground relative flex flex-col *:block *:h-0.5 ${openMenu ? "gap-0 *:absolute *:right-0" : "gap-1"}`}
            >
              <span className="w-5" />
              <span className="w-4" />
              <span className="w-3" />
            </div>
          </Button>

          <ul
            className={`transition-display absolute top-0 right-0 z-20 flex list-none flex-col items-start rounded-md bg-white p-4 shadow-sm inset-shadow-2xs md:relative md:flex-row md:items-center md:p-2 md:pl-4 ${openMenu && isMobile ? "visible w-[calc(100vw-3rem)] bg-transparent shadow-none! inset-shadow-transparent! transition-all delay-500" : "invisible md:visible"}`}
          >
            <span
              className="cursor-pointer self-end md:hidden"
              onClick={() => setOpenMenu(false)}
            >
              <XIcon />
            </span>

            {menuItems.map((item) => (
              <li
                key={item.id}
                onMouseEnter={() => setHovered(item.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <Link
                  href={item.url}
                  onClick={() => setOpenMenu(false)}
                  className={`inline-block text-xs font-semibold uppercase transition-opacity duration-75 ease-linear ${
                    item.style === "link-btn"
                      ? "bg-foreground rounded-md px-4 py-3 text-white"
                      : "py-4 md:px-3 md:py-0"
                  } ${
                    hovered !== null && hovered !== item.id && !item.style
                      ? "opacity-30"
                      : "opacity-100"
                  } `}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <main>
        {/* <div className="h-[50vh]"></div> */}
        {/* className="px-5 lg:px-14" */}
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
