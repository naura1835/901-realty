import { Skeleton } from "./ui/skeleton";

const WorkSkeleton = () => {
  return (
    <>
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="flex w-full flex-col space-y-3 md:hidden">
          <Skeleton className="h-full max-h-[500px] w-full" />
          <div className="mt-4 flex justify-end gap-2">
            <Skeleton className="h-12 w-12 rounded-full" />
            <Skeleton className="h-12 w-12 rounded-full" />
          </div>
        </div>
      ))}
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="hidden w-[500px] shrink-0 first:size-[250px] odd:h-[80%] odd:self-start even:h-[80%] even:self-end md:block"
        >
          <Skeleton className="h-full w-full" />
        </div>
      ))}
    </>
  );
};

export default WorkSkeleton;
