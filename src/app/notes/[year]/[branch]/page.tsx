import { getFiles } from "@/app/api/gemini";
import React from "react";
import SubjectCard from "@/components/SubjectCard";
import {
  Code2,
  MonitorSmartphone,
  Binary,
  Server,
  Cpu,
  Cog,
  Building,
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

type NotesProps = {
  params: {
    year: string;
    branch: string;
  };
};

const page = async ({ params }: NotesProps) => {
  const path = `Notes/${params.year}/${params.branch}`;
  const folders = await getFiles(path);

  return (
    <div className="my-10 max-w-3xl mx-auto">
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-zinc-900 rounded-lg">
            <Layers className="w-6 h-6 text-zinc-400" />
          </div>
          <h1 className="text-3xl font-bold text-white">Choose your Subject</h1>
        </div>
        <p className="text-gray-400 max-w-2xl">
          Select a subject to access specialized learning paths and resources.
        </p>
      </div>
      <div className="flex flex-col gap-6">
        {folders.map((folder) => (
          <SubjectCard branch={params.branch} key={folder.id} folder={folder} />
        ))}
      </div>
    </div>
  );
};

export default page;
