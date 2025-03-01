import type React from "react"

import { Inter } from "next/font/google"
import { PolarisProvider } from "@/components/providers/polaris-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "CausalFunnel - Cart Survey App",
  description: "Collect valuable customer feedback through cart surveys",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PolarisProvider>{children}</PolarisProvider>
      </body>
    </html>
  )
}

