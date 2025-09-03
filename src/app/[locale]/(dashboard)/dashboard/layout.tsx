import { Geist } from "next/font/google";
import type { ReactNode } from "react";
import { Providers } from "@/components/heroui/provider";

const geist = Geist({
  display: "swap",
  subsets: [
    "latin",
  ],
  variable: "--font-geist",
});

export default function UserDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Providers>
      <main className={`${geist.className} antialiased min-h-screen`}>
        {children}
      </main>
    </Providers>
  );
}
