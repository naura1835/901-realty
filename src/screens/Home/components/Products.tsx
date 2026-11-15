import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { GET_SMART_PRODUCTS } from "@/lib/api/smart-products";
import { useQuery } from "@apollo/client/react";
import Image from "next/image";
import { Suspense } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import ProductSkeleton from "@/components/ProductSkeleton";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Products = () => {
  const productsRef = useRef<HTMLDivElement>(null);
  const { loading, data } = useQuery(GET_SMART_PRODUCTS, {
    variables: {
      skip: 0,
      limit: 4,
    },
  });

  useGSAP(
    () => {
      const el = productsRef.current;
      if (!el) return;

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
      scope: productsRef,
      dependencies: [loading],
    },
  );

  if (loading) return <></>;

  return (
    <section className="p-5 md:pt-14 lg:px-14">
      <div className="mb-6 flex flex-wrap items-center justify-between">
        <div>
          <h2 className="text-start text-2xl leading-[130%] font-medium uppercase sm:text-4xl">
            Browse our collection
          </h2>
          <p className="text-sm">
            Elevate your space with our selected products.
          </p>
        </div>
        <Link
          href={"/works"}
          className="flex items-center gap-2 font-medium text-nowrap"
        >
          All Products
          <span className="size-fit rounded-full bg-gray-200 p-1 text-gray-700 [&>svg]:size-4">
            <ArrowRight />
          </span>
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-4 lg:grid-cols-6">
        <Suspense fallback={<ProductSkeleton />}>
          {(data?.smartHomeInnovationsCollection?.total || 0) > 0 &&
            data?.smartHomeInnovationsCollection?.items?.map((item, index) => (
              <Link
                key={`${item?.slug}-${index}`}
                href={`/smart-housing/${item?.slug}`}
                className="product w-full lg:nth-[1]:col-span-3"
              >
                <div className="flex flex-col gap-2">
                  <div className="img-wrapper h-[350px] w-full">
                    <Image
                      src={item?.featuredImage?.url}
                      alt={item?.featuredImage?.description || item?.name}
                      height={3000}
                      width={3000}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <p className="text-sm font-semibold uppercase">
                    {item?.name || ""}
                  </p>
                </div>
              </Link>
            ))}
        </Suspense>
      </div>
    </section>
  );
};

export default Products;
