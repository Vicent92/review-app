import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import UserMenu from "@/components/UserMenu"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Review App",
  description: "Descubre y reseña lugares de consumo y recreación",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">Review App</h1>
            <UserMenu />
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  )
}

