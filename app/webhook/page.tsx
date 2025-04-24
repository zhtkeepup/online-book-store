"use client"

import type React from "react"

import { useState } from "react"

export default function WebhookTestPage() {
  const [username, setUsername] = useState("")
  const [title, setTitle] = useState("系统通知")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [response, setResponse] = useState<any>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!username || !message) {
      alert("请填写用户名和消息内容")
      return
    }

    setStatus("loading")

    try {
      const res = await fetch("/api/webhook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          title,
          message,
        }),
      })

      const data = await res.json()
      setResponse(data)

      if (res.ok) {
        setStatus("success")
        // Clear form on success
        setMessage("")
      } else {
        setStatus("error")
      }
    } catch (error) {
      console.error("Error sending webhook:", error)
      setStatus("error")
      setResponse({ error: "发送请求时出错" })
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Webhook 测试工具</h1>

      <div className="mb-6 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">使用说明</h2>
        <p className="text-sm text-gray-700 mb-2">此页面用于测试 webhook 功能。您可以使用此表单向指定用户发送消息。</p>
        <p className="text-sm text-gray-700">
          在实际应用中，您可以通过向 <code className="bg-gray-200 px-1 rounded">/api/webhook</code> 发送 POST
          请求来使用此功能。
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
            用户名
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="输入接收消息的用户名"
            required
          />
        </div>

        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            消息标题
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="输入消息标题"
            required
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            消息内容
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="输入要发送的消息内容"
            required
          />
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {status === "loading" ? "发送中..." : "发送消息"}
        </button>
      </form>

      {response && (
        <div className={`mt-6 p-4 rounded-lg ${status === "success" ? "bg-green-100" : "bg-red-100"}`}>
          <h3 className="text-lg font-semibold mb-2">响应结果</h3>
          <pre className="text-sm overflow-auto p-2 bg-white rounded">{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}

      <div className="mt-8 border-t pt-6">
        <h2 className="text-lg font-semibold mb-4">API 文档</h2>

        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-md font-medium mb-2">POST /api/webhook</h3>

          <div className="mb-4">
            <h4 className="text-sm font-medium mb-1">请求体 (JSON):</h4>
            <pre className="text-xs bg-white p-2 rounded">
              {`{
  "username": "用户名",
  "title": "消息标题", // 可选，默认为 "系统通知"
  "message": "消息内容"
}`}
            </pre>
          </div>

          <div className="mb-4">
            <h4 className="text-sm font-medium mb-1">成功响应 (200):</h4>
            <pre className="text-xs bg-white p-2 rounded">
              {`{
  "success": true,
  "message": "Message sent successfully"
}`}
            </pre>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-1">错误响应:</h4>
            <pre className="text-xs bg-white p-2 rounded">
              {`// 400 Bad Request
{
  "error": "Missing required fields: username and message"
}

// 404 Not Found
{
  "error": "User not found"
}

// 500 Internal Server Error
{
  "error": "Internal server error"
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}

