import { type NextRequest, NextResponse } from "next/server"
import { getUserByUsername, createMessage } from "@/lib/db"

function parseBody(body:any) {
    let message = "";
    let username="";
    try{
        username = body[0].send_id; // body[0].user_profile.second_id;
        const sex = body[0].params.sex;
        const county = body[0].params.county;
        message = "尊敬的"+username+", 您好. 欢迎使用本系统，您的性别是"+sex+"，您来自"+county+"，祝您生活愉快！"
    } catch(err) {
        message = "您好，欢迎使用本系统，祝您生活愉快！.您的消息是:"+body;
    }
    return {username:username, message:message};
}

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body0 = await request.json()

    const body = parseBody(body0);

    console.log("parseBody0:",body0);
    console.log("parseBody1:",body);

    // Validate the request body
    if (!body.username || !body.message) {
      return NextResponse.json({ error: "Missing required fields: username and message" }, { status: 400 })
    }

    let title = "系统运营通知";

    // Get the username and message from the request body
    const { username, message } = body

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
