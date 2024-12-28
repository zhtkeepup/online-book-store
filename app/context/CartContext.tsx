'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface Book {
  id: number
  title: string
  author: string
  price: number
  image: string
}

interface CartItem extends Book {
  quantity: number
}

interface PurchasedBook extends Book {
  count: number
}

interface CartContextType {
  cart: CartItem[]
  purchasedBooks: PurchasedBook[]
  addToCart: (book: Book) => void
  removeFromCart: (id: number) => void
  updateCartItemQuantity: (id: number, quantity: number) => void
  getTotalPrice: () => number
  clearCart: () => void
  getCartItemsCount: () => number
  addToPurchasedBooks: (books: CartItem[]) => void
  user: string | null
  login: (username: string) => void
  logout: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [purchasedBooks, setPurchasedBooks] = useState<PurchasedBook[]>([])
  const [user, setUser] = useState<string | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(storedUser)
      const storedPurchasedBooks = localStorage.getItem(`purchasedBooks_${storedUser}`)
      if (storedPurchasedBooks) {
        setPurchasedBooks(JSON.parse(storedPurchasedBooks))
      }
    }
    const storedCart = localStorage.getItem('cart')
    if (storedCart) setCart(JSON.parse(storedCart))
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    if (user) {
      localStorage.setItem(`purchasedBooks_${user}`, JSON.stringify(purchasedBooks))
    }
  }, [purchasedBooks, user])

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', user)
    } else {
      localStorage.removeItem('user')
    }
  }, [user])

  const addToCart = (book: Book) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.id === book.id)
      if (existingItem) {
        return prevCart.map(item =>
          item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prevCart, { ...book, quantity: 1 }]
    })
  }

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id))
  }

  const updateCartItemQuantity = (id: number, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item
      ).filter(item => item.quantity > 0)
    )
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const clearCart = () => {
    setCart([])
  }

  const getCartItemsCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const addToPurchasedBooks = (books: CartItem[]) => {
    setPurchasedBooks((prevPurchasedBooks) => {
      const updatedBooks = [...prevPurchasedBooks]
      books.forEach((book) => {
        const existingBookIndex = updatedBooks.findIndex((b) => b.id === book.id)
        if (existingBookIndex !== -1) {
          updatedBooks[existingBookIndex].count += book.quantity
        } else {
          updatedBooks.push({ ...book, count: book.quantity })
        }
      })
      return updatedBooks
    })
  }

  const login = (username: string) => {
    setUser(username)
    const storedPurchasedBooks = localStorage.getItem(`purchasedBooks_${username}`)
    if (storedPurchasedBooks) {
      setPurchasedBooks(JSON.parse(storedPurchasedBooks))
    } else {
      setPurchasedBooks([])
    }
  }

  const logout = () => {
    setUser(null)
    clearCart()
    setPurchasedBooks([])
  }

  return (
    <CartContext.Provider value={{ 
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
      logout
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

