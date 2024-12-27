'use client'

import { useState } from 'react'
import { useCart } from '../context/CartContext'
import OrderConfirmation from './OrderConfirmation'
import { useRouter } from 'next/navigation'

export default function Checkout() {
  const { cart, getTotalPrice, clearCart, addToPurchasedBooks, user } = useCart()
  const [showConfirmation, setShowConfirmation] = useState(false)
  const router = useRouter()

  const handlePayment = () => {
    if (!user) {
      router.push('/login')
      return
    }
    // In a real application, you would integrate with a payment gateway here
    addToPurchasedBooks(cart)
    setShowConfirmation(true)
    clearCart()
  }

  if (showConfirmation) {
    return <OrderConfirmation setShowConfirmation={setShowConfirmation} />
  }

  return (
    <div className="border rounded-lg p-4 shadow-md">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      {cart.map((item) => (
        <div key={item.id} className="mb-4 p-2 border-b">
          <h3 className="text-lg font-semibold">{item.title}</h3>
          <p className="text-gray-600">by {item.author}</p>
          <p className="text-lg">${item.price.toFixed(2)} x {item.quantity}</p>
          <p className="text-sm text-gray-500">Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
        </div>
      ))}
      <div className="mt-4 text-xl font-bold">
        Total: ${getTotalPrice().toFixed(2)}
      </div>
      <button
        onClick={handlePayment}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors w-full"
      >
        {user ? 'Pay Now' : 'Login to Purchase'}
      </button>
    </div>
  )
}

