import BranchCard from "@/components/BranchCard";
import { branches } from "@/data/branch";
import React from "react";
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
  Layers,
} from "lucide-react";

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

export default function page({ params }: { params: { year: string } }) {
  return (
    <div className="my-10 max-w-3xl mx-auto">
      <div className="mb-12">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-zinc-900 rounded-lg">
          <Layers className="w-6 h-6 text-zinc-400" />
        </div>
        <h1 className="text-3xl font-bold text-white">Choose your Branch</h1>
      </div>
        <p className="text-gray-400 max-w-2xl">
          Select your engineering branch to access specialized learning paths
          and resources
        </p>
      </div>
      <div className="flex flex-col gap-6">
        {branches.map((branch) => {
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
  );
}
