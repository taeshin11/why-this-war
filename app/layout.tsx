import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import VisitorCounter from "@/components/VisitorCounter";
import AdHeader from "@/components/ads/AdHeader";
import AdMobileSticky from "@/components/ads/AdMobileSticky";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Why This War — Conflict Explainer | Understand Every War",
  description: "Clear explainers for every major ongoing conflict: what's happening, who's involved, why it started.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-gray-50">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="font-bold text-lg text-gray-900">🌍 Why This War</Link>
            <nav className="flex gap-4 text-sm text-gray-600">
              <Link href="/" className="hover:text-gray-900">Home</Link>
              <Link href="/about" className="hover:text-gray-900">About</Link>
            </nav>
          </div>
          <AdHeader />
        </header>
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">{children}</main>
        <footer className="bg-white border-t border-gray-200 py-4 mt-8">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between text-xs text-gray-400">
            <span>© 2026 Why This War</span>
            <VisitorCounter />
          </div>
        </footer>
        <AdMobileSticky />
      </body>
    </html>
  );
}
