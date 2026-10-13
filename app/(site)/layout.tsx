import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBar from "@/components/MobileBar";
import MapWidget from "@/components/MapWidget";

// Shared shell for the story pages. The /plan flow has its own minimal shell.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <MobileBar />
      <MapWidget />
    </>
  );
}
