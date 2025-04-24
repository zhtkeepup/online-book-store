"use client"

import Link from "next/link"
import { useCart } from "../context/CartContext"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { getUnreadMessages } from "../inbox/messages"

export default function Header() {
  const { user, logout } = useCart()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const [unreadCount, setUnreadCount] = useState(0)
  
  useEffect(()=>{
    const ff = async() => {
      const unreadMessages = await getUnreadMessages(user?.username);
      setUnreadCount(unreadMessages.length);
    }
    ff();
  },[])




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

                  <Link href="/inbox" className="flex items-center hover:underline">
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {unreadCount > 0 && <span className="ml-1 bg-red-500 text-white text-xs rounded-full px-2 py-1">{unreadCount}</span>}
                  </Link>
                </li>
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

