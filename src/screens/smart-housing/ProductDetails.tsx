"use client";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
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
import { useState } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import VideoPlayer from "@/components/shared/VideoPlayer";
import { Button } from "@/components/ui/button";
import DialogWrapper from "@/components/shared/DialogWrapper";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/shared/Footer";

const SmartProductDetails = () => {
  const params = useParams<{ slug: string }>();
  const [openDialog, setOpenDialog] = useState(false);
  const { data, loading } = useQuery(GET_SMART_PRODUCTS_BY_SLUG, {
    variables: {
      slug: params.slug || "",
    },
    fetchPolicy: "cache-first",
  });
  const details: SmartProduct | undefined =
    data?.smartHomeInnovationsCollection.items[0];

  if (loading) return <></>;

  return (
    <>
      <section
        aria-labelledby="title"
        className="relative mt-[100px] grid min-h-screen grid-cols-1 gap-8 p-5 sm:p-10 lg:px-14"
      >
        {details !== undefined && (
          <>
            {details?.galleryCollection?.items?.length ? (
              <Carousel>
                <CarouselContent>
                  {details?.galleryCollection?.items?.map((img, index) => (
                    <CarouselItem
                      key={index}
                      className="h-[400px] min-w-[230px] basis-auto cursor-grab pl-1.5 md:h-[300px]"
                    >
                      <Image
                        src={img?.url}
                        alt={
                          img?.description || details?.name || "smart product"
                        }
                        height={3000}
                        width={3000}
                        className="h-full w-full object-cover"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {/* <ScrollArea>
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
                          className="h-full w-full rounded-md object-cover object-center"
                        />
                      </div>
                    ))}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea> */}
              </Carousel>
            ) : (
              details?.videoDemo?.url && (
                <div className="h-[350px] w-full rounded-md md:h-[500px]">
                  <VideoPlayer videoUrl={details?.videoDemo?.url} />
                </div>
              )
            )}
            <div className="mx-auto flex w-full max-w-[800px] flex-col items-center gap-4">
              <p className="text-sm font-semibold uppercase">
                {details?.availability || ""}
              </p>
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
                {/* {details?.videoDemo?.url && (
                  <div className="h-[350px] w-full rounded-md md:h-[500px]">
                    <VideoPlayer videoUrl={details?.videoDemo?.url} />
                  </div>
                )} */}

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
      <Footer />
    </>
  );
};

export default SmartProductDetails;
