"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "../context/CartContext"

import * as ss from "../mysensors";

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  // Only access the cart context after component is mounted on the client
  useEffect(() => {
    setMounted(true)
  }, [])

  // Use optional chaining to safely access the cart context
  const { login } = useCart?.() || {}

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!username.trim()) {
      setError("请输入用户名")
      return
    }

    if (!login) {
      setError("登录功能暂时不可用")
      return
    }

    setIsLoading(true)
    const success = await login(username)

    if (success) {
      ss.sensorsLogin(""+username);

      ss.sensorsTrack("Login", {name:"登录",LoginUsername: username});
      
      let cc = username.charAt(username.length-1);
      if(cc.charCodeAt(0) % 2 === 0) {
        ss.sensorsSetKeyValue({Sex:"女"});
        ss.sensorsSetKeyValue({City:"重庆市"});
      } else {
        ss.sensorsSetKeyValue({Sex:"男"});
        ss.sensorsSetKeyValue({City:"成都市"});
      }
      
      router.push("/")
    } else {
      setError("登录失败，请重试")
    }
    setIsLoading(false)
  }

  // Don't render the form until the component is mounted on the client
  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="p-8 bg-white rounded shadow-md w-96">
          <h1 className="text-2xl font-bold mb-6 text-center">登录</h1>
          <div className="text-center">加载中...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <ss.Sensors ></ss.Sensors>
      <div className="p-8 bg-white rounded shadow-md w-96">
      <div>这是模拟环境，无需密码，输入自定义用户名直接登录</div>
      <h1 className="text-2xl font-bold mb-6 text-center">登录</h1>
      
        {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              用户名
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              disabled={isLoading}
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? "登录中..." : "登录"}
          </button>
        </form>
      </div>
    </div>
  )
}
