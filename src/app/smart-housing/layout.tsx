import Footer from "@/components/shared/Footer";

const SmartLivingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <Footer />
    </>
  );
};

export default SmartLivingLayout;
