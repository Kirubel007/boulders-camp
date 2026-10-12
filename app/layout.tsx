import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/content";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import StickyEnquiry from "@/components/StickyEnquiry";

// Brand fonts: an elegant light serif for headlines, a clean geometric sans for text.
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://boulders-camp.vercel.app"),
  title: site.seo.title,
  description: site.seo.description,
  openGraph: {
    title: site.seo.title,
    description: site.seo.description,
    images: [site.seo.ogImage],
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable} antialiased`}>
      <body className="min-h-screen">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-sand focus:p-3">
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <StickyEnquiry />
      </body>
    </html>
  );
}
