"use server"

import {
  getCartItems,
  addToCart,
  updateCartItemQuantity,
  removeFromCart,
  clearCart,
  getPurchasedBooks,
  addToPurchasedBooks,
} from "@/lib/db"

export async function fetchCartItems(userId: number) {
  try {
    const cartItems = await getCartItems(userId)
    return { success: true, cartItems }
  } catch (error) {
    console.error("Error fetching cart items:", error)
    return { success: false, error: "Failed to fetch cart items" }
  }
}

export async function addItemToCart(userId: number, bookId: number) {
  try {
    await addToCart(userId, bookId)
    const cartItems = await getCartItems(userId)
    return { success: true, cartItems }
  } catch (error) {
    console.error("Error adding item to cart:", error)
    return { success: false, error: "Failed to add item to cart" }
  }
}

export async function updateItemQuantity(userId: number, bookId: number, quantity: number) {
  try {
    await updateCartItemQuantity(userId, bookId, quantity)
    const cartItems = await getCartItems(userId)
    return { success: true, cartItems }
  } catch (error) {
    console.error("Error updating item quantity:", error)
    return { success: false, error: "Failed to update item quantity" }
  }
}

export async function removeItemFromCart(userId: number, bookId: number) {
  try {
    await removeFromCart(userId, bookId)
    const cartItems = await getCartItems(userId)
    return { success: true, cartItems }
  } catch (error) {
    console.error("Error removing item from cart:", error)
    return { success: false, error: "Failed to remove item from cart" }
  }
}

export async function clearUserCart(userId: number) {
  try {
    await clearCart(userId)
    return { success: true }
  } catch (error) {
    console.error("Error clearing cart:", error)
    return { success: false, error: "Failed to clear cart" }
  }
}

export async function fetchPurchasedBooks(userId: number) {
  try {
    const purchasedBooks = await getPurchasedBooks(userId)
    return { success: true, purchasedBooks }
  } catch (error) {
    console.error("Error fetching purchased books:", error)
    return { success: false, error: "Failed to fetch purchased books" }
  }
}

export async function purchaseCartItems(userId: number, cartItems: any[]) {
  try {
    await addToPurchasedBooks(userId, cartItems)
    return { success: true }
  } catch (error) {
    console.error("Error purchasing cart items:", error)
    return { success: false, error: "Failed to purchase cart items" }
  }
}

