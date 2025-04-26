import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ChatWindow } from "@/components/chat/ChatWindow";
import { ChatSidebar } from "@/components/chat/ChatSidebar";

const Page = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const user = await currentUser();
  const collegeName = user?.publicMetadata?.collegeName;

  if (!collegeName) {
    redirect("/profile/new?redirectTo=/chatbot");
  }

  return (
    <div className="flex h-[calc(100dvh-120px)] md:h-[calc(100dvh-64px)] w-full overflow-hidden bg-background">
      <div className="flex-1 w-screen relative">
        <ChatWindow userId={user.id} chatId={searchParams.id as string} />
      </div>
    </div>
  );
};

export default Page;