import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader"
import SiteFooter from "@/components/SiteFooter"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mi blog",
  description: "Frontend conectado a la API de 0xPhantom",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
<body
  suppressHydrationWarning
  className="m-0 min-h-screen bg-zinc-950 text-zinc-100 overflow-x-hidden"
>
  <SiteHeader />
  <div className="flex-1">{children}</div>
  <SiteFooter />
</body>
    </html>
  );
}
