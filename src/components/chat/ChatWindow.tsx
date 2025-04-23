"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";
import Loader from "../ui/Loader";
import { generateChatResponse } from "@/lib/gemini";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatWindowProps {
  userId: string;
  chatId?: string;
}

export function ChatWindow({ userId, chatId }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Fetch chat messages when chatId changes
  useEffect(() => {
    if (!chatId) {
      setMessages([]);
      return;
    }

    const fetchChat = async () => {
      try {
        const res = await fetch(`/api/chats/${chatId}`);
        if (!res.ok) throw new Error("Failed to fetch chat");
        const chat = await res.json();
        setMessages(chat.messages);
      } catch (error) {
        console.error("Error fetching chat:", error);
      }
    };

    fetchChat();
  }, [chatId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !chatId) return;
  
    const userMessage: Message = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
  
    try {
      // Get AI response directly using generateChatResponse
      const content = await generateChatResponse(newMessages);
      // Validate AI response
      if (typeof content !== "string") {
        throw new Error("Invalid AI response format");
      }
  
      // Update chat with both messages
      const updateResponse = await fetch(`/api/chats/${chatId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: input.trim(),
          answer: content.trim(),
        }),
      });
  
      if (!updateResponse.ok) {
        const error = await updateResponse.json();
        throw new Error(error.error || "Failed to update chat");
      }
  
      const updatedChat = await updateResponse.json();
      setMessages(updatedChat.messages);
    } catch (error) {
      console.error("Error while sending message:", error);
      setMessages(prev => [...prev, {
        role: "assistant",
        content: error instanceof Error ? error.message : "Sorry, something went wrong!"
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-background text-foreground flex-col w-full h-full">
      <ScrollArea className="flex-1 p-4 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={cn(
              "max-w-lg px-4 py-2 rounded-xl",
              msg.role === "user"
                ? "bg-primary text-white self-end"
                : "bg-muted text-foreground self-start"
            )}
          >
            {msg.content}
          </div>
        ))}
        {loading && <Loader className="justify-start w-6 h-6" />}
        <div ref={bottomRef} />
      </ScrollArea>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="border-t border-border p-4 flex items-center gap-2"
      >
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
          className="flex-1"
          disabled={!chatId}
        />
        <Button type="submit" disabled={loading || !chatId}>
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
}