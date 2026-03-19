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

const siteUrl = "https://carsondougherty.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Carson Dougherty | Holistic Coach & Intuitive Guide",
    template: "%s | Carson Dougherty",
  },
  description:
    "Carson Dougherty is a certified hypnotherapist, holistic coach, and intuitive guide helping women reconnect with themselves through subconscious reprogramming, NLP, energy work, and intuitive insight.",
  keywords: [
    "holistic coach",
    "holistic coaching for women",
    "intuitive coach",
    "intuitive guide",
    "alignment coach",
    "hypnotherapy coach",
    "NLP coach",
    "subconscious reprogramming",
    "energy healing coach",
    "certified hypnotherapist",
    "holistic life coach",
    "intuitive coaching for women",
    "nervous system regulation",
    "human design coach",
  ],
  authors: [{ name: "Carson Dougherty", url: siteUrl }],
  creator: "Carson Dougherty",
  icons: {
    icon: "/carson-favicon.png",
    apple: "/carson-favicon.png",
  },
  openGraph: {
    title: "Carson Dougherty | Holistic Coach & Intuitive Guide",
    description:
      "Holistic coaching for women ready to trust their intuition, shift limiting beliefs, and build a life that feels aligned, grounded, and fully their own.",
    url: siteUrl,
    siteName: "Carson Dougherty",
    images: [
      {
        url: "/carson-website-social-sharing-image.png",
        width: 1200,
        height: 630,
        alt: "Carson Dougherty — Holistic Coaching for Real Growth",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Carson Dougherty | Holistic Coach & Intuitive Guide",
    description:
      "Holistic coaching for women ready to trust their intuition, shift limiting beliefs, and build a life that feels aligned, grounded, and fully their own.",
    images: ["/carson-website-social-sharing-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${playfair.variable} ${cormorant.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "Carson Dougherty",
              url: siteUrl,
              logo: `${siteUrl}/carson-favicon.png`,
              image: `${siteUrl}/carson-website-social-sharing-image.png`,
              description:
                "Certified hypnotherapist and holistic coach helping women reconnect with themselves through subconscious reprogramming, NLP, energy work, and intuitive insight.",
              founder: {
                "@type": "Person",
                name: "Carson Dougherty",
                jobTitle: "Holistic Coach & Certified Hypnotherapist",
                url: siteUrl,
                sameAs: [
                  "https://www.instagram.com/carsondougherty/",
                  "https://www.tiktok.com/@thecarsondougherty",
                  "https://carsondougherty.substack.com/",
                ],
              },
              areaServed: "Worldwide",
              serviceType: [
                "Holistic Coaching",
                "Hypnotherapy",
                "NLP Coaching",
                "Intuitive Guidance",
                "Energy Work",
                "Subconscious Reprogramming",
              ],
              sameAs: [
                "https://www.instagram.com/carsondougherty/",
                "https://www.tiktok.com/@thecarsondougherty",
                "https://carsondougherty.substack.com/",
              ],
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
