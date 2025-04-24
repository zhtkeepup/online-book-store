"use server"

import { getBooks, getBookById } from "@/lib/db"

export async function fetchBooks() {
  try {
    const books = await getBooks()
    return { success: true, books }
  } catch (error) {
    console.error("Error fetching books:", error)
    return { success: false, error: "Failed to fetch books" }
  }
}

export async function fetchBookById(id: number) {
  try {
    const book = await getBookById(id)
    return { success: true, book }
  } catch (error) {
    console.error("Error fetching book:", error)
    return { success: false, error: "Failed to fetch book" }
  }
}
