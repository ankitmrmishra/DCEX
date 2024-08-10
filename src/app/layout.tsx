import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Providers from "./Providers";
import { cn } from "@/lib/utils";
import WalletAdapter from "./components/WalletAdapter";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DCEX",
  description: "A decentralized Excchange",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <WalletAdapter>
          <Providers>
            <Navbar />

            {children}
          </Providers>
        </WalletAdapter>
      </body>
    </html>
  );
}
