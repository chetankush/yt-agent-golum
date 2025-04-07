import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientWrapper from "../../components/ClientWrapper";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import HeroSection from "../../components/HeroSection";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "YouTube Summarizer - AI-Powered Video Insights",
  description: "Extract key insights from any YouTube video in seconds with our AI-powered summarizer. Save time and maximize your learning.",
  keywords: "youtube summarizer, ai, video summary, youtube ai, content extraction",
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
      </body>
    </html>
  );
}
