import type { Metadata } from "next";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";

// import { Geist, Geist_Mono } from "next/font/google";
import { Exo } from "next/font/google";
import Common from "@/utils/common";

const exo = Exo({ subsets: ["latin"] });

import "./globals.css";

export const metadata: Metadata = {
  title:
    "Payyng App - Revolutionalizing Bill Payment And Remittance In Nigeria",
  description:
    "Payyng is a financial technology company that provides a platform for bill payment, remittance, and other financial services in Nigeria.",
  keywords: [
    "bill payment",
    "airtime top-up",
    "data subscription",
    "cable TV subscription",
    "electricity bill payment",
    "internet subscription",
    "payyng",
    "payyng bills payment",
    "USD account",
    "USD account in Nigeria",
    "EUR account in Nigeria",
    "EUR account",
    "GBP account",
    "GBP account in Nigeria",
    "NGN account",
    "NGN account in Nigeria",
    "Remmitance in Nigera",
    "Remmitance",
    "Payyng App",
    "Payyng Technologies",
    "card deposits in Nigeria",
    "card deposit",
    "financial applications in nigeria",
    "financial technology in Nigeria",
    "fintech in Nigeria",
    "Nigeria Fintech",
  ],
  metadataBase: new URL("https://payyng.com"),
  openGraph: {
    siteName:
      "Payyng App - Revolutionalizing Bill Payment And Remittance In Nigeria",
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: "index, follow",
  },
  alternates: {
    types: {
      "application/rss+xml": "https://payyng.com/rss.xml",
    },
  },
  applicationName:
    "Payyng App - Revolutionalizing Bill Payment And Remittance In Nigeria",
  appleWebApp: {
    title:
      "Payyng App - Revolutionalizing Bill Payment And Remittance In Nigeria",
    statusBarStyle: "default",
    capable: true,
  },
  verification: {
    google: "YOUR_DATA",
    yandex: ["YOUR_DATA"],
    other: {
      "msvalidate.01": ["YOUR_DATA"],
      "facebook-domain-verification": ["YOUR_DATA"],
    },
  },
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        type: "image/x-icon",
      },
      {
        url: "/icon512_rounded.png",
        sizes: "16x16",
        type: "image/png",
      },
      // add favicon-32x32.png, favicon-96x96.png, android-chrome-192x192.png
    ],
    shortcut: [
      {
        url: "/favicon.ico",
        type: "image/x-icon",
      },
    ],
    apple: [
      {
        url: "/icon512_rounded.png",
        sizes: "57x57",
        type: "image/png",
      },
      {
        url: "/icon512_rounded.png",
        sizes: "60x60",
        type: "image/png",
      },
      // add apple-icon-72x72.png, apple-icon-76x76.png, apple-icon-114x114.png, apple-icon-120x120.png, apple-icon-144x144.png, apple-icon-152x152.png, apple-icon-180x180.png
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <GoogleAnalytics gaId="G-JN6RYVQYV4" />

      <Common>
        <body className={`${exo.className}  antialiased`}>{children}</body>
      </Common>

      <Script id="clarity-script" strategy="afterInteractive">
        {` (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "qfbu76rrtt");
          `}
      </Script>
    </html>
  );
}
// ${geistMono.variable}
