// app/api/chats/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import connectToDB from "@/lib/db";
import { Chat } from "@/lib/models/Chat";

// Get specific chat
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectToDB();
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const chat = await Chat.findOne({
      _id: params.id,
      userId: user.id,
    });

    if (!chat) {
      return NextResponse.json({ error: "Chat not found" }, { status: 404 });
    }

    return NextResponse.json(chat);
  } catch (error) {
    console.error("Error fetching chat:", error);
    return NextResponse.json(
      { error: "Failed to fetch chat" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDB();
    const user = await currentUser();
    const { question, answer } = await req.json();

    // Validate inputs
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    if (typeof question !== "string" || typeof answer !== "string") {
      return NextResponse.json(
        { error: "Question and answer must be strings" },
        { status: 400 }
      );
    }

    const updateData = {
      $push: {
        messages: {
          $each: [
            { role: "user", content: question.trim() },
            { role: "assistant", content: answer.trim() },
          ],
        },
      },
    };

    const updatedChat = await Chat.findOneAndUpdate(
      {
        _id: params.id,
        userId: user.id,
      },
      updateData,
      { new: true, runValidators: true } // Ensure validators run
    );


    if (!updatedChat) {
      return NextResponse.json(
        { error: "Chat not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedChat);
  } catch (error) {
    console.error("Error updating chat:", error);
    return NextResponse.json(
      { error: "Failed to update chat" },
      { status: 500 }
    );
  }
}
