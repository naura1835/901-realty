"use client";
import TitleSection from "@/components/shared/TitleSection";
import { GET_PROJECTS } from "@/lib/api/projects";
import { useQuery } from "@apollo/client/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WorkSkeleton from "@/components/WorkSkeleton";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Works = () => {
  const { data, loading } = useQuery(GET_PROJECTS);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (typeof window === "undefined") return;

      const container = containerRef.current;
      const scrollContainer = scrollContainerRef.current;
      if (!container || !scrollContainer) return;

      const imageDivs = gsap.utils.toArray(".image-div");

      const totalScroll = scrollContainer.scrollWidth - window.innerWidth;
      gsap.to(scrollContainer, {
        xPercent: -100 * (imageDivs.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1,
          start: "center center+=20",
          end: () => `+=${totalScroll}`,
          invalidateOnRefresh: true,
        },
      });
      ScrollTrigger.refresh();
    },
    { scope: containerRef, dependencies: [data] },
  );

  return (
    <section
      aria-labelledby="section-title"
      className="relative mt-[100px] flex flex-col justify-center gap-8 p-5 sm:p-10 md:justify-start md:gap-y-0 lg:px-14"
    >
      {loading ? (
        <></>
      ) : (
        <Suspense fallback={<WorkSkeleton />}>
          <Carousel className="w-full md:hidden">
            <CarouselContent>
              {data?.projectCollection?.items?.map((project, index) => (
                <CarouselItem key={index} className="w-full">
                  <Link href={`/works/${project?.slug}`}>
                    <Image
                      src={project?.featuredImage?.url}
                      alt={
                        project?.featuredImage?.description || project?.title
                      }
                      width={3000}
                      height={3000}
                      className="h-full max-h-[60vh] w-full object-cover object-center"
                    />
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="mt-4 flex justify-end gap-2">
              <CarouselPrevious className="relative" />
              <CarouselNext className="relative" />
            </div>
          </Carousel>
          <div ref={containerRef} className="hidden md:block">
            <div
              ref={scrollContainerRef}
              className={`scroll-container ml-10 flex h-[calc(100dvh-250px)] min-w-max gap-20 lg:ml-14`}
            >
              {data?.projectCollection?.items?.map((project, index) => (
                <div
                  key={index}
                  className="image-div w-[500px] shrink-0 first:size-[250px] odd:h-[80%] odd:self-start even:h-[80%] even:self-end"
                >
                  <Link
                    href={`/works/${project?.slug}`}
                    className="img-wrapper"
                  >
                    <Image
                      src={project?.featuredImage?.url}
                      alt={
                        project?.featuredImage?.description || project?.title
                      }
                      width={3000}
                      height={3000}
                      className="h-full w-full object-cover"
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div
            className="scroll-height relative block w-full"
            style={{
              height: `${(data?.projectCollection?.items?.length || 5) * 10}vh`,
            }}
          ></div>
          <TitleSection
            title="Works"
            className="bottom-10 left-5 sm:left-10 lg:left-14"
          />
        </Suspense>
      )}
    </section>
  );
};

export default Works;
