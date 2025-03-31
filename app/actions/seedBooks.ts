"use server"

import { sql } from "@/lib/db"

export async function seedBooks() {
  try {
    // Check if books already exist
    const existingBooks = await sql`SELECT COUNT(*) FROM books`
    if (existingBooks[0].count > 0) {
      return { success: true, message: "Books already seeded" }
    }

    // Insert books
    await sql`
      INSERT INTO books (title, author, price, image)
      VALUES 
        ('了不起的盖茨比', 'F·斯科特·菲茨杰拉德', 69.99, 'https://m.media-amazon.com/images/I/71FTb9X6wsL._AC_UF1000,1000_QL80_.jpg'),
        ('杀死一只知更鸟', '哈珀·李', 89.99, 'https://m.media-amazon.com/images/I/71FxgtFKcQL._AC_UF1000,1000_QL80_.jpg'),
        ('一九八四', '乔治·奥威尔', 79.99, 'https://m.media-amazon.com/images/I/71kxa1-0mfL._AC_UF1000,1000_QL80_.jpg'),
        ('傲慢与偏见', '简·奥斯汀', 59.99, 'https://m.media-amazon.com/images/I/71Q1tPupKjL._AC_UF1000,1000_QL80_.jpg')
    `

    return { success: true, message: "Books seeded successfully" }
  } catch (error) {
    console.error("Error seeding books:", error)
    return { success: false, error: "Failed to seed books" }
  }
}

