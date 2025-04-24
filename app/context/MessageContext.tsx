"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { fetchUserMessages, fetchUnreadCount } from "../actions/messageActions"
import { useCart } from "./CartContext"

interface Message {
  id: number
  title: string
  content: string
  is_read: boolean
  created_at: string
}

interface MessageContextType {
  messages: Message[]
  unreadCount: number
  loading: boolean
  error: string | null
  refreshMessages: () => Promise<void>
  refreshUnreadCount: () => Promise<void>
}

const MessageContext = createContext<MessageContextType | undefined>(undefined)

export function MessageProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useCart()

  useEffect(() => {
    if (user) {
      refreshMessages()
      refreshUnreadCount()
    } else {
      setMessages([])
      setUnreadCount(0)
    }
  }, [user])

  const refreshMessages = async () => {
    if (!user) return

    setLoading(true)
    setError(null)
    try {
      const response = await fetchUserMessages(user.id)
      if (response.success) {
        setMessages(response.messages)
      } else {
        setError(response.error || "获取消息失败")
      }
    } catch (error) {
      setError("获取消息时发生错误")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const refreshUnreadCount = async () => {
    if (!user) return

    try {
      const response = await fetchUnreadCount(user.id)
      if (response.success) {
        setUnreadCount(response.count)
      }
    } catch (error) {
      console.error("Error fetching unread count:", error)
    }
  }

  return (
    <MessageContext.Provider
      value={{
        messages,
        unreadCount,
        loading,
        error,
        refreshMessages,
        refreshUnreadCount,
      }}
    >
      {children}
    </MessageContext.Provider>
  )
}

export function useMessages() {
  const context = useContext(MessageContext)
  if (context === undefined) {
    throw new Error("useMessages must be used within a MessageProvider")
  }
  return context
}
