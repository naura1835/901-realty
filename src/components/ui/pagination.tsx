import * as React from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  );
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />;
}

type PaginationButtonProps = {
  isActive?: boolean;
  children?: React.ReactNode;
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ComponentProps<"button">;

function PaginationButton({
  className,
  isActive,
  disabled = false,
  size = "icon",
  ...props
}: PaginationButtonProps) {
  return (
    <button
      data-slot="pagination-button"
      data-active={isActive}
      disabled={disabled}
      className={cn(
        buttonVariants({
          variant: isActive ? "outline" : "ghost",
          size,
        }),
        className,
      )}
      {...props}
    />
  );
}

function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof PaginationButton>) {
  return (
    <PaginationButton
      aria-label="Go to previous page"
      size="default"
      className={cn(
        "size-12 gap-1 rounded-full bg-[#D3D3D3] px-2.5 hover:bg-[#D3D3D3]/90 sm:pl-2.5",
        className,
      )}
      {...props}
    >
      <ChevronLeftIcon className="text-foreground size-6" />
      <span className="hidden sm:block">Previous</span>
    </PaginationButton>
  );
}
function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof PaginationButton>) {
  return (
    <PaginationButton
      aria-label="Go to next page"
      size="default"
      className={cn(
        "size-12 gap-1 rounded-full bg-[#D3D3D3] px-2.5 hover:bg-[#D3D3D3]/90 sm:pr-2.5",
        className,
      )}
      {...props}
    >
      <span className="hidden sm:block">Next</span>
      <ChevronRightIcon className="text-foreground size-6" />
    </PaginationButton>
  );
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  );
}
export {
  Pagination,
  PaginationContent,
  PaginationButton,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
