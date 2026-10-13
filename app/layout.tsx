import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/content";

// Brand fonts: an elegant light serif for headlines, a clean geometric sans for text.
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://boulders-camp.vercel.app"),
  title: site.seo.title,
  description: site.seo.description,
  openGraph: {
    title: site.seo.title,
    description: site.seo.description,
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable} antialiased`}>
      <body className="min-h-screen">
        <a href="#main" className="text-label sr-only min-h-11 bg-sand p-4 focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70]">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
