"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-[#F9FBFD] px-4 text-center">
      <p className="text-body-text-1 absolute text-[260px] font-bold opacity-15 md:text-[400px]">
        404
      </p>

      <div className="relative z-10 mt-24">
        <p className="mb-2 text-2xl font-semibold text-black md:text-3xl">
          Page not found
        </p>
        <p className="mb-5 max-w-md text-black">
          Sorry, the page you&apos;re looking for doesn&apos;t exist or has been
          moved.
        </p>
        <Button className="w-43 text-sm" onClick={() => router.replace("/")}>
          Go Back
        </Button>
      </div>
    </div>
  );
}
