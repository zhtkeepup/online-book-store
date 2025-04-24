"use client"

import Image from "next/image"
import { useCart } from "../context/CartContext"
import { useState } from "react"

interface Book {
  id: number
  title: string
  author: string
  price: number
  image: string
}



/* eslint-disable @typescript-eslint/no-unused-vars */

export default function BookCard({ book }: { book: Book }) {
  const { addToCart, user, error } = useCart()
  const [isAdding, setIsAdding] = useState(false)
  const [localError, setLocalError] = useState<string | null>(null)

  const handleAddToCart = async () => {
    if (!user) {
      setLocalError("请先登录")
      return
    }

    setIsAdding(true)
    setLocalError(null)
    await addToCart(book)
    setIsAdding(false)
  }

  return (
    <div className="border rounded-lg p-4 shadow-md bg-white flex flex-col">
      <div className="relative h-64 mb-4">
        <Image
          src={book.image || "/placeholder.svg"}
          alt={book.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: "cover" }}
          className="rounded-md"
        />
      </div>
      <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
      <p className="text-gray-600 mb-2">{book.author}</p>
      <p className="text-lg font-bold mb-4">￥{book.price.toFixed(2)}</p>
      {localError && <p className="text-red-500 text-sm mb-2">{localError}</p>}
      <button
        onClick={handleAddToCart}
        disabled={isAdding}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors mt-auto disabled:bg-gray-400"
      >
        {isAdding ? "添加中..." : "加入购物车"}
      </button>
    </div>
  )
}
