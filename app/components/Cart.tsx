'use client'

import { useState } from 'react'
import { useCart } from '../context/CartContext'
import Checkout from './Checkout'
import Image from 'next/image'

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import * as ss from "../mysensors";


export default function Cart() {
  const { cart, removeFromCart, updateCartItemQuantity, getTotalPrice } = useCart()
  const [showCheckout, setShowCheckout] = useState(false)

  if (showCheckout) {
    return <Checkout />
  }

  return (
    <div className="border rounded-lg p-4 shadow-md bg-white">
      <h2 className="text-2xl font-bold mb-4">购物车</h2>
      {cart.length === 0 ? (
        <p>您的购物车是空的</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="mb-4 p-2 border-b">
              <div className="flex items-center mb-2">
                <div className="relative w-16 h-24 mr-4">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                    className="rounded-md"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-600">￥{item.price.toFixed(2)} 每本</p>
                </div>
              </div>
              <div className="flex justify-between items-center mt-2">
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
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  删除
                </button>
              </div>
            </div>
          ))}
          <div className="mt-4 text-xl font-bold">
            总计: ￥{getTotalPrice().toFixed(2)}
          </div>
          <button
            onClick={() => setShowCheckout(true)}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors w-full"
          >
            结算
          </button>
        </>
      )}
    </div>
  )
}

