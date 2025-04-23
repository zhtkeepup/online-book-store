"use client"

import { useState } from "react"
import { useCart } from "../context/CartContext"
import OrderConfirmation from "./OrderConfirmation"
import { useRouter } from "next/navigation"
import Image from "next/image"


import * as ss from "../mysensors";
      

export default function Checkout() {
  const { cart, getTotalPrice, clearCart, addToPurchasedBooks, user } = useCart()
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [processing, setProcessing] = useState(false)
  const router = useRouter()

  const handlePayment = async () => {
    if (!user) {
      router.push("/login")
      return
    }

    setProcessing(true)
    // In a real application, you would integrate with a payment gateway here
    const success = await addToPurchasedBooks(cart)

    const bookIdList:number[] = []
    cart.forEach(b => {
      bookIdList.push(b.id)
    } )

    if (success) {
      ss.sensorsTrack("Payment", {name:"支付",
        bookId:bookIdList, 
        TotalPrice: getTotalPrice().toFixed(2),
        TotalPriceNum: getTotalPrice()});
        
      setShowConfirmation(true)
      clearCart()
    } else {
      alert("支付处理失败，请重试。")
    }
    setProcessing(false)
  }

  if (showConfirmation) {
    return <OrderConfirmation setShowConfirmation={setShowConfirmation} />
  }

  return (
    <div className="border rounded-lg p-4 shadow-md bg-white">
      <h2 className="text-2xl font-bold mb-4">结算</h2>
      {cart.length === 0 ? (
        <p className="text-center py-4">您的购物车是空的</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="mb-4 p-2 border-b flex items-center">
              <div className="relative w-16 h-24 mr-4">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                  className="rounded-md"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-gray-600">作者: {item.author}</p>
                <p className="text-lg">
                  ￥{item.price.toFixed(2)} x {item.quantity}
                </p>
                <p className="text-sm text-gray-500">小计: ￥{(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
          <div className="mt-4 text-xl font-bold">总计: ￥{getTotalPrice().toFixed(2)}</div>
          <div>说明:这里是模拟环境，点击“立即支付”将直接提示成功</div>
          <button
            onClick={handlePayment}
            disabled={processing}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors w-full disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {processing ? "处理中..." : user ? "立即支付" : "登录以购买"}
          </button>
        </>
      )}
    </div>
  )
}

