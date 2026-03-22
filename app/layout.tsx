import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CursorStars from "@/components/CursorStars";
import AnimatedFavicon from "@/components/AnimatedFavicon";
import Script from "next/script";
export const metadata: Metadata = {
  title: "Suraj Yadav | Neural Network Portfolio",
  description:
    "Full Stack Developer & UI/UX Designer — CSE Student at Lovely Professional University. Explore my neural network-themed portfolio showcasing projects, skills, and experience.",
  icons: {
    icon: '/profile.jpg',
  },
  keywords: [
    "Suraj Yadav",
    "portfolio",
    "full stack developer",
    "UI/UX designer",
    "computer science",
    "web developer",
    "neural network portfolio",
  ],
  authors: [{ name: "Suraj Yadav" }],
  openGraph: {
    title: "Suraj Yadav | Neural Network Portfolio",
    description:
      "Full Stack Developer & UI/UX Designer building scalable systems and intuitive interfaces.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to CDN domains for faster DNS + TLS */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Ysabeau+Office:ital,wght@0,1..900;1,1..900&family=Doto:ROND,wght@12,900&display=swap" rel="stylesheet" />
        <link rel="preconnect" href="https://pub-37f5a13b98614f0ebd7e5db4e5874f30.r2.dev" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://ajax.googleapis.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://pub-37f5a13b98614f0ebd7e5db4e5874f30.r2.dev" />
        {/* Preload 3D models so download starts immediately */}
        <link rel="preload" href="https://pub-37f5a13b98614f0ebd7e5db4e5874f30.r2.dev/earth1.glb" as="fetch" crossOrigin="anonymous" fetchPriority="high" />
        <link rel="preload" href="/r2/hull_spaceship.glb" as="fetch" crossOrigin="anonymous" fetchPriority="high" />
        <link rel="preload" href="/r2/earth_hologram.glb" as="fetch" crossOrigin="anonymous" fetchPriority="high" />
        <Script
          type="module"
          src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className="font-exo antialiased bg-[#020817] text-[#e2e8f0]">
        <AnimatedFavicon />
        <CursorStars />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
