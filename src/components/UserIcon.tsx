"use client";
import { useUser, SignOutButton } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { isErrored } from "stream";

const UserIcon = () => {
  const { user } = useUser();
  const router = useRouter();

  if (!user) return <p className="text-sm">Login/Signup</p>;

  return (
    <div className="relative">
      <button
        onClick={() => router.push("/profile")}
        className="rounded-full flex items-center cursor-pointer"
      >
        {user.imageUrl ? (
          <Image
            width={100}
            height={100}
            src={user.imageUrl}
            alt="User"
            className="rounded-full w-7 h-7"
          />
        ) : (
          <div className="rounded-full bg-muted w-7 h-7"></div>
        )}
      </button>
    </div>
  );
};

export default UserIcon;
