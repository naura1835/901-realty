"use client";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import {
  Item,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemMedia,
} from "@/components/ui/item";
import LeafIcon from "../icons/leaf";
import LightBulbIcon from "../icons/light-bulb";
import ShieldIcon from "../icons/shield";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Footer from "@/components/shared/Footer";
import VideoPlayer from "@/components/shared/VideoPlayer";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { useQuery } from "@apollo/client/react";
import { GET_BEHIND_THE_BUILD_ASSETS } from "@/lib/api/assets";

gsap.registerPlugin(SplitText, ScrollTrigger, useGSAP);

const chooseUsItems = [
  {
    imgUrl: "/hallway.jpg",
    title: "Proven Expertise",
    description:
      "Years of successful projects across real estate development, construction, and consulting",
  },
  {
    imgUrl: "/smart-lock.jpg",
    title: "Smart Housing Innovation",
    description:
      "Integrating the latest technology for energy-efficient, future-ready homes",
  },
  {
    imgUrl: "/blueprint.jpg",
    title: "Precision and Quality",
    description:
      "Every project is executed with meticulous attention to detail, craftsmanship, and excellence.",
  },
  {
    imgUrl: "/window pane.jpg",
    title: "Client-Centered Approach",
    description:
      "We listen, collaborate, and bring your vision to life through transparent and personalized service.",
  },
];

const Home = () => {
  const homeRef = useRef<HTMLDivElement>(null);
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  const { data: behindTheBuild } = useQuery(GET_BEHIND_THE_BUILD_ASSETS, {
    variables: {
      titles: [
        "completed toilet",
        "Work in progress toilet build",
        "Glass stair railing",
        "decking",
      ],
      limit: 4,
    },
    fetchPolicy: "cache-first",
  });

  useGSAP(
    () => {
      const container = homeRef.current;
      if (!container) return;
      const textElements = gsap.utils.toArray(".split");
      const imgElements = gsap.utils.toArray(".img-wrapper");
      const serviceInfos = gsap.utils.toArray(".service-info");

      textElements.forEach((el) => {
        const splitEl = el as HTMLElement;
        const split = SplitText.create(splitEl, { type: "chars" });

        gsap.from(split.chars, {
          y: 20,
          autoAlpha: 0,
          stagger: {
            each: 0.04,
          },
          scrollTrigger: {
            trigger: splitEl,
            start: "top center+=250",
            end: "bottom center",
            toggleActions: "restart none reverse pause",
          },
        });
      });

      serviceInfos.forEach((el) => {
        const info = el as HTMLElement;
        gsap.from(info, {
          y: 20,
          autoAlpha: 0,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: info,
            start: "top bottom",
            end: "bottom top",
          },
        });
      });

      imgElements.forEach((el) => {
        const img = el as HTMLElement;

        gsap.from(img, {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: img,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      });
    },
    { scope: homeRef },
  );

  return (
    <div ref={homeRef}>
      <div className="h-screen w-full">
        <VideoPlayer videoUrl="/img_3120_v1-1.mp4" autoPlay showVolumeBtn />
      </div>
      <div className="mt-9 px-5 md:mt-16 lg:px-14">
        <h1 className="mx-auto mb-1 w-full max-w-[880px] text-center text-2xl leading-[130%] font-medium uppercase sm:text-4xl lg:text-5xl">
          Crafting Modern Spaces with Expertise, Innovation & Trust
        </h1>
        <p className="text-center text-base font-medium md:text-lg">
          At 901 Realty, we don&apos;t just construct buildings. we create
          lasting spaces that blend functionality, beauty, and sustainability.
          With a track record of delivering exceptional residential, commercial,
          and smart housing projects, we are committed to shaping communities
          and redefining modern living.
        </p>
        <section
          aria-labelledby="choose-us"
          className="my-12 flex flex-col items-center gap-8 md:mt-24"
        >
          <h2
            id="choose-us"
            className="text-base font-medium uppercase md:text-2xl lg:text-4xl"
          >
            Why Choose Us
          </h2>
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent>
              {chooseUsItems.map((item, index) => (
                <CarouselItem
                  key={index}
                  className="h-[468px] w-full pl-5 sm:max-w-[378px]"
                >
                  <Card className="rounded-[0.75rem] py-0">
                    <CardContent className="relative p-0">
                      <div className="h-[468px] w-full rounded-[0.75rem]">
                        <Image
                          src={item.imgUrl}
                          alt="construction"
                          height={3000}
                          width={3000}
                          className="object-fit h-full w-full rounded-[0.75rem]"
                        />
                      </div>
                      <div className="absolute inset-0 rounded-[0.75rem] bg-black/40"></div>
                      <Item className="absolute bottom-8 left-0">
                        <ItemContent>
                          <ItemTitle>
                            <p className="text-lg font-semibold text-white uppercase">
                              {item.title}
                            </p>
                          </ItemTitle>
                          <ItemDescription className="text-sm font-medium text-white">
                            {item.description}
                          </ItemDescription>
                        </ItemContent>
                      </Item>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="mt-4 flex justify-end gap-2">
              <CarouselPrevious className="relative" />
              <CarouselNext className="relative" />
            </div>
          </Carousel>
        </section>
      </div>
      <section
        aria-labelledby="services we offer"
        id="services"
        className="relative bg-[#212529] py-14 text-white after:absolute after:bottom-0 after:left-1/2 after:h-16 after:w-px after:bg-white/50 after:content-[''] md:after:left-[45%] lg:pt-20"
      >
        <div className="relative grid grid-cols-1 px-5 pb-4 before:absolute before:bottom-0 before:left-0 before:h-px before:w-full before:bg-white/50 before:content-[''] md:grid-cols-2 md:after:absolute md:after:-top-14 md:after:left-[52%] md:after:h-[calc(100%+56px)] md:after:w-px md:after:bg-white/50 md:after:content-[''] lg:px-14 lg:after:-top-20 lg:after:h-[calc(100%+80px)]">
          <h3 className="split z-1 w-[14ch] text-xl font-medium text-white uppercase md:absolute md:left-[40%] md:text-2xl lg:text-4xl">
            Smart housing solutions
          </h3>
          <div className="img-wrapper mx-auto mt-4 mb-8 h-[480px] w-full max-w-[386px]">
            <Image
              src={"/smart-lock.jpg"}
              alt="construction"
              height={3000}
              width={3000}
              className="object-fit h-full w-full"
            />
          </div>
          <div className="space-y-2 md:row-start-1 md:self-center md:justify-self-end">
            <Item className="w-fit flex-col sm:flex-row">
              <ItemMedia variant="default">
                <LeafIcon />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>
                  <p className="text-base text-white uppercase md:text-nowrap">
                    SUSTAINABLE LIVING
                  </p>
                </ItemTitle>
                <ItemDescription className="text-sm text-white">
                  We design homes with energy efficiency and eco-friendly
                  systems at the core
                </ItemDescription>
              </ItemContent>
            </Item>
            <Item className="w-fit flex-col sm:flex-row">
              <ItemMedia variant="default">
                <LightBulbIcon />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>
                  <p className="text-base text-white uppercase md:text-nowrap">
                    SMART INNOVATION
                  </p>
                </ItemTitle>
                <ItemDescription className="text-sm text-white">
                  Convenience meets technology with automation systems that put
                  you in control
                </ItemDescription>
              </ItemContent>
            </Item>
            <Item className="w-fit flex-col sm:flex-row">
              <ItemMedia variant="default">
                <ShieldIcon />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>
                  <p className="text-base text-white uppercase md:text-nowrap">
                    SECURE HOME
                  </p>
                </ItemTitle>
                <ItemDescription className="text-sm text-white">
                  We design homes with energy efficiency and eco-friendly
                  systems at the core
                </ItemDescription>
              </ItemContent>
            </Item>
          </div>
        </div>

        <div className="relative grid grid-cols-1 px-5 pt-10 before:absolute before:-bottom-12 before:left-0 before:h-px before:w-full before:bg-white/50 before:content-[''] after:absolute after:top-[75%] after:left-0 after:h-px after:w-full after:bg-white/50 after:content-[''] md:grid-cols-2 md:after:top-0 md:after:left-[52%] md:after:h-[calc(100%+46px)] md:after:w-px lg:px-14">
          <div className="img-wrapper my-4 h-[400px] w-full max-w-[300px] md:relative md:top-20 md:z-2 md:max-w-[400px]">
            <Image
              src={"/IMG_20251208_184633_444.jpg"}
              alt="construction"
              height={3000}
              width={3000}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="img-wrapper z-3 my-12 h-[400px] w-full max-w-[300px] justify-self-end md:relative md:-top-10 md:left-10 md:max-w-[400px] md:justify-self-center">
            <Image
              src={"/IMG_20251208_184636_615.jpg"}
              alt="construction"
              height={3000}
              width={3000}
              className="h-full w-full object-cover object-top"
            />
          </div>
          <h3 className="split mt-14 mb-7 text-xl font-medium text-white uppercase md:relative md:left-[68px] md:col-start-2 md:row-start-1 md:self-end md:justify-self-start md:text-2xl lg:text-4xl">
            Construction
          </h3>
          <p className="service-info space-y-8 text-sm text-white md:ml-18 md:self-start md:text-xl">
            <span className="block">
              From design to delivery, we build durable, high-quality structures
              on time and within budget. Whether residential, commercial, or
              corporate, every project is handled with precision and safety.
            </span>
            <span className="block">
              We also deliver high-quality renovations that refresh and enhance
              existing spaces. From targeted upgrades to full transformations,
              we focus on improving functionality, aesthetics, and long-term
              value while maintaining the same standards of precision, safety,
              and timely delivery.
            </span>
          </p>
        </div>
        <div className="relative flex flex-col justify-end px-5 pt-10 before:absolute before:-bottom-12 before:left-0 before:h-px before:w-full before:bg-white/50 before:content-[''] after:absolute after:top-[67%] after:right-0 after:h-px after:w-full after:bg-white/50 after:content-[''] md:flex-row md:gap-8 md:after:top-12 md:after:right-1/4 md:after:h-[calc(100%)] md:after:w-px lg:px-14">
          <div className="img-wrapper z-3 my-12 h-[300px] w-full max-w-[300px] md:h-[400px] md:max-w-[400px]">
            <Image
              src={"/901-realty-block.jpeg"}
              alt="blocks-stacked"
              height={3000}
              width={3000}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="mt-12 max-w-[600px] space-y-4 self-center">
            <h3 className="split text-xl font-medium text-white uppercase md:text-2xl lg:text-4xl">
              901 realty blocks
            </h3>
            <p className="service-info text-sm text-white md:col-start-2 md:place-self-center md:text-xl">
              901 Realty Blocks is the manufacturing arm of 901 Realty,
              dedicated to producing durable, high-quality concrete blocks for
              residential, commercial, and large-scale construction projects.
              Built with precision and strict quality control, our blocks are
              designed to meet industry standards for strength, consistency, and
              long-term performance.
            </p>
          </div>
        </div>
        <div className="relative grid grid-cols-1 px-5 pt-10 pb-14 before:absolute before:bottom-2 before:left-0 before:h-px before:w-full before:bg-white/50 before:content-[''] md:grid-cols-2 md:gap-x-8 md:after:absolute md:after:top-12 md:after:left-1/6 md:after:h-[calc(100%-56px)] md:after:w-px md:after:bg-white/50 md:after:content-[''] lg:px-14">
          <div className="img-wrapper z-2 my-12 h-48 w-full max-w-[500px] justify-self-end md:col-start-1 md:row-span-2 md:row-start-1 md:h-[400px]">
            <Image
              src={"/img-001.jpeg"}
              alt="construction"
              height={3000}
              width={3000}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <h3 className="split mb-4 justify-self-end text-xl font-medium text-white uppercase md:row-start-1 md:self-end md:justify-self-start md:text-2xl lg:text-4xl">
            Consulting Services
          </h3>
          <p className="service-info text-sm text-white md:col-start-2 md:justify-self-start md:text-xl">
            Provide strategic guidance and expert insight to elevate your
            project from vision to reality. With refined analysis, precise
            planning, and industry expertise, we help you make confident,
            informed decisions that ensure lasting value and exceptional
            results.
          </p>
        </div>
      </section>
      <section
        aria-labelledby="behind-the-build"
        className="p-5 pb-0 sm:p-10 sm:pb-0 lg:p-14 lg:pb-0"
      >
        <Carousel
          plugins={[plugin.current]}
          opts={{
            loop: true,
          }}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-[auto_2fr] md:gap-5">
            <div className="flex h-full flex-col justify-end">
              <h2
                id="behind-the-build"
                className="split w-[16ch] text-2xl font-medium uppercase md:text-3xl lg:text-4xl"
              >
                Behind the build
              </h2>
              <div className="hidden justify-end gap-2 md:mt-[50%] md:flex">
                <CarouselPrevious className="relative" />
                <CarouselNext className="relative" />
              </div>
            </div>

            <CarouselContent className="aspect-square md:aspect-video">
              {behindTheBuild?.assetCollection.items.map((asset, index) => (
                <CarouselItem
                  key={`${asset.title}-${index}`}
                  className="rounded-[0.75rem] **:rounded-[0.75rem]"
                >
                  <VideoPlayer videoUrl={asset.url} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-end gap-2 md:mt-[50%] md:hidden">
              <CarouselPrevious className="relative" />
              <CarouselNext className="relative" />
            </div>
          </div>
        </Carousel>
      </section>
      <section
        aria-labelledby="start-project"
        className="grid grid-cols-1 gap-16 p-5 sm:p-10 md:grid-cols-2 md:gap-5 lg:p-14"
      >
        <div className="img-wrapper h-[350px] w-full max-w-[300px] justify-self-end md:h-[500px] md:max-w-[400px] md:justify-self-center">
          <Image
            src={"/Image-2025-11-26.jpeg"}
            alt="construction"
            height={3000}
            width={3000}
            className="h-full w-full object-cover object-bottom"
          />
        </div>
        <div className="space-y-4 place-self-center">
          <h2
            id="start-project"
            className="mb-3 text-base font-bold uppercase md:w-[20ch] md:text-2xl lg:text-4xl"
          >
            READY TO START YOUR PROJECT
          </h2>
          <p className="text-sm font-medium md:col-start-2 md:place-self-center md:text-xl">
            Have a vision in mind or questions about our services? We&apos;d
            love to hear from you. Whether it&apos;s building your dream home,
            exploring smart housing, or discussing a commercial project, our
            team is here to help.
          </p>
          <Button size="lg" asChild className="py-6">
            <Link href="/contact-us">TELL US ABOUT YOUR PROJECT</Link>
          </Button>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
