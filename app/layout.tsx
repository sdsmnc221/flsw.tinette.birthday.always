import type React from "react"
import type { Metadata } from "next"
import { Karla, Literata } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const karla = Karla({
  subsets: ["latin"],
  variable: "--font-karla",
  display: "swap",
})

// N'importer que le poids normal (400) de Literata, pas de gras
const literata = Literata({
  subsets: ["latin"],
  weight: ["400"], // Uniquement le poids normal
  variable: "--font-literata",
  display: "swap",
})

export const metadata: Metadata = {
  title: "À la recherche de ma Sweety (Tinette)",
  description: "Une page commémorative pour Sweety, disparue le 28 juin 2024",
  openGraph: {
    images: ["/meta-image.jpg"],
    title: "À la recherche de ma Sweety (Tinette)",
    description: "Une page commémorative pour Sweety, disparue le 28 juin 2024",
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
    other: [
      {
        rel: "mask-icon",
        url: "/favicon.svg",
        color: "#1e88b8",
      },
    ],
  },
  themeColor: "#1e88b8",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${karla.variable} ${literata.variable}`}>
      <head>
        {/* Balises meta supplémentaires pour les appareils mobiles */}
        <meta name="format-detection" content="telephone=yes" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className="bg-black text-white">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
