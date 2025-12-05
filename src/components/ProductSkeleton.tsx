import { Skeleton } from "./ui/skeleton";

const ProductSkeleton = () => {
  return (
    <>
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="flex w-full max-w-[90%] flex-col space-y-3 odd:justify-self-start even:justify-self-end"
        >
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-[350px] w-full" />
        </div>
      ))}
    </>
  );
};

export default ProductSkeleton;
