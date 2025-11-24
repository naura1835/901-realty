import TitleSection from "@/components/shared/TitleSection";

const Works = () => {
  return (
    <section
      aria-labelledby="section-title"
      className="relative mt-[100px] grid grid-cols-1 gap-8 p-5 sm:p-10 md:grid-cols-2 md:gap-y-0 lg:px-14"
    >
      <TitleSection
        title="Works"
        className="bottom-10 left-5 sm:left-10 lg:left-14"
      />
    </section>
  );
};

export default Works;
