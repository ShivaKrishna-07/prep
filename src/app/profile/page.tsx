"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { SignOutButton, useUser } from "@clerk/nextjs";
import {
  ArrowLeft,
  GraduationCap,
  LogOut,
  Mail,
  MonitorSmartphone,
  PencilLine,
  User,
} from "lucide-react";
import Loader from "@/components/ui/Loader";
import ThemeToggle from "@/components/ThemeToggle";

interface ProfileData {
  collegeName?: string;
  year?: string;
  department?: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const { user, isLoaded } = useUser();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/profile");

        if (!response.ok) {
          if (response.status === 404) {
            router.push("/profile/new");
            return;
          }
          throw new Error("Failed to fetch profile");
        }

        const data = await response.json();
        setProfile(data.profile);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" >
        <Loader />
      </div>
    );
  }

  if (
    !profile ||
    (!profile.collegeName && !profile.year && !profile.department)
  ) {
    router.push("/profile/new");
    return null;
  }

  return (
    <div className="min-h-screen p-6 space-y-6">
      {/* Top header with title and back button */}
      <div className="flex items-center w-full gap-3">
        <button
          onClick={() => router.push("/")}
          className="md:hidden p-2 rounded-md border border-border cursor-pointer transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl w-full mr-10 md:mr-0 text-center font-semibold">
          Your Profile
        </h1>
        <ThemeToggle/>
      </div>

      <div className="flex flex-col md:flex-row gap-6 h-full">
        {/* Left - Profile Info */}
        <div className="w-full md:w-1/3 rounded-lg shadow-custom dark:border dark:border-border p-6 flex justify-center items-center">
          <div className="flex flex-col items-center gap-4">
            <Image
              alt="user"
              src={user?.imageUrl ?? "/user.webp"}
              width={100}
              height={100}
              className="w-24 h-24 rounded-full"
            />
            <h2 className="text-xl capitalize text-center">{user?.fullName}</h2>
          </div>
        </div>

        {/* Right - Info Card */}
        <div className="w-full md:w-2/3 md:shadow-custom dark:md:border dark:md:border-border rounded-lg flex flex-col justify-between">
          <div className="rounded-lg shadow-custom md:shadow-none md:border-none dark:border dark:border-border p-6 h-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <InfoField
                label="Name"
                icon={<User className="w-5 h-5 text-muted" />}
                value={user?.fullName ?? ""}
              />
              <InfoField
                label="Email"
                icon={<Mail className="w-5 h-5 text-muted" />}
                value={user?.emailAddresses?.[0]?.emailAddress ?? ""}
              />
              <InfoField
                label="College Name"
                icon={<GraduationCap className="w-5 h-5 text-muted" />}
                value={profile.collegeName ?? ""}
              />
              <InfoField
                label="Department"
                icon={<MonitorSmartphone className="w-5 h-5 text-muted" />}
                value={profile.department ?? ""}
              />
              <InfoField
                label="Year"
                icon={<GraduationCap className="w-5 h-5 text-muted" />}
                value={profile.year ?? ""}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col md:mb-4 md:mr-6 md:flex-row justify-end gap-4 mt-4">
            <button
              onClick={() => router.push("/profile/edit")}
              className="border border-border px-6 py-2 flex items-center justify-center gap-2 rounded-md transition"
            >
              <PencilLine className="w-5 h-5" />
              Edit Profile
            </button>
            <SignOutButton>
              <button className="bg-red-600 text-white px-6 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-red-700 transition">
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </SignOutButton>
          </div>
        </div>
      </div>
    </div>
  );
}

const InfoField = ({
  label,
  icon,
  value,
}: {
  label: string;
  icon: React.ReactNode;
  value: string;
}) => (
  <div>
    <label className="text-sm text-muted block mb-1">{label}</label>
    <div className="flex items-center gap-2 bg-primary-bg rounded-md px-3 py-2 border border-border">
      {icon}
      <input
        type="text"
        value={value}
        className="w-full bg-transparent border-none outline-none"
        readOnly
      />
    </div>
  </div>
);
