import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kemper Design Services | Web Design & Development",
  description: "Professional web design, UX/UI, and development services for businesses",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  keywords: ["web design", "development", "UI/UX", "design services"],
  openGraph: {
    title: "Kemper Design Services",
    description: "Professional web design, UX/UI, and development services",
    type: "website",
    url: "https://kemperdesignservices.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
