import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Capstone Skeleton",
  description: "A simple capstone application starter.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const appName = process.env.NEXT_PUBLIC_APP_NAME || "Capstone Skeleton";

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-slate-50 text-slate-900">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <Link href="/" className="text-lg font-semibold text-slate-950">
              {appName}
            </Link>
            <nav aria-label="Main navigation" className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium">
              <Link className="hover:text-teal-700" href="/">Home</Link>
              <Link className="hover:text-teal-700" href="/dashboard">Dashboard</Link>
              <Link className="hover:text-teal-700" href="/settings">Settings</Link>
              <Link className="hover:text-teal-700" href="/profile">Profile</Link>
              <Link className="hover:text-teal-700" href="/health">Health</Link>
            </nav>
          </div>
        </header>
        <main className="w-full flex-1">{children}</main>
      </body>
    </html>
  );
}
