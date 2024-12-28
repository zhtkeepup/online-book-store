'use client'

import Link from 'next/link'
import { useCart } from '../context/CartContext'
import { useRouter } from 'next/navigation'

export default function Header() {
  const { user, logout } = useCart()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <header className="bg-white bg-opacity-80 backdrop-blur-sm shadow-md sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Online Book Store
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="/purchased" className="hover:underline">
                Purchased Books
              </Link>
            </li>
            {user ? (
              <>
                <li>
                  <span>Welcome, {user}!</span>
                </li>
                <li>
                  <button onClick={handleLogout} className="hover:underline">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link href="/login" className="hover:underline">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}

