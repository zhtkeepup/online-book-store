'use client'

import './globals.css'
import { Inter } from 'next/font/google'
import { CartProvider } from './context/CartContext'
import Header from './components/Header'
import Background from './components/Background'

const inter = Inter({ subsets: ['latin'] })

// export const metadata = {
//   title: 'Online Book Store',
//   description: 'Your favorite books, just a click away',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Background />
        <CartProvider>
          <Header />
          <main className="container mx-auto px-4 py-8 bg-white bg-opacity-80 min-h-screen">
            {children}
          </main>
        </CartProvider>
      </body>
    </html>
  )
}

