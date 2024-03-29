import { ConvexClientProvider } from "@/providers/convex-client-provide";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Toaster } from "@/components/ui/sonner";
import { ModalProvider } from "@/providers/modalProvider";
import { Suspense } from "react";
import { Loading } from "@/components/auth/Loading";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Partnote",
  description: "make a important note together",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={<Loading />}>
          <ConvexClientProvider>
            <Toaster />
            <ModalProvider />
            {children}
          </ConvexClientProvider>
        </Suspense>
      </body>
    </html>
  );
}
