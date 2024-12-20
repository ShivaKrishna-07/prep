import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="relative mb-6">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-zinc-500" />
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-3 py-2 border border-zinc-800 rounded-lg bg-zinc-900 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-700 focus:border-transparent"
        placeholder="Search documents..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;