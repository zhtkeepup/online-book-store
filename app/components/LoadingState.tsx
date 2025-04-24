"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useCart } from "../context/CartContext"
import LoadingSpinner from "./LoadingSpinner"

export default function LoadingState({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  // Only access the cart context after component is mounted on the client
  useEffect(() => {
    setMounted(true)
  }, [])

  // Use optional chaining to safely access the cart context
  const { loading } = useCart?.() || { loading: false }

  // Show loading spinner only if the component is mounted and loading is true
  if (mounted && loading) {
    return <LoadingSpinner />
  }

  return <>{children}</>
}
