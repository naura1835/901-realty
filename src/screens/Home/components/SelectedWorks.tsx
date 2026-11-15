import WorkSkeleton from "@/components/WorkSkeleton";
import { GET_PROJECTS } from "@/lib/api/projects";
import { useQuery } from "@apollo/client/react";
import Link from "next/link";
import { Suspense, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SelectedWorks = () => {
  const { data, loading } = useQuery(GET_PROJECTS, {
    variables: { limit: 4 },
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (typeof window === "undefined") return;

      const container = containerRef.current;
      const scrollContainer = scrollContainerRef.current;
      if (!container || !scrollContainer) return;

      const imgMobileElements = gsap.utils.toArray(".img-wrapper");

      const mm = gsap.matchMedia();

      mm.add("(max-width: 767px)", () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        imgMobileElements.forEach((el: any) => {
          gsap.from(el, {
            yPercent: 10,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          });
        });
      });
      mm.add("(min-width: 768px)", () => {
        const getTotalScroll = () =>
          Math.max(
            0,
            scrollContainer.scrollWidth -
              (container.clientWidth - scrollContainer.offsetLeft),
          );

        gsap.to(scrollContainer, {
          x: () => -getTotalScroll(),
          ease: "none",
          scrollTrigger: {
            trigger: container,
            pin: true,
            scrub: 1,
            start: "center center+=20",
            end: () => `+=${getTotalScroll()}`,
            invalidateOnRefresh: true,
          },
        });
      });
    },
    { scope: containerRef, dependencies: [data], revertOnUpdate: true },
  );

  return (
    <>
      <section ref={containerRef} className="p-5 md:overflow-x-clip lg:px-14">
        <div className="mb-6 flex w-full flex-wrap items-center justify-between">
          <h2 className="text-start text-2xl leading-[130%] font-medium uppercase sm:text-4xl">
            A Selection of our works
          </h2>
          <Link
            href={"/works"}
            className="flex items-center gap-2 font-medium text-nowrap"
          >
            All Projects
            <span className="size-fit rounded-full bg-gray-200 p-1 text-gray-700 [&>svg]:size-4">
              <ArrowRight />
            </span>
          </Link>
        </div>
        {loading ? (
          <></>
        ) : (
          <Suspense fallback={<WorkSkeleton />}>
            <div
              ref={scrollContainerRef}
              className="scroll-container grid w-full grid-cols-1 gap-10 md:ml-10 md:flex md:h-[calc(100dvh-200px)] md:min-w-max md:gap-20 lg:ml-14"
            >
              {data?.projectCollection?.items?.map((project, index) => (
                <Link
                  key={index}
                  href={`/works/${project?.slug}`}
                  className="md:w-[500px] md:shrink-0 md:first:size-[250px] md:odd:h-[80%] md:odd:self-start md:even:h-[80%] md:even:self-end"
                >
                  <div className="flex w-full flex-col gap-4">
                    <div className="img-wrapper h-[200px] w-full sm:h-[250px]">
                      <Image
                        src={project?.featuredImage?.url}
                        alt={
                          project?.featuredImage?.description || project?.title
                        }
                        width={3000}
                        height={3000}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold uppercase">
                        {project?.title || ""}
                      </h3>
                      <p className="text-xs text-gray-600">
                        {project?.location || ""}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Suspense>
        )}
      </section>
    </>
  );
};

export default SelectedWorks;
