import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/hooks/useTheme";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "AcademiaPath - Professional Development for Academics",
    template: "%s | AcademiaPath",
  },
  description:
    "Professional development platform for PhD students and early-career professors offering courses and certifications in research, teaching, and academic career advancement.",
  keywords: [
    "academic professional development",
    "PhD training",
    "research methods",
    "grant writing",
    "academic publishing",
    "teaching excellence",
    "academic career",
  ],
  authors: [{ name: "AcademiaPath" }],
  creator: "AcademiaPath",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://academiapath.com",
    siteName: "AcademiaPath",
    title: "AcademiaPath - Professional Development for Academics",
    description:
      "Professional development platform for PhD students and early-career professors",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AcademiaPath",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AcademiaPath - Professional Development for Academics",
    description:
      "Professional development platform for PhD students and early-career professors",
    images: ["/og-image.jpg"],
    creator: "@academiapath",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
