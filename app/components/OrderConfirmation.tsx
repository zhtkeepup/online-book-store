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
      <h2 className="text-2xl font-bold mb-4">Order Confirmation</h2>
      <p className="mb-4">Thank you for your order! Your payment has been processed successfully.</p>
      <button
        onClick={handleBackToShopping}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
      >
        Back to Shopping
      </button>
    </div>
  )
}

