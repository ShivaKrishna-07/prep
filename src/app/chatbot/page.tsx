import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const page = async () => {

  const user = await currentUser();

  const collegeName = user?.publicMetadata?.collegeName;
  if (!collegeName) {
    redirect("/profile/new?redirectTo=/chatbot");
  }

  return (
    <div className='min-h-screen min-w-full flex items-center justify-center'>
        chatbot
    </div>
  )
}

export default page