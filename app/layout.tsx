import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Sidebar } from "@/components/sidebar"
import { Toaster } from "@/components/toaster"
import { WeatherBackground } from "@/components/background"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Weather Tracker AI for Farming",
  description: "A comprehensive weather tracking application for farmers",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <WeatherBackground />
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 overflow-auto w-full">{children}</main>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'