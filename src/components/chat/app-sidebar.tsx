"Use client"

// app-sidebar.tsx
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { useSidebar } from "@/components/ui/sidebar";
import { Plus } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { IoChatbubblesSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import Link from "next/link";

interface ChatSummary {
  _id: string;
  title: string;
}

export function AppSidebar() {
  const [chats, setChats] = useState<ChatSummary[]>([]);
  const router = useRouter();
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();


  useEffect(() => {
    // Fetch chats from your API
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

    fetchChats();
  }, []);

  return (
    <Sidebar collapsible="offcanvas" side="left">
      <SidebarContent className="py-6" >
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Button
                    variant="ghost"
                    onClick={() => router.push("/chatbot")}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    <div onClick={() => {router.push('/chatbot');
                      setOpenMobile(false);
                    }} >Start New Chat</div>
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Chats</SidebarGroupLabel>
          <SidebarGroupContent>
            <ScrollArea className="h-[calc(100vh-200px)]">
              <SidebarMenu>
                {chats.length > 0 ? (
                  [...chats].reverse().map((chat) => (
                    <SidebarMenuItem key={chat._id}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname.includes(chat._id)}
                      >
                        <Link href={`/chatbot/${chat._id}`} onClick={() => setOpenMobile(false)} >
                          <IoChatbubblesSharp className="w-4 h-4 mr-2" />
                          <span>{chat.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))
                ) : (
                  <p className="text-muted-foreground text-center py-4 text-sm">
                    No chats yet
                  </p>
                )}
              </SidebarMenu>
            </ScrollArea>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
