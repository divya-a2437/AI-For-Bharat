import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import PageWrapper from "@/components/PageWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ghostwriter | Exam Predictor",
  description: "AI-powered exam probability analysis",
  icons: {
    icon: "/ghostwriter-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#020202] text-white selection:bg-violet-500/30`}>
        <div className="flex h-screen overflow-hidden">
          {/* Dashboard Sidebar */}
          <Sidebar />

          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto relative bg-[#020202]">
            <PageWrapper>
              {children}
            </PageWrapper>
          </main>
        </div>
      </body>
    </html>
  );
}