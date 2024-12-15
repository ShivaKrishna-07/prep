import YearCard from "@/components/YearCard";
import { Layers } from "lucide-react";
import React from "react";

const Notes = () => {
  return (
    <div className="my-10 max-w-3xl mx-auto">
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-zinc-900 rounded-lg">
            <Layers className="w-6 h-6 text-zinc-400" />
          </div>
          <h1 className="text-3xl font-bold text-white">Choose your Academic Year</h1>
        </div>
        <p className="text-gray-400 max-w-2xl">
          Select your Year to access specialized learning paths and resources.
        </p>
      </div>
      <div className="flex flex-col gap-6">
        <YearCard year="1" link="/notes/1st_year" />
        <YearCard year="2" link="/notes/2nd_year" />
        <YearCard year="3" link="/notes/3rd_year" />
        <YearCard year="4" link="/notes/4th_year" />
      </div>
    </div>
  );
};

export default Notes;
