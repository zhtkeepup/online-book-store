'use client'

import { useState } from 'react'
import { useCart } from '../context/CartContext'
import Checkout from './Checkout'

export default function Cart() {
  const { cart, removeFromCart, updateCartItemQuantity, getTotalPrice } = useCart()
  const [showCheckout, setShowCheckout] = useState(false)

  if (showCheckout) {
    return <Checkout />
  }

  return (
    <div className="border rounded-lg p-4 shadow-md">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center mb-2 p-2 border-b">
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-600">${item.price.toFixed(2)} each</p>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                  className="px-2 py-1 bg-gray-200 rounded-l"
                >
                  -
                </button>
                <span className="px-4 py-1 bg-gray-100">{item.quantity}</span>
                <button
                  onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                  className="px-2 py-1 bg-gray-200 rounded-r"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="ml-4 text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="mt-4 text-xl font-bold">
            Total: ${getTotalPrice().toFixed(2)}
          </div>
          <button
            onClick={() => setShowCheckout(true)}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors w-full"
          >
            Checkout
          </button>
        </>
      )}
    </div>
  )
}

