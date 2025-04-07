"use client"

import { useEffect, useState } from "react"
import BookCard from "./BookCard"
import { fetchBooks } from "../actions/bookActions"

interface Book {
  id: number
  title: string
  author: string
  price: number
  image: string
}

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

export default function BookList() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getBooks = async () => {
      const response = await fetchBooks()
      if (response!=undefined && response.books!=undefined && response.success) {
        setBooks(
          response.books.map((book: any) => ({
            id: book.id,
            title: book.title,
            author: book.author,
            price: Number.parseFloat(book.price),
            image: book.image,
          })),
        )
      }
      setLoading(false)
    }

    getBooks()
  }, [])

  if (loading) {
    return <div className="text-center py-10">加载中...</div>
  }

  if (books.length === 0) {
    return <div className="text-center py-10">没有找到图书</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  )
}

