import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LogoutButton from '@/components/LogoutButton';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Interior Health",
  description: "Bringing affordable healthcare to underserved regions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900 min-h-screen`}
      >
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Optional Global Components */}
          <LogoutButton />
          {children}
        </div>
      </body>
    </html>
  );
}
