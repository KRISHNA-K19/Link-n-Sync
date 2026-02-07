import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Link n Sync - Real-time Messaging",
  description: "A modern real-time messaging application built with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
