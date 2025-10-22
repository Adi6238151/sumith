import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Website",
  description: "Built with Next.js and Sanity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
