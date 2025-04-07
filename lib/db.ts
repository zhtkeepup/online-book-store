// import { neon } from "@neondatabase/serverless"

// // Create a SQL client with the connection string
// export const sql = neon(process.env.DATABASE_URL!)

import {Pool} from "pg";


/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */


export const pool = new Pool({
    user: 'cqgsdx',
    host: 'localhost',
    database: 'cqgsdxdb',
    password: 'cqgsdx',
    port: 5432,
  });



// Helper function to check if a user exists
export async function getUserByUsername(username: string) {
    const sql = `
    SELECT * FROM users WHERE username = '${username}'
  `
  console.log("getUserByUsername,sql:", sql);
  const result = await pool.query(sql)
  console.log("getUserByUsername,result:",result);
  return result.rows[0] || null
}

// Helper function to create a user if they don't exist
export async function createUserIfNotExists(username: string) {
    console.log("==== createUserIfNotExists:", username)
  const existingUser = await getUserByUsername(username)
  console.log("==== existingUser:", existingUser)
  if (existingUser) {
    return existingUser
  }

  const result = await pool.query(`
    INSERT INTO users (username)
    VALUES ('${username}')
    RETURNING *
  `)
  console.log("createUserIfNotExists, result:",result);
  return result.rows[0]
}

// Helper function to get books
export async function getBooks() {
  return (await pool.query(`SELECT * FROM books`)).rows
}

// Helper function to get a book by id
export async function getBookById(id: number) {
  const result = await pool.query(`SELECT * FROM books WHERE id = ${id}`)
  return result.rows[0] || null
}

// Helper function to get cart items for a user
export async function getCartItems(userId: number) {
  const result = await pool.query(`
    SELECT c.id, c.quantity, b.id as book_id, b.title, b.author, b.price, b.image
    FROM cart_items c
    JOIN books b ON c.book_id = b.id
    WHERE c.user_id = ${userId}
  `)
  return result.rows
}

// Helper function to add an item to the cart
export async function addToCart(userId: number, bookId: number) {
  try {
    // First, check if the item already exists in the cart
    const existingItem = await pool.query(`
      SELECT * FROM cart_items
      WHERE user_id = ${userId} AND book_id = ${bookId}
    `)

    if (existingItem.rows.length > 0) {
      // If the item exists, update the quantity
      return (await pool.query(`
        UPDATE cart_items
        SET quantity = quantity + 1
        WHERE user_id = ${userId} AND book_id = ${bookId}
        RETURNING *
      `)).rows
    } else {
      // If the item doesn't exist, insert a new row
      return (await pool.query(`
        INSERT INTO cart_items (user_id, book_id, quantity)
        VALUES (${userId}, ${bookId}, 1)
        RETURNING *
      `)).rows
    }
  } catch (error) {
    console.error("Error in addToCart:", error)
    throw error
  }
}

// Helper function to update cart item quantity
export async function updateCartItemQuantity(userId: number, bookId: number, quantity: number) {
  if (quantity <= 0) {
    return (await pool.query(`
      DELETE FROM cart_items
      WHERE user_id = ${userId} AND book_id = ${bookId}
    `)).rows
  } else {
    return (await pool.query(`
      UPDATE cart_items
      SET quantity = ${quantity}
      WHERE user_id = ${userId} AND book_id = ${bookId}
      RETURNING *
    `)).rows
  }
}

// Helper function to remove an item from the cart
export async function removeFromCart(userId: number, bookId: number) {
  return (await pool.query(`
    DELETE FROM cart_items
    WHERE user_id = ${userId} AND book_id = ${bookId}
  `)).rows
}

// Helper function to clear the cart
export async function clearCart(userId: number) {
  return (await pool.query(`
    DELETE FROM cart_items
    WHERE user_id = ${userId}
  `)).rows
}

// Helper function to get purchased books for a user
export async function getPurchasedBooks(userId: number) {
  return (await pool.query(`
    SELECT p.id, p.count, b.id as book_id, b.title, b.author, b.price, b.image
    FROM purchased_books p
    JOIN books b ON p.book_id = b.id
    WHERE p.user_id = ${userId}
  `)).rows
}

// Helper function to add purchased books
export async function addToPurchasedBooks(userId: number, cartItems: any[]) {
  for (const item of cartItems) {
    const existingPurchase = (await pool.query(`
      SELECT * FROM purchased_books
      WHERE user_id = ${userId} AND book_id = ${item.book_id}
    `)).rows

    if (existingPurchase.length > 0) {
      (await pool.query(`
        UPDATE purchased_books
        SET count = count + ${item.quantity}
        WHERE user_id = ${userId} AND book_id = ${item.book_id}
      `)).rows
    } else {
      (await pool.query(`
        INSERT INTO purchased_books (user_id, book_id, count)
        VALUES (${userId}, ${item.book_id}, ${item.quantity})
      `)).rows
    }
  }

  // Clear the cart after purchase
  await clearCart(userId)
}

