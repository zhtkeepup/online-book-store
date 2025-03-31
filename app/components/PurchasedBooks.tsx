"use client"

import { useCart } from "../context/CartContext"
import Link from "next/link"
import Image from "next/image"

export default function PurchasedBooks() {
  const { purchasedBooks, user } = useCart()

  if (!user) {
    return (
      <div className="text-center">
        <p className="mb-4">请登录以查看您购买的图书。</p>
        <Link href="/login" className="text-blue-500 hover:underline">
          前往登录页面
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">您购买的图书</h1>
        <Link href="/" className="text-blue-500 hover:underline">
          返回商店
        </Link>
      </div>
      {purchasedBooks.length === 0 ? (
        <div className="text-center">
          <p className="mb-4">您还没有购买任何图书。</p>
          <Link href="/" className="text-blue-500 hover:underline">
            返回商店
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {purchasedBooks.map((book) => (
            <div key={book.id} className="border rounded-lg p-4 shadow-md bg-white flex flex-col">
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
              <p className="text-lg font-bold">￥{book.price.toFixed(2)}</p>
              <p className="text-sm text-gray-500 mt-2">已购买: {book.count} 次</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

