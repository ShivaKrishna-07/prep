import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Branch {
  link: string;
  branch: string;
  IconComponent: any;
  description: string;
  color: string;
}

const BranchCard = ({
  link,
  branch,
  IconComponent,
  color,
  description,
}: Branch) => {
  return (
    <Link href={link}>
      <div className="bg-zinc-900 rounded-xl p-6 hover:bg-zinc-800/90 transition-all duration-300 border border-zinc-800 group">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-gray-700 transition-colors">
              <IconComponent className={`w-6 h-6 text-${color}-400`} />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-1">
                {branch}
              </h3>
              <p className="text-gray-400 text-sm">{description}</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-white transform group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </Link>
  );
};

export default BranchCard;
