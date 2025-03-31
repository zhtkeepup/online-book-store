"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import {
  fetchCartItems,
  addItemToCart,
  updateItemQuantity,
  removeItemFromCart,
  clearUserCart,
  fetchPurchasedBooks,
  purchaseCartItems,
} from "../actions/cartActions"
import { loginUser } from "../actions/userActions"

import * as ss from "../mysensors"

interface Book {
  id: number
  title: string
  author: string
  price: number
  image: string
}

interface CartItem extends Book {
  quantity: number
  book_id?: number
}

interface PurchasedBook extends Book {
  count: number
  book_id?: number
}

interface User {
  id: number
  username: string
}

interface CartContextType {
  cart: CartItem[]
  purchasedBooks: PurchasedBook[]
  addToCart: (book: Book) => Promise<void>
  removeFromCart: (id: number) => Promise<void>
  updateCartItemQuantity: (id: number, quantity: number) => Promise<void>
  getTotalPrice: () => number
  clearCart: () => Promise<void>
  getCartItemsCount: () => number
  addToPurchasedBooks: (books: CartItem[]) => Promise<boolean>
  user: User | null
  login: (username: string) => Promise<boolean>
  logout: () => void
  loading: boolean
  error: string | null
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [purchasedBooks, setPurchasedBooks] = useState<PurchasedBook[]>([])
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Check for stored user on initial load
  useEffect(() => {
    const storedUsername = localStorage.getItem("username")
    if (storedUsername) {
      login(storedUsername).then(() => {
        setLoading(false)
      })
    } else {
      setLoading(false)
    }
  }, [])

  // Fetch cart items when user changes
  useEffect(() => {
    if (user) {
      fetchUserCartItems()
      fetchUserPurchasedBooks()
    }
  }, [user])

  const fetchUserCartItems = async () => {
    if (!user) return

    const response = await fetchCartItems(user.id)
    if (response.success) {
      setCart(
        response.cartItems.map((item: any) => ({
          id: item.book_id,
          title: item.title,
          author: item.author,
          price: Number.parseFloat(item.price),
          image: item.image,
          quantity: item.quantity,
        })),
      )
    } else {
      setError("获取购物车失败")
    }
  }

  const fetchUserPurchasedBooks = async () => {
    if (!user) return

    const response = await fetchPurchasedBooks(user.id)
    if (response.success) {
      setPurchasedBooks(
        response.purchasedBooks.map((item: any) => ({
          id: item.book_id,
          title: item.title,
          author: item.author,
          price: Number.parseFloat(item.price),
          image: item.image,
          count: item.count,
        })),
      )
    } else {
      setError("获取已购图书失败")
    }
  }

  const addToCart = async (book: Book) => {
    if (!user) return

    setError(null)
    const response = await addItemToCart(user.id, book.id)
    if (response.success) {
      ss.sensorsTrack("加入购物车",{UserName:user, TotalPrice: getTotalPrice().toFixed(2)});

      await fetchUserCartItems()
    } else {
      setError("添加到购物车失败")
    }
  }

  const removeFromCart = async (id: number) => {
    if (!user) return

    setError(null)
    const response = await removeItemFromCart(user.id, id)
    if (response.success) {
      await fetchUserCartItems()
    } else {
      setError("从购物车移除失败")
    }
  }

  const updateCartItemQuantity = async (id: number, quantity: number) => {
    if (!user) return

    setError(null)
    const response = await updateItemQuantity(user.id, id, quantity)
    if (response.success) {
      await fetchUserCartItems()
    } else {
      setError("更新数量失败")
    }
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const clearCart = async () => {
    if (!user) return

    setError(null)
    const response = await clearUserCart(user.id)
    if (response.success) {
      setCart([])
    } else {
      setError("清空购物车失败")
    }
  }

  const getCartItemsCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const addToPurchasedBooks = async (books: CartItem[]) => {
    if (!user) return false

    setError(null)
    const response = await purchaseCartItems(
      user.id,
      books.map((book) => ({
        book_id: book.id,
        quantity: book.quantity,
      })),
    )

    if (response.success) {
      await fetchUserPurchasedBooks()
      return true
    } else {
      setError("购买失败")
      return false
    }
  }

  const login = async (username: string): Promise<boolean> => {
    try {
      setLoading(true)
      setError(null)
      const response = await loginUser(username)

      if (response.success && response.user) {
        setUser({
          id: response.user.id,
          username: response.user.username,
        })
        localStorage.setItem("username", username)
        return true
      } else {
        setError(response.error || "登录失败")
        return false
      }
    } catch (error) {
      console.error("Login error:", error)
      setError("登录时发生错误")
      return false
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setCart([])
    setPurchasedBooks([])
    localStorage.removeItem("username")
  }

  const contextValue: CartContextType = {
    cart,
    purchasedBooks,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    getTotalPrice,
    clearCart,
    getCartItemsCount,
    addToPurchasedBooks,
    user,
    login,
    logout,
    loading,
    error,
  }

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

