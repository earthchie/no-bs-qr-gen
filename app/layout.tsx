import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "No BS QR Code Generator",
  description:
    "Generate custom QR codes. No BS / No Ads / Just QR Codes.",
  openGraph: {
    title: "No BS QR Code Generator",
    description:
      "Generate custom QR codes. No BS / No Ads / Just QR Codes.",
    url: "https://qr.project.in.th",
    siteName: "No BS QR Code Generator",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "No BS QR Code Generator - Create custom QR codes with advanced features",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "No BS QR Code Generator",
    description:
      "Generate custom QR codes. No BS / No Ads / Just QR Codes.",
    images: ["/og-image.png"],
  },
  metadataBase: new URL("https://qr.project.in.th"),
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon-light-32x32.png",
        type: "image/png",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
