import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SocketProvider } from "../context/SocketProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FreeChat - Realtime ChatApp",
  description: "Generated by Node, Next.js, Socket.io, Redis",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <SocketProvider>
      <body className={inter.className}>{children}</body>
      </SocketProvider>
    </html>
  );
}