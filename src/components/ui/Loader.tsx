"use client";

import { LoaderCircle } from "lucide-react";

interface LoaderProps {
  className?: string; // Optional className prop
}

const Loader: React.FC<LoaderProps> = ({ className }) => {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <LoaderCircle className="animate-spin w-12 h-12 text-muted" />
    </div>
  );
};

export default Loader;
