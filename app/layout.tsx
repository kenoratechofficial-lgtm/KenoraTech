import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/app-shell";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL("https://kenoratech.com"),
  title: { default: "KenoraTech | Websites, Apps & UI/UX", template: "%s | KenoraTech" },
  description: "KenoraTech builds high-performance websites, web applications, e-commerce experiences, UI/UX systems, and digital products for growing businesses.",
  applicationName: "KenoraTech",
  creator: "KenoraTech",
  publisher: "KenoraTech",
  category: "Technology",
  keywords: ["KenoraTech", "website development", "web application development", "e-commerce development", "UI UX design", "digital products", "technology agency India"],
  openGraph: {
    title: "KenoraTech | Websites, Apps & UI/UX",
    description: "KenoraTech builds high-performance websites, web applications, e-commerce experiences, UI/UX systems, and digital products for growing businesses.",
    url: "https://kenoratech.com",
    siteName: "KenoraTech",
    locale: "en_IN",
    type: "website",
    images: [{ url: "/kenora-tech-logo.png", width: 1254, height: 1254, alt: "KenoraTech" }]
  },
  twitter: { card: "summary_large_image", title: "KenoraTech | Websites, Apps & UI/UX", description: "High-performance websites, web applications, UI/UX systems, and digital products.", images: ["/kenora-tech-logo.png"] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  formatDetection: { email: false, address: false, telephone: false }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = [
    { "@context": "https://schema.org", "@type": "Organization", "@id": "https://kenoratech.com/#organization", name: "KenoraTech", url: "https://kenoratech.com", logo: "https://kenoratech.com/kenora-tech-logo.png", email: "kenoratech.in@gmail.com", telephone: "+91-7383530982", description: "KenoraTech builds high-performance websites, web applications, UI/UX systems, e-commerce experiences, and digital products." },
    { "@context": "https://schema.org", "@type": "WebSite", "@id": "https://kenoratech.com/#website", name: "KenoraTech", url: "https://kenoratech.com", publisher: { "@id": "https://kenoratech.com/#organization" }, inLanguage: "en-IN" }
  ];
  return <html lang="en" suppressHydrationWarning><body className={`${inter.variable} font-sans antialiased`} suppressHydrationWarning><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /><ThemeProvider attribute="class" defaultTheme="system" enableSystem><AppShell>{children}</AppShell></ThemeProvider></body></html>;
}