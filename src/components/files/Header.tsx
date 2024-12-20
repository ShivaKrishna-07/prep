import React from 'react';
import { Library } from 'lucide-react';

interface HeaderProps {
  totalFiles: number;
  branch: string;
}

const Header: React.FC<HeaderProps> = ({ totalFiles, branch }) => {
  const Branch = branch.toUpperCase();
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-zinc-900 rounded-lg">
          <Library className="w-6 h-6 text-zinc-400" />
        </div>
        <h1 className="text-3xl font-bold text-white">{Branch} Syllabus</h1>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-zinc-400">Access and download your important documents</p>
        <span className="text-sm px-3 py-1 bg-zinc-900 rounded-full text-zinc-300">
          {totalFiles} {totalFiles === 1 ? 'file' : 'files'}
        </span>
      </div>
    </div>
  );
}

export default Header;