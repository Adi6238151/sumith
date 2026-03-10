import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Sumith Electronics",
  description: "India's pioneering ITMS manufacturer since 2010. Smart & Intelligent Solutions for a Smarter Future.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body
        className="antialiased"
        style={{
          margin: 0,
          padding: 0,
          overflowX: "hidden",
          backgroundColor: "#0f1624", // safer base background
        }}
      >
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
