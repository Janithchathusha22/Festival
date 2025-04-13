import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navigation from "@/components/navigation"
import AnimatedFooter from "@/components/animated-footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Aurudu Puranaya - Sri Lankan New Year Celebration",
  description: "Celebrate the Sinhala and Tamil New Year traditions in Sri Lanka",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Navigation />
          <main className="min-h-screen">{children}</main>
          <AnimatedFooter />
        </ThemeProvider>
      </body>
    </html>
  )
}
