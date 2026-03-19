import type { Metadata } from "next";
import { DM_Sans, Playfair_Display, Cormorant } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// Playfair Display — italic only, used exclusively for testimonial/quote text.
// All other typography stays in DM Sans.
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["italic"],
  weight: ["400", "500"],
  display: "swap",
});

// Cormorant italic — wordmark only (Header + Footer "Carson Dougherty").
// Do not use elsewhere on the site.
const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["latin"],
  style: ["italic"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Carson Dougherty | Alignment Coach",
  description:
    "Carson Dougherty works with women to identify and shift the subconscious patterns shaping their choices, relationships, and sense of self.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${playfair.variable} ${cormorant.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
