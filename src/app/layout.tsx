import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Doumi Physio | Centre de kinesitherapie",
  description:
    "Centre de kinesitherapie a Douars pour la reeducation, les douleurs articulaires, le sport et le suivi patient.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Doumi Physio",
    description: "Centre de kinesitherapie a Douars.",
    url: "https://doumiphysio.ma",
    siteName: "Doumi Physio",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: "Doumi Physio",
    description: "Centre de kinesitherapie a Douars.",
    url: "https://doumiphysio.ma",
    telephone: "+212649786068",
    email: "contact@doumiphysio.ma",
    hasMap:
      "https://www.google.com/maps/search/?api=1&query=Cabinet%20Doumi%20physio%20%D8%A7%D9%84%D8%AA%D8%B1%D9%88%D9%8A%D8%B6%20%D8%A7%D9%84%D8%B7%D8%A8%D9%8A%20%D9%88%20%D8%B9%D9%84%D8%A7%D8%AC%20%D8%A7%D9%84%D9%81%D9%8A%D8%B2%D9%8A%D8%A7%D8%A6%D9%8A",
    priceRange: "250-500 MAD",
  };

  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${manrope.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
