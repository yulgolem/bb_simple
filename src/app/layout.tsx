import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Background } from "@/components/Background";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bullshit Bingo",
  description: "MVP: анонимная игра бинго для встреч.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className="dark h-full">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased h-full bg-neutral-950 text-neutral-100`}>
        <Background />
        <div className="min-h-dvh flex flex-col">
          <header className="border-b border-neutral-800 sticky top-0 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/70">
            <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
              <div className="text-lg font-semibold tracking-tight">Bullshit Bingo</div>
              <a href="https://github.com/" target="_blank" rel="noreferrer" className="text-sm text-neutral-400 hover:text-white">GitHub</a>
            </div>
          </header>
          <main className="flex-1 mx-auto w-full max-w-6xl px-4 py-6">
            {children}
          </main>
          <footer className="border-t border-neutral-800">
            <div className="mx-auto max-w-6xl px-4 py-6 text-xs text-neutral-500">MVP по PRD. Без регистрации, анонимно.</div>
          </footer>
        </div>
      </body>
    </html>
  );
}
