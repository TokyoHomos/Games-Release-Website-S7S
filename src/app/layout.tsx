import type { Metadata, Viewport } from "next";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

import "./globals.css";

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: "GameSignal — Release intelligence",
    template: "%s · GameSignal",
  },
  description:
    "Track game releases, industry news, and source credibility in one focused place.",
  applicationName: "GameSignal",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "GameSignal",
    title: "GameSignal — Release intelligence",
    description:
      "Track game releases, industry news, and source credibility in one focused place.",
  },
  twitter: {
    card: "summary",
    title: "GameSignal — Release intelligence",
    description:
      "Track game releases, industry news, and source credibility in one focused place.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#09090b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <a
          href="#main-content"
          className="focus:bg-primary sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-md focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
