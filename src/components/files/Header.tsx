"use client";
import React from "react";
import { Library } from "lucide-react";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";

interface HeaderProps {
  total?: number;
  heading: string;
  tag?: string;
}

const Header: React.FC<HeaderProps> = ({ total, heading, tag }) => {
  const router = useRouter();

  return (
    <div className="mb-8">
      <div
        onClick={() => router.back()}
        className="mb-8 cursor-pointer flex items-center gap-2 font-bold text-muted"
      >
        <button className="p-2 border border-border bg-bg2 rounded-lg transition">
          <IoIosArrowBack className="w-6 h-6 text-muted" />
        </button>
        <p className="">Back</p>
      </div>
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 border border-border bg-bg2 rounded-lg">
          <Library className="w-6 h-6 text-muted" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          {heading}
        </h1>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-muted text-sm md:text-base ">
          Access and download your important documents
        </p>
        {tag && (
          <span className="text-[10px] md:text-sm px-3 w-28 text-center md:w-fit py-1 bg-bg2 rounded-full border border-border text-muted">
            {total} {total === 1 ? tag : tag}
          </span>
        )}
      </div>
    </div>
  );
};

export default Header;
