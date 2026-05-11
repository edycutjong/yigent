import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yigent.edycu.dev"),
  title: "Yigent - Intent-to-DeFi Terminal",
  description: "AI-powered intent-to-DeFi terminal powered by Birdeye, DFlow, Kamino, Solflare, and Quicknode.",
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    title: "Yigent - Intent-to-DeFi Terminal",
    description: "AI-powered intent-to-DeFi terminal powered by Birdeye, DFlow, Kamino, Solflare, and Quicknode.",
    url: "https://yigent.edycu.dev",
    siteName: "Yigent",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Yigent App Demo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yigent - Intent-to-DeFi Terminal",
    description: "AI-powered intent-to-DeFi terminal powered by Birdeye, DFlow, Kamino, Solflare, and Quicknode.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-slate-950 text-slate-50 min-h-screen selection:bg-cyan-500/30`}
      >
        {children}
      </body>
    </html>
  );
}
