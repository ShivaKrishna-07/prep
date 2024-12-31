import React from "react";
import { Library } from "lucide-react";

interface HeaderProps {
  total?: number;
  heading: string;
  tag?: string;
}

const Header: React.FC<HeaderProps> = ({ total, heading, tag }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-zinc-900 rounded-lg">
          <Library className="w-6 h-6 text-zinc-400" />
        </div>
        <h1 className="text-3xl font-bold text-white">{heading}</h1>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-zinc-400">
          Access and download your important documents
        </p>
        {tag && (
          <span className="text-sm px-3 w-28 text-center md:w-fit py-1 bg-zinc-900 rounded-full text-zinc-300">
            {total} {total === 1 ? tag : tag}
          </span>
        )}
      </div>
    </div>
  );
};

export default Header;
