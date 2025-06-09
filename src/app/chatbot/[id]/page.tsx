// app/chatbot/[id]/page.tsx
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ChatWindow } from "@/components/chat/ChatWindow";

export default async function ChatPage({ params }: { params: { id: string } }) {
  const user = await currentUser();
  const collegeName = user?.publicMetadata?.collegeName;

  if (!collegeName) {
    redirect("/profile/new?redirectTo=/chatbot");
  }

  return (
    <div className="flex h-[calc(100dvh-120px)] md:h-[calc(100dvh-64px)] w-full overflow-hidden">
      <div className="flex-1 w-screen relative">
        <ChatWindow userId={user.id} chatId={params.id} />
      </div>
    </div>
  );
}
