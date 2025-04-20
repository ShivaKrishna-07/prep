"use client";

import React, { useState } from "react";
import Header from "./files/Header";
import BranchCard from "./BranchCard";
import { branches } from "@/data/branch";
import {
  Code2,
  MonitorSmartphone,
  Binary,
  Server,
  Cpu,
  Building,
  Cog,
  Signal,
  BatteryCharging,
} from "lucide-react";
import SearchBar from "./files/SearchBar";
import { filterBranches } from "@/lib/utils";

const icons = {
  Code2,
  MonitorSmartphone,
  Binary,
  Server,
  Cpu,
  Cog,
  Building,
  Signal,
  BatteryCharging,
};

export interface Branch {
  title: string;
  icon: string;
  color: string;
  description: string;
}

const SyllabusPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredBranches = filterBranches(branches, searchQuery);

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-3xl mx-auto">
        <Header heading={'Select your Branch'} tag="branches" total={filteredBranches.length} />
        <SearchBar placeholder="Search branch" searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        <div className="flex flex-col gap-5">
          {filteredBranches.map((branch: Branch) => {
            const IconComponent = icons[branch.icon as keyof typeof icons];
            return (
              <BranchCard
                link={`/syllabus/${branch.title.toLowerCase()}`}
                key={branch.title}
                color={branch.color}
                branch={branch.title}
                description={branch.description}
                IconComponent={IconComponent}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SyllabusPage;
