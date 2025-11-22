import { cn } from "@/lib/utils";

const TitleSection = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  return (
    <h2
      id="section-title"
      className={cn(
        "fixed bottom-0 left-0 text-6xl font-semibold uppercase",
        className,
      )}
    >
      {title}
    </h2>
  );
};

export default TitleSection;
