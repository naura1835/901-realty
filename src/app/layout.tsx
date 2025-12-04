import type { Metadata } from "next";
import { Geist, Montserrat } from "next/font/google";
import "./globals.css";
import MainLayout from "@/components/layout";
import Providers from "@/components/layout/Providers";
import { Toaster } from "@/components/ui/sonner";
import PreLoader from "@/components/layout/PreLoader";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "901 Realty",
  description: "Building with precision one block at a time",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${montserrat.variable} antialiased`}
      >
        <Providers>
          <PreLoader>
            <MainLayout>{children}</MainLayout>
          </PreLoader>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
