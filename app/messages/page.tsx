"use client"

import { useMessages } from "../context/MessageContext"
import { useCart } from "../context/CartContext"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import MessageDetail from "../components/MessageDetail"
import { removeMessage, markAsRead } from "../actions/messageActions"

export default function MessagesPage() {
  const { messages, loading, error, refreshMessages, refreshUnreadCount } = useMessages()
  const { user } = useCart()
  const router = useRouter()
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  if (!user) {
    return (
      <div className="text-center py-10">
        <p className="mb-4">请登录以查看您的消息。</p>
        <Link href="/login" className="text-blue-500 hover:underline">
          前往登录页面
        </Link>
      </div>
    )
  }

  const handleMessageClick = async (messageId: number) => {
    setSelectedMessage(messageId)

    // Mark as read when clicked
    if (messages.find((m) => m.id === messageId && !m.is_read)) {
      await markAsRead(messageId, user.id)
      refreshMessages()
      refreshUnreadCount()
    }
  }

  const handleDeleteMessage = async (messageId: number) => {
    if (confirm("确定要删除这条消息吗？")) {
      setIsDeleting(true)
      const result = await removeMessage(messageId, user.id)
      if (result.success) {
        if (selectedMessage === messageId) {
          setSelectedMessage(null)
        }
        refreshMessages()
        refreshUnreadCount()
      }
      setIsDeleting(false)
    }
  }

  const handleBackToList = () => {
    setSelectedMessage(null)
  }

  if (loading) {
    return <div className="text-center py-10">加载中...</div>
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>
  }

  if (selectedMessage !== null) {
    const message = messages.find((m) => m.id === selectedMessage)
    if (!message) {
      return <div className="text-center py-10 text-red-500">消息不存在</div>
    }

    return (
      <MessageDetail
        message={message}
        onBack={handleBackToList}
        onDelete={() => handleDeleteMessage(message.id)}
        isDeleting={isDeleting}
      />
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">我的消息</h1>

      {messages.length === 0 ? (
        <div className="text-center py-10 bg-white rounded-lg shadow p-6">
          <p>您没有任何消息</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {messages.map((message) => (
              <li key={message.id} className="hover:bg-gray-50">
                <div className="flex items-center px-4 py-4 sm:px-6">
                  <div className="min-w-0 flex-1 flex items-center">
                    <div className="flex-shrink-0">
                      {!message.is_read && <span className="h-3 w-3 bg-blue-500 rounded-full block"></span>}
                    </div>
                    <div
                      className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4 cursor-pointer"
                      onClick={() => handleMessageClick(message.id)}
                    >
                      <div>
                        <p className={`text-sm font-medium ${!message.is_read ? "text-blue-600" : "text-gray-900"}`}>
                          {message.title}
                        </p>
                        <p className="mt-2 flex items-center text-sm text-gray-500 truncate">
                          {message.content.substring(0, 50)}
                          {message.content.length > 50 ? "..." : ""}
                        </p>
                      </div>
                      <div className="hidden md:block">
                        <div>
                          <p className="text-sm text-gray-500">
                            {new Date(message.created_at).toLocaleString("zh-CN", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteMessage(message.id)
                      }}
                      className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      disabled={isDeleting}
                    >
                      删除
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
