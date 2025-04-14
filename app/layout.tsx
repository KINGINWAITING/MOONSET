import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthCheck } from "@/components/auth-check"
import { ThemeProvider } from "@/components/theme-provider"

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
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <AuthCheck />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

import "./globals.css"


import './globals.css'