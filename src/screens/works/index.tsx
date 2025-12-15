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

  useGSAP(
    () => {
      if (typeof window === "undefined") return;

      const container = containerRef.current;
      if (!container) return;

      const imageDivs = gsap.utils.toArray(".image-div");

      const totalScroll = container.scrollWidth - window.innerWidth;
      gsap.to(imageDivs, {
        x: () => -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1,
          start: "center center+=20",
          end: () => `+=${totalScroll} + 3000`,
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
            <CarouselContent className="max-h-[500px]">
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
                      className="h-full max-h-[500px] w-full object-cover object-center"
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
          <div
            ref={containerRef}
            className="hidden h-full md:block md:overflow-hidden"
          >
            <div className={`flex h-[calc(100dvh-250px)] min-w-max gap-20`}>
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
          <TitleSection
            title="Works"
            className="bottom-10 left-5 sm:left-10 lg:left-14"
          />
        </Suspense>
      )}
      <div className="h-[900px]"></div>
    </section>
  );
};

export default Works;
