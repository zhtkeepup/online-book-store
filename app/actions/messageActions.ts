"use server"

import { getUserMessages, getUnreadMessageCount, getMessage, markMessageAsRead, deleteMessage } from "@/lib/db"

export async function fetchUserMessages(userId: number) {
  try {
    const messages = await getUserMessages(userId)
    return { success: true, messages }
  } catch (error) {
    console.error("Error fetching messages:", error)
    return { success: false, error: "获取消息失败" }
  }
}

export async function fetchUnreadCount(userId: number) {
  try {
    const count = await getUnreadMessageCount(userId)
    return { success: true, count }
  } catch (error) {
    console.error("Error fetching unread count:", error)
    return { success: false, error: "获取未读消息数量失败" }
  }
}

export async function fetchMessage(messageId: number, userId: number) {
  try {
    const message = await getMessage(messageId, userId)
    if (!message) {
      return { success: false, error: "消息不存在" }
    }
    return { success: true, message }
  } catch (error) {
    console.error("Error fetching message:", error)
    return { success: false, error: "获取消息详情失败" }
  }
}

export async function markAsRead(messageId: number, userId: number) {
  try {
    await markMessageAsRead(messageId, userId)
    return { success: true }
  } catch (error) {
    console.error("Error marking message as read:", error)
    return { success: false, error: "标记消息为已读失败" }
  }
}

export async function removeMessage(messageId: number, userId: number) {
  try {
    await deleteMessage(messageId, userId)
    return { success: true }
  } catch (error) {
    console.error("Error deleting message:", error)
    return { success: false, error: "删除消息失败" }
  }
}
