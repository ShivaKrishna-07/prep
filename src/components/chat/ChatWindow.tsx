"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";

import { BotIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Loader from "../ui/Loader";
import { generateChatResponse } from "@/lib/gemini";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { FaArrowUp } from "react-icons/fa";

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
  const [creatingChat, setCreatingChat] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

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
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      // Get AI response directly using generateChatResponse
      const content = await generateChatResponse(newMessages);
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
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            error instanceof Error
              ? error.message
              : "Sorry, something went wrong!",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const createNewChat = async () => {
    setCreatingChat(true);
    try {
      const res = await fetch("/api/chats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to create chat");
      }

      const { chatId } = await res.json();
      router.push(`/chatbot/${chatId}`);
    } catch (error) {
      console.error("Chat creation error:", error);
    } finally {
      setCreatingChat(false);
    }
  };

  return (
    <div className="flex bg-background text-foreground flex-col w-full h-full relative">
      {messages.length === 0 && !chatId && (
        <div className="absolute inset-0 h-full flex items-center justify-center flex-col p-6  bg-background">
          <div className="flex flex-col items-center text-center">
            <div className="bg-primary/10 p-6 rounded-full">
              <BotIcon className="w-12 h-12 text-primary" />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
                Welcome to ChatBot
              </h1>
              <p className="text-muted-foreground text-sm max-w-md mx-auto">
                Ask anything and let&apos;s chat.
              </p>
            </div>
          </div>
        </div>
      )}

      <ScrollArea className="flex-1 p-4 md:px-8">
        <div className="max-w-3xl mx-auto space-y-4 pb-20">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={cn(
                "flex",
                msg.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[85%] px-4 py-3 rounded-xl",
                  msg.role === "user"
                    ? "bg-bg2 text-primary-foreground"
                    : "bg-muted text-background "
                )}
              >
                {msg.role === "assistant" ? (
                  <div className="prose dark:prose-invert prose-sm max-w-none">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                ) : (
                  <p>{msg.content}</p>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="px-4 py-3">
                <Loader className="w-6 h-6" />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      <div className="absolute bottom-0 left-0 right-0 bg-background p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!chatId) createNewChat();
            else handleSend();
          }}
          className="max-w-3xl shadow-custom dark:bg-bg2 p-1 rounded-lg mx-auto flex items-center gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything"
            className="flex-1 dark:bg-bg2 border-none"
          />
          <button
            className="bg-foreground p-2 mr-1 text-background dark:bg-muted rounded-lg"
            type="submit"
            disabled={loading || creatingChat}
          >
            {loading || creatingChat ? (
              <Loader className="w-4 h-4 text-background animate-spin" />
            ) : (
              <FaArrowUp className="w-4 h-4" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
