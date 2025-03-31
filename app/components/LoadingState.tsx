"use client"

import type React from "react"

import { useCart } from "../context/CartContext"
import LoadingSpinner from "./LoadingSpinner"

export default function LoadingState({ children }: { children: React.ReactNode }) {
  const { loading } = useCart()

  if (loading) {
    return <LoadingSpinner />
  }

  return <>{children}</>
}


