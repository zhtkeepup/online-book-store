import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { CartProvider } from "./context/CartContext"
import { MessageProvider } from "./context/MessageContext"
import Header from "./components/Header"
import Background from "./components/Background"
import LoadingState from "./components/LoadingState"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "在线书店",
  description: "您喜爱的图书，一键购买",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body className={inter.className}>
        <Background />
        <CartProvider>
          <MessageProvider>
            <LoadingState>
              <Header />
              <main className="container mx-auto px-4 py-8 bg-white bg-opacity-80 min-h-screen">{children}</main>
            </LoadingState>
          </MessageProvider>
        </CartProvider>
      </body>
    </html>
  )
}
