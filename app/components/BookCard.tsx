'use client'

import { useCart } from '../context/CartContext'

interface Book {
  id: number
  title: string
  author: string
  price: number
}

export default function BookCard({ book }: { book: Book }) {
  const { addToCart } = useCart()

  return (
    <div className="border rounded-lg p-4 shadow-md">
      <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
      <p className="text-gray-600 mb-2">{book.author}</p>
      <p className="text-lg font-bold mb-4">${book.price.toFixed(2)}</p>
      <button
        onClick={() => addToCart(book)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
      >
        Add to Cart
      </button>
    </div>
  )
}

