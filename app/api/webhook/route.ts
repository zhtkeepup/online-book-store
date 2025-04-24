import { type NextRequest, NextResponse } from "next/server"
import { getUserByUsername, createMessage } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json()

    // Validate the request body
    if (!body.username || !body.message) {
      return NextResponse.json({ error: "Missing required fields: username and message" }, { status: 400 })
    }

    // Get the username and message from the request body
    const { username, message, title = "系统通知" } = body

    // Find the user by username
    const user = await getUserByUsername(username)
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Create a new message for the user
    await createMessage(user.id, title, message)

    // Return a success response
    return NextResponse.json({ success: true, message: "Message sent successfully" }, { status: 200 })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
