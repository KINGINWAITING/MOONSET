import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import "./hide-clerk-ui.css"
import "./enable-clerk-modal.css"
import { Providers } from "./providers"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MOONSET - Unveiling the Lunar Deception",
  description:
    "A decentralized initiative powered by the Ethereum blockchain to value truth and expose historical fraud",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
        <Script src="/clerk-modal-center.js" strategy="afterInteractive" />
      </body>
    </html>
  )
}
