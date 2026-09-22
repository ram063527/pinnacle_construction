import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import WhatsAppButton from "@/app/components/WhatsAppButton";
import AnimationProvider from "@/app/components/AnimationProvider";
import StructuredData from "@/app/components/StructuredData";

// Everything a visitor sees. /studio sits outside this group so the editor gets the
// full screen instead of rendering between the site header and footer.
export default function SiteLayout({ children }) {
  return (
    <AnimationProvider>
      <StructuredData />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton />
    </AnimationProvider>
  );
}
