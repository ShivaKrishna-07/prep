import { ChevronRight, NotepadTextIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Year {
  year: string;
  link: string;
  IconComponent: any;
  title: string;
}

const YearCard = ({ year, link, IconComponent, title }: Year) => {
  return (
    <Link href={link}>
      <div className="bg-zinc-900 rounded-lg p-6 hover:bg-zinc-800/90 transition-all duration-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-zinc-800 rounded-lg group-hover:bg-gray-700 transition-colors">
              <IconComponent className={`w-6 h-6`} />
            </div>
            <div>
              <h3 className="md:text-xl font-semibold sm:text-2xl text-white mb-1">
                {title}
              </h3>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-white transform group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </Link>
  );
};

export default YearCard;
