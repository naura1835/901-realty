"use client";
import ProductSkeleton from "@/components/ProductSkeleton";
import { Button } from "@/components/ui/button";
import { Item, ItemDescription, ItemTitle } from "@/components/ui/item";
import { GET_SMART_PRODUCTS } from "@/lib/api/smart-products";
import { useQuery } from "@apollo/client/react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "@/components/shared/Footer";

gsap.registerPlugin(SplitText, ScrollTrigger, useGSAP);

const SmartHousing = () => {
  const smarthomeRef = useRef<HTMLDivElement>(null);
  const { loading, data, fetchMore } = useQuery(GET_SMART_PRODUCTS, {
    variables: {
      skip: 0,
      limit: 10,
    },
  });

  useGSAP(
    () => {
      const el = smarthomeRef.current;
      if (!el) return;

      SplitText.create(".split", {
        type: "lines",
        onSplit: (self) => {
          gsap.from(self.lines, {
            y: 20,
            autoAlpha: 0,
            delay: 0.4,
            stagger: 0.04,
            scrollTrigger: {
              trigger: ".split",
              start: "top center+=250",
            },
          });
        },
      });

      SplitText.create(".split-sub-heading", {
        type: "chars",
        onSplit: (self) => {
          gsap.from(self.chars, {
            y: 20,
            autoAlpha: 0,
            stagger: {
              each: 0.04,
            },
            scrollTrigger: {
              trigger: ".split-sub-heading",
              start: "top center+=250",
              end: "bottom center",
              toggleActions: "play none reverse pause",
            },
          });
        },
      });

      gsap.from(".house", {
        yPercent: 40,
        scrollTrigger: {
          trigger: ".split-sub-heading",
          start: "top center+=250",
          scrub: 1.5,
        },
      });

      gsap.from(".product", {
        y: 20,
        autoAlpha: 0,
        scrollTrigger: {
          trigger: ".product",
          start: "top center+=250",
        },
      });
    },
    {
      scope: smarthomeRef,
      dependencies: [loading],
    },
  );

  if (loading) return <></>;

  return (
    <div ref={smarthomeRef} className="space-y-8">
      <div className="relative h-dvh w-full">
        <Image
          src="/motion-sensor-light.jpg"
          alt="901 realty container in front of a house construction"
          height={3000}
          width={3000}
          className="h-screen w-full object-cover object-center"
        />
        <h1 className="split absolute top-1/2 left-1/2 w-[12ch] -translate-x-1/2 -translate-y-1/2 transform text-4xl font-semibold text-white uppercase md:text-6xl">
          Smart living
        </h1>
      </div>
      <section className="relative grid grid-cols-1 gap-8 overflow-hidden p-5 sm:p-10 md:grid-cols-2 md:gap-y-0 lg:px-14">
        <div aria-labelledby="smart-housing" className="w-full space-y-3">
          <h2
            id="smart-housing"
            className="split-sub-heading text-2xl font-medium uppercase md:text-3xl lg:text-4xl"
          >
            Smarter Homes,
            <br /> Smarter Living
          </h2>
          <p>
            At 901 Realty, we believe a home should do more than provide
            shelter. it should simplify your life, save energy, and keep you
            secure. That&apos;s why we bring you the latest in smart housing
            gadgets and solutions designed to fit seamlessly into modern living
          </p>
          <div className="space-y-2">
            <Item className="flex-col items-start gap-0 p-0">
              <ItemTitle>
                <p className="text-sm font-medium uppercase md:text-base">
                  Convenience
                </p>
              </ItemTitle>
              <ItemDescription className="text-foreground font-medium">
                Control your home anytime, anywhere.
              </ItemDescription>
            </Item>
            <Item className="flex-col items-start gap-0 p-0">
              <ItemTitle>
                <p className="text-sm font-medium uppercase md:text-base">
                  Efficiency
                </p>
              </ItemTitle>
              <ItemDescription className="text-foreground font-medium">
                Save energy and reduce costs with smart automation.
              </ItemDescription>
            </Item>
            <Item className="flex-col items-start gap-0 p-0">
              <ItemTitle>
                <p className="text-sm font-medium uppercase md:text-base">
                  Security
                </p>
              </ItemTitle>
              <ItemDescription className="text-foreground font-medium">
                Protect your family with advanced surveillance and safety
                systems.
              </ItemDescription>
            </Item>
          </div>
        </div>
        <div className="img-wrapper house h-[300px] w-[90%] max-w-[400px] justify-self-end md:w-full md:place-self-center">
          <Image
            src={"/Image-2025-11-26.jpeg"}
            alt="angle view of house with bricks"
            height={3000}
            width={3000}
            className="h-full w-full object-cover object-[50%_65%]"
          />
        </div>
        <div
          aria-labelledby="smart-gadgets"
          className="space-y-10 md:col-span-2 md:mt-10"
        >
          <h2
            id="smart-gadgets"
            className="text-2xl font-medium uppercase md:text-3xl lg:text-4xl"
          >
            Browse our collection
          </h2>
          <div className="grid gap-10 md:grid-cols-2">
            {/* {Array.from({ length: 10 })
                .flatMap(
                  () => data?.smartHomeInnovationsCollection?.items || [],
                ) */}
            <Suspense fallback={<ProductSkeleton />}>
              {data?.smartHomeInnovationsCollection?.items?.map(
                (item, index) => (
                  <Link
                    key={`${item?.slug}-${index}`}
                    href={`/smart-housing/${item?.slug}`}
                    className="product w-full max-w-[90%] odd:justify-self-start even:justify-self-end" /**md:nth-[3n]:self-center md:nth-[3n]:justify-self-end md:[&:nth-child(4n)>div>div]:h-[450px] */
                  >
                    <div className="flex flex-col gap-2">
                      <p className="text-sm font-semibold uppercase">
                        {item?.name || ""}
                      </p>
                      <div className="img-wrapper h-[350px] w-full">
                        <Image
                          src={item?.featuredImage?.url}
                          alt={item?.featuredImage?.description || item?.name}
                          height={3000}
                          width={3000}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  </Link>
                ),
              )}
            </Suspense>
            {(data?.smartHomeInnovationsCollection?.total || 0) > 10 && (
              <Button
                size="lg"
                className="w-full max-w-56 justify-self-center md:col-span-2"
                onClick={() =>
                  fetchMore({
                    variables: {
                      skip: data?.smartHomeInnovationsCollection?.items?.length,
                    },
                  })
                }
              >
                View More
              </Button>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default SmartHousing;
