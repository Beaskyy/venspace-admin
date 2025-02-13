import type { Metadata } from "next";
import { Red_Hat_Display } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "@/provider/toast-container";
import ClientOnly from "@/components/client-only";

const redHatDisplay = Red_Hat_Display({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Venspace Super Admin",
  description: "Venspace Super Admin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={redHatDisplay.className}>
        <ClientOnly>
          <ToastContainer />
          {children}
        </ClientOnly>
      </body>
    </html>
  );
}
