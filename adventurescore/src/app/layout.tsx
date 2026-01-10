import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from '@/components/layout/header';
import { MobileNav } from '@/components/layout/mobile-nav';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AdventureScore - Track Your Adventures",
  description: "Gamified travel tracking platform. Log adventures, earn points, climb ranks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="pb-20 md:pb-0">{children}</main>
        <MobileNav />
      </body>
    </html>
  );
}
