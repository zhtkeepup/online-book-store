'use client'

import { Dispatch, SetStateAction } from 'react'

interface OrderConfirmationProps {
  setShowConfirmation: Dispatch<SetStateAction<boolean>>
}

export default function OrderConfirmation({ setShowConfirmation }: OrderConfirmationProps) {
  const handleBackToShopping = () => {
    setShowConfirmation(false)
    // Force a page reload to reset all states
    window.location.href = '/'
  }

  return (
    <div className="border rounded-lg p-4 shadow-md">
      <h2 className="text-2xl font-bold mb-4">支付成功.</h2>
      <p className="mb-4">感谢您的购买.</p>
      <button
        onClick={handleBackToShopping}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
      >
        回到首页
      </button>
    </div>
  )
}
