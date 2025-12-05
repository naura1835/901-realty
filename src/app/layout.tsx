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
  title: {
    template: "%s | 901 Realty",
    default: "901 Realty",
  },
  description: "Building with precision one block at a time",
  applicationName: "901 Realty Web",
  creator: "Khadija Gwarzo",
  // metadataBase: new URL('https://base_url'),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },
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
        <Toaster
          position="top-center"
          closeButton
          toastOptions={{
            classNames: {
              description: "!text-foreground",
            },
          }}
        />
      </body>
    </html>
  );
}
