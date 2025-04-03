"use client"

import Link from "next/link"
import { useCart } from "../context/CartContext"
import { useRouter } from "next/navigation"

export default function Header() {
  const { user, logout } = useCart()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <header className="bg-white bg-opacity-80 backdrop-blur-sm shadow-md sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          在线书店
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="hover:underline">
                首页
              </Link>
            </li>
            <li>
              <Link href="/purchased" className="hover:underline">
                已购图书
              </Link>
            </li>
            {user ? (
              <>
                <li>
                  <span>欢迎, {user.username}!</span>
                </li>
                <li>
                  <button onClick={handleLogout} className="hover:underline">
                    登出
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link href="/login" className="hover:underline">
                  登录
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}

