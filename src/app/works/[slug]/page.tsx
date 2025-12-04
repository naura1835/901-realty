"use client";
import { GET_PROJECT_BY_SLUG, Project } from "@/lib/api/projects";
import { useQuery } from "@apollo/client/react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Item, ItemDescription, ItemTitle } from "@/components/ui/item";
import Footer from "@/components/shared/Footer";
import VideoPlayer from "@/components/shared/VideoPlayer";

const WorkDetails = () => {
  const params = useParams<{ slug: string }>();
  const { data } = useQuery(GET_PROJECT_BY_SLUG, {
    variables: {
      slug: params.slug || "",
    },
  });
  const details: Project | undefined = data?.projectCollection.items[0];

  return (
    <div>
      {details !== undefined && (
        <div className="min-h-screen">
          <div className="relative h-dvh w-full">
            {details?.video?.url ? (
              <VideoPlayer videoUrl={details?.video?.url} />
            ) : (
              <Image
                src={details?.featuredImage?.url}
                alt={
                  details?.featuredImage?.description ||
                  details?.featuredImage?.title ||
                  details?.title
                }
                height={3000}
                width={3000}
                className="h-screen w-full object-cover"
              />
            )}
          </div>

          <div className="my-[50px] grid grid-cols-1 items-end gap-8 px-5 sm:px-10 md:grid-cols-2 md:gap-10 lg:px-14">
            <div className="flex flex-col justify-between gap-5 sm:col-span-2 xl:col-span-1">
              <div className="flex flex-col gap-3">
                <p className="text-foreground text-sm font-bold uppercase">
                  {details.category || ""}
                </p>
                <h1 className="text-foreground text-2xl font-semibold uppercase md:text-3xl lg:text-4xl">
                  {details?.title}
                </h1>
                <p className="text-foreground text-sm leading-[200%] font-medium">
                  {details?.description}
                </p>
              </div>
              <div className="flex w-full flex-col gap-3">
                <Item className="flex-row flex-nowrap items-start justify-between gap-8 px-0 py-2">
                  <ItemTitle>
                    <h3 className="text-sm font-semibold uppercase">
                      Location
                    </h3>
                  </ItemTitle>
                  <ItemDescription className="text-foreground text-sm font-medium text-nowrap uppercase">
                    {details?.location || ""}
                  </ItemDescription>
                </Item>
                <Item className="flex-row flex-nowrap items-start justify-between gap-8 px-0 py-2">
                  <ItemTitle>
                    <h3 className="text-sm font-semibold uppercase">
                      Duration
                    </h3>
                  </ItemTitle>
                  <ItemDescription className="text-foreground text-sm font-medium text-nowrap uppercase">
                    {details?.duration || ""}
                  </ItemDescription>
                </Item>
                <Item className="flex-row flex-nowrap items-start justify-between gap-8 px-0 py-2">
                  <ItemTitle>
                    <h3 className="text-sm font-semibold uppercase">status</h3>
                  </ItemTitle>
                  <ItemDescription className="text-foreground text-sm font-medium uppercase">
                    {details?.status || ""}
                  </ItemDescription>
                </Item>
              </div>
            </div>
            {details?.projectImagesCollection?.items?.map((img, index) => (
              <Image
                key={index}
                src={img.url}
                height={3000}
                width={3000}
                alt={
                  img.description || img.title || `${details?.title}-${index}`
                }
                className="h-[300px] object-cover md:h-[400px]"
              />
            ))}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default WorkDetails;
