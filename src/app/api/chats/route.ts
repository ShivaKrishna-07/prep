// app/api/chats/route.ts
import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import connectToDB from "@/lib/db";
import { Chat } from "@/lib/models/Chat";
import { UserChats } from "@/lib/models/userChats";

// Create new chat
export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    const user = await currentUser();
    const { text } = await req.json();

    if (!user || !text) {
      return NextResponse.json(
        { error: "Unauthorized or invalid data" },
        { status: 400 }
      );
    }

    const newChat = await Chat.create({
      userId: user.id,
      messages: [{ role: "user", content: text }],
    });

    await UserChats.findOneAndUpdate(
      { userId: user.id },
      {
        $push: {
          chats: {
            _id: newChat._id,
            title: text.substring(0, 40),
          },
        },
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({ chatId: newChat._id });
    
  } catch (error) {
    console.error("Chat creation error:", error);
    return NextResponse.json(
      { error: "Failed to create chat. Please try again." },
      { status: 500 }
    );
  }
}

// Get all user chats
export async function GET() {
  try {
    await connectToDB();
    const user = await currentUser();
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userChats = await UserChats.findOne({ userId: user.id });
    return NextResponse.json(userChats?.chats || []);
    
  } catch (error) {
    console.error("Database connection error:", error);
    return NextResponse.json(
      { error: "Database connection failed. Please try again later." },
      { status: 500 }
    );
  }
}