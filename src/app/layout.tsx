import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientWrapper from "../../components/ClientWrapper";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { DevTools } from '@/components/DevTools';
// import HeroSection from "../../components/HeroSection";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ProductReviewAI - AI-Powered YouTube Summaries & Product Comparisons",
  description: "Save time on product research. Get AI-powered summaries of YouTube reviews and compare products across e-commerce platforms within your budget.",
  keywords: "product comparison, youtube summaries, product reviews, ai shopping assistant, budget shopping",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        <ClientWrapper>
          <Header/>

          <main>{children}</main>

          <Footer/>
        </ClientWrapper>
        <DevTools />
      </body>
    </html>
  );
}
