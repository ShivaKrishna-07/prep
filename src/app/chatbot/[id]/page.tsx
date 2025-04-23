// app/chatbot/[id]/page.tsx
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { ChatWindow } from "@/components/chat/ChatWindow";

export default async function ChatPage({
  params,
}: {
  params: { id: string };
}) {
  const user = await currentUser();
  const collegeName = user?.publicMetadata?.collegeName;

  if (!collegeName) {
    redirect("/profile/new?redirectTo=/chatbot");
  }

  return (
    <div className="flex h-[86.5vh] w-full overflow-hidden">
      <ChatSidebar />
      <ChatWindow userId={user.id} chatId={params.id} />
    </div>
  );
}