"use client"

import { useState, useEffect } from "react"
import { seedBooks } from "@/app/actions/seedBooks"
import Link from "next/link"

export default function SeedPage() {
  const [status, setStatus] = useState<string>("idle")
  const [message, setMessage] = useState<string>("")

  const handleSeed = async () => {
    setStatus("loading")
    setMessage("正在添加图书数据...")

    try {
      const result = await seedBooks()
      if (result.success) {
        setStatus("success")
        if(result!=undefined && result.message!=undefined) {
            setMessage(result.message)
        }
        
      } else {
        setStatus("error")
        setMessage(result.error || "添加数据失败")
      }
    } catch (error) {
      setStatus("error")
      setMessage("添加数据时发生错误")
      console.error(error)
    }
  }

  useEffect(() => {
    handleSeed()
  }, [])

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">数据库初始化</h1>

      <div
        className={`p-4 mb-4 rounded ${
          status === "loading"
            ? "bg-blue-100 text-blue-700"
            : status === "success"
              ? "bg-green-100 text-green-700"
              : status === "error"
                ? "bg-red-100 text-red-700"
                : "bg-gray-100"
        }`}
      >
        <p>{message}</p>
      </div>

      {status === "success" && (
        <Link href="/" className="block w-full text-center py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700">
          返回首页
        </Link>
      )}

      {status === "error" && (
        <button onClick={handleSeed} className="w-full py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700">
          重试
        </button>
      )}
    </div>
  )
}
