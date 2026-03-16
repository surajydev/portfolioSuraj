import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CursorStars from "@/components/CursorStars";
import AnimatedFavicon from "@/components/AnimatedFavicon";
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
      <body className="font-exo antialiased bg-[#020817] text-[#e2e8f0]">
        <AnimatedFavicon />
        <CursorStars />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
