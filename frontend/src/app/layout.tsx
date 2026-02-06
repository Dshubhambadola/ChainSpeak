import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google"; // Added Space_Grotesk
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ChainSpeak | Talk to Your Blockchain",
  description: "ChainSpeak is an AI-powered Web3 interface that enables users to interact with blockchain networks and DeFi protocols using natural language commands.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.className} antialiased bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white transition-colors duration-300`}
      >
        {children}
      </body>
    </html>
  );
}
