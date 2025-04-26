"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Plus, MenuIcon, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { IoChatbubblesSharp } from "react-icons/io5";

interface ChatSummary {
  _id: string;
  title: string;
}

export function ChatSidebar() {
  const [chats, setChats] = useState<ChatSummary[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

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

  useEffect(() => {
    fetchChats();

    // Handle window resize
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setSidebarOpen(!mobile);
    };

    // Set initial state
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const SidebarContent = () => (
    <div className="flex flex-col gap-8 h-full">
      <div className="flex flex-col gap-3 mt-16 px-2">
        <div
          className="flex items-center gap-2 cursor-pointer "
          onClick={() => router.push("/chatbot")}
        >
          <div className="border border-border bg-foreground text-background rounded-full p-[5px] w-fit">
            <Plus className="w-4 h-4" />
          </div>
          <p>New Chat</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-fit ml-[3px]">
            <IoChatbubblesSharp className="w-6 h-6" />
          </div>
          <h2 className="">Chats</h2>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="">
          {chats.map((chat) => (
            <Link key={chat._id} href={`/chatbot/${chat._id}`}>
              <Button
                variant={pathname.includes(chat._id) ? "secondary" : "ghost"}
                className="w-full justify-start text-sm truncate h-auto py-2"
              >
                {chat.title}
              </Button>
            </Link>
          ))}
          {chats.length === 0 && (
            <p className="text-muted-foreground text-center py-4 text-sm">
              No chats yet
            </p>
          )}
        </div>
      </ScrollArea>
    </div>
  );

  // Mobile sidebar (Sheet component)
  const MobileSidebar = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <MenuIcon className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0">
        <div className="h-full py-4">
          <SidebarContent />
        </div>
      </SheetContent>
    </Sheet>
  );

  // Desktop sidebar
  const DesktopSidebar = () => (
    <div
      className={cn(
        "border-r border-border bg-background transition-all duration-300 h-full",
        sidebarOpen ? "w-64" : "w-0"
      )}
    >
      {sidebarOpen && (
        <div className="p-4 h-full">
          <SidebarContent />
        </div>
      )}
    </div>
  );

  const ToggleSidebarButton = () => (
    <div
      className="hidden cursor-pointer p-2 rounded-lg border border-border md:flex absolute top-4 left-6 z-10"
      onClick={() => setSidebarOpen(!sidebarOpen)}
    >
      <MenuIcon className="h-4 w-4" />
    </div>
  );

  return (
    <>
      <MobileSidebar />
      <DesktopSidebar />
      {!isMobile && <ToggleSidebarButton />}
    </>
  );
}
