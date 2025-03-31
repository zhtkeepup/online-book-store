"use server"

import { createUserIfNotExists, getUserByUsername } from "@/lib/db"

export async function loginUser(username: string) {
  try {
    const user = await createUserIfNotExists(username)
    if (!user) {
      return { success: false, error: "Failed to create or find user" }
    }
    return {
      success: true,
      user: {
        id: user.id,
        username: user.username,
      },
    }
  } catch (error) {
    console.error("Error logging in:", error)
    return { success: false, error: "Failed to log in" }
  }
}

export async function getUserData(username: string) {
  try {
    const user = await getUserByUsername(username)
    if (!user) {
      return { success: false, error: "User not found" }
    }
    return {
      success: true,
      user: {
        id: user.id,
        username: user.username,
      },
    }
  } catch (error) {
    console.error("Error getting user data:", error)
    return { success: false, error: "Failed to get user data" }
  }
}


