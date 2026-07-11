import type { Metadata, Viewport } from "next";

import { BackToTop } from "@/components/back-to-top";
import { CustomCursor } from "@/components/custom-cursor";
import { Footer } from "@/components/footer";
import { Navigation } from "@/components/navigation";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { profile } from "@/lib/data";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://nithissh.dev"),
  title: {
    default: `${profile.displayName} — AI Engineer & Full Stack Developer`,
    template: `%s — ${profile.displayName}`
  },
  description:
    "Portfolio of Nithissh S G — AI & Machine Learning Engineer, Full Stack Developer, and Product Builder.",
  applicationName: `${profile.displayName} Portfolio`,
  authors: [{ name: profile.displayName }],
  creator: profile.displayName,
  keywords: [
    "Nithissh S G",
    "AI Engineer",
    "Machine Learning",
    "Full Stack Developer",
    "Computer Vision",
    "NLP",
    "Portfolio"
  ],
  openGraph: {
    title: `${profile.displayName} — AI Engineer & Full Stack Developer`,
    description:
      "AI, machine learning, computer vision, NLP, and full stack projects.",
    url: "https://nithissh.dev",
    siteName: `${profile.displayName} Portfolio`,
    images: [
      {
        url: "/images/hero-portrait.jpg",
        width: 1024,
        height: 1536,
        alt: `${profile.displayName} portfolio`
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.displayName} — AI Engineer`,
    description: "Portfolio of AI systems, full stack apps, and product engineering.",
    images: ["/images/hero-portrait.jpg"]
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg"
  },
  manifest: "/site.webmanifest"
};

export const viewport: Viewport = {
  themeColor: "#f5f2ec",
  colorScheme: "light"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Instrument+Serif:ital@0;1&family=Syne:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        <SmoothScrollProvider>
          <CustomCursor />
          <Navigation />
          {children}
          <Footer />
          <BackToTop />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
