"use client";
import { Item, ItemDescription, ItemTitle } from "@/components/ui/item";
import Image from "next/image";

const SmartHousingPage = () => {
  return (
    <div>
      <div className="relative h-dvh">
        <Image
          src="/901-realty-container.jpg"
          alt="901 realty container in front of a house construction"
          height={3000}
          width={3000}
          className="h-screen w-full object-cover object-top"
        />
        <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-6xl font-semibold text-white uppercase">
          Smart house
        </h1>
      </div>
      <section className="relative mt-8 grid grid-cols-1 gap-8 p-5 sm:p-10 md:grid-cols-2 md:gap-y-0 lg:px-14">
        <div aria-labelledby="smart-housing" className="space-y-3">
          <h2
            id="smart-housing"
            className="text-2xl font-medium uppercase md:text-3xl lg:text-4xl"
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
        <div className="place-self-center">
          {/* <Image
            src={"/construction-img.jpeg"}
            alt="construction"
            height={3000}
            width={3000}
            className="h-full w-full object-cover object-center"
          /> */}
        </div>
        <div
          aria-labelledby="smart-gadgets"
          className="col-span-2 mt-10 space-y-10"
        >
          <h2
            id="smart-gadgets"
            className="text-2xl font-medium uppercase md:text-3xl lg:text-4xl"
          >
            Browse our collection
          </h2>
        </div>
      </section>
    </div>
  );
};

export default SmartHousingPage;
