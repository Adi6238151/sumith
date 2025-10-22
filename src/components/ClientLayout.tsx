"use client";
import BusScrollBar from "@/components/BusScrollBar"; // Adjust path as necessary

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <BusScrollBar />
    </>
  );
}
