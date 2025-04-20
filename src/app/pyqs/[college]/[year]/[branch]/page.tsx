import { getFiles } from "@/app/api/drive";
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
import Header from "@/components/files/Header";

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
    college: string;
  };
};

const page = async ({ params }: NotesProps) => {
  const path = `PYQS/${params.college}/${params.year}/${params.branch}`;
  const folders = await getFiles(path);

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-3xl mx-auto">
        <Header
          heading={"Select your Subject"}
          tag="subjects"
          total={folders.length}
        />
        <div className="flex flex-col gap-5">
          {folders.map((folder) => (
            <SubjectCard
              branch={params.branch}
              key={folder.id}
              folder={folder}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
