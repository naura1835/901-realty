"use client";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  GET_SMART_PRODUCTS_BY_SLUG,
  SmartProduct,
} from "@/lib/api/smart-products";
import { useQuery } from "@apollo/client/react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import VideoPlayer from "@/components/shared/VideoPlayer";
import { Button } from "@/components/ui/button";
import DialogWrapper from "@/components/shared/DialogWrapper";
import ContactForm from "@/components/ContactForm";

const SmartProductDetails = () => {
  const params = useParams<{ slug: string }>();
  const [api, setApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const { data } = useQuery(GET_SMART_PRODUCTS_BY_SLUG, {
    variables: {
      slug: params.slug || "",
    },
  });
  const details: SmartProduct | undefined =
    data?.smartHomeInnovationsCollection.items[0];

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", () => {
      setSelectedIndex(api.selectedScrollSnap());
      api.scrollTo(api.selectedScrollSnap());
    });
  }, [api]);

  const onThumbClick = useCallback(
    (index: number) => {
      if (!api) return;
      api.scrollTo(index);
    },
    [api],
  );

  return (
    <section
      aria-labelledby="title"
      className="relative mt-[100px] grid min-h-screen grid-cols-1 gap-16 p-5 sm:p-10 lg:px-14"
    >
      {details !== undefined && (
        <>
          {details?.videoDemo?.url ? (
            <div className="h-[350px] w-full rounded-md md:h-[500px]">
              <VideoPlayer videoUrl={details?.videoDemo?.url} />
            </div>
          ) : details?.galleryCollection?.items?.length ? (
            <Carousel setApi={setApi}>
              <CarouselContent>
                {details?.galleryCollection?.items?.map((img, index) => (
                  <CarouselItem
                    key={index}
                    className="h-[350px] w-full rounded-md md:h-[500px]"
                  >
                    <Image
                      src={img?.url}
                      alt={img?.description || details?.name || "smart product"}
                      height={3000}
                      width={3000}
                      className="h-full w-full rounded-md object-cover"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <ScrollArea>
                <div className="flex justify-center gap-3">
                  {details?.galleryCollection?.items?.map((img, index) => (
                    <div
                      key={index}
                      className={`mt-8 size-20 rounded-md md:size-40 ${
                        selectedIndex === index
                          ? "inset-ring-foreground inset-ring-2"
                          : ""
                      }`}
                      onClick={() => onThumbClick(index)}
                    >
                      <Image
                        src={img?.url}
                        alt={
                          img?.description || details?.name || "smart product"
                        }
                        height={3000}
                        width={3000}
                        className="h-full w-full rounded-md object-cover object-top"
                      />
                    </div>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </Carousel>
          ) : (
            <></>
          )}
          <div className="mx-auto flex w-full max-w-[800px] flex-col items-center gap-4">
            <h1 className="text-center text-lg font-medium uppercase md:text-4xl">
              {details?.name || ""}
            </h1>
            <div className="flex flex-wrap justify-center gap-3">
              {details?.category?.map((c, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-foreground border-foreground"
                >
                  {c}
                </Badge>
              ))}
            </div>
            <div className="font-medium">
              {documentToReactComponents(details?.description?.json)}
              <div className="mt-2 flex text-base font-medium">
                <p>Interested in this product? </p>
                <Button
                  variant="link"
                  onClick={() => setOpenDialog(true)}
                  className="h-fit cursor-pointer p-0 pl-2 text-base font-semibold underline"
                >
                  Get in touch.
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
      {openDialog && (
        <DialogWrapper
          title="Contact us"
          description="Interested in this product? Send us a message we will reply shortly"
          open={openDialog}
          setOpen={setOpenDialog}
        >
          <ContactForm />
        </DialogWrapper>
      )}
    </section>
  );
};

export default SmartProductDetails;
