"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useMessages } from "../context/MessageContext"

export default function MessageIcon() {
  const [mounted, setMounted] = useState(false)

  // Only access the message context after component is mounted on the client
  useEffect(() => {
    setMounted(true)
  }, [])

  // Use optional chaining to safely access the message context
  const { unreadCount } = useMessages?.() || { unreadCount: 0 }

  // Don't render anything until the component is mounted on the client
  if (!mounted) return null

  return (
    <Link href="/messages" className="relative inline-block">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
      {unreadCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {unreadCount > 99 ? "99+" : unreadCount}
        </span>
      )}
    </Link>
  )
}
