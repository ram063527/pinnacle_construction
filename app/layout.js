import { Sora, Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import AnimationProvider from "./components/AnimationProvider";
import StructuredData from "./components/StructuredData";
import { SITE_NAME, SITE_URL } from "@/sanity/lib/site";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const DESCRIPTION =
  "15 years, 43 projects completed, 521 happy clients. Explore Pinnacle Construction's ongoing, upcoming, and completed residential projects in Nagpur, and book a site visit today.";

// A real photograph of a finished building, not a logo card. Most leads arrive by
// someone forwarding a link on WhatsApp, and this is the image they see.
const OG_IMAGE = {
  url: "/images/dravin-enclave/exterior-day.jpg",
  width: 1280,
  height: 930,
  alt: "A Pinnacle Construction residential project in Nagpur",
};

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Trusted Builders in Nagpur`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_IN",
    url: SITE_URL,
    title: `${SITE_NAME} | Trusted Builders in Nagpur`,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Trusted Builders in Nagpur`,
    description: DESCRIPTION,
    images: [OG_IMAGE.url],
  },
};

const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('pinnacle-theme');
    var theme = stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', theme === 'dark');
  } catch (e) {}
})();
`;

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <StructuredData />
      </head>
      <body className="min-h-full flex flex-col bg-surface text-ink">
        <AnimationProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
        </AnimationProvider>
      </body>
    </html>
  );
}
