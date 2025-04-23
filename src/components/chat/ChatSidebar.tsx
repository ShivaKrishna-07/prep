"use client"

import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface ChatSummary {
  _id: string;
  title: string;
}

export function ChatSidebar() {
  const [chats, setChats] = useState<ChatSummary[]>([]);
  const router = useRouter();

  const fetchChats = async () => {
    try {
      const res = await fetch("/api/chats");
      if (!res.ok) throw new Error("Failed to fetch chats");
      const data = await res.json();
      setChats(data);
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };

  // components/chat/ChatSidebar.tsx
const createNewChat = async () => {
  try {
    const res = await fetch("/api/chats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: "New Chat" }),
    });
    
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "Failed to create chat");
    }
    
    const { chatId } = await res.json();
    router.push(`/chatbot/${chatId}`);
    
  } catch (error) {
    console.error("Chat creation error:", error);
  }
};

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div className="w-64 border-r border-border bg-background text-foreground p-4 flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Chats</h2>
        <Button size="icon" onClick={createNewChat}>
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-2">
          {chats.map((chat) => (
            <Link key={chat._id} href={`/chatbot/${chat._id}`}>
              <Button variant="ghost" className="w-full justify-start truncate">
                {chat.title}
              </Button>
            </Link>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}