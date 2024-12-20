import { getFolders} from "@/app/api/gemini";
import BranchCard from "@/components/BranchCard";
import YearOne from "@/components/YearOne";
import React from "react";
import { drive_v3 } from "googleapis";
import { branches } from "@/data/branch";
import * as icons from "lucide-react";

type Props = {
  folders: drive_v3.Schema$File[];
};

export interface NotesProps {
  params: {
    year: string;
    branch: string;
  };
}

const Page = async ({ params }: NotesProps) => {
  const { year } = params;

  const folderPath = `Notes/${year}`;

  // Fetch folders using the provided API
  const folders: drive_v3.Schema$File[] = await getFolders(folderPath);

  return year === "1st_year" ? (
    <YearOne folders={folders} />
  ) : (
    <div className="min-h-screen w-full my-10 max-w-3xl mx-auto ">
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-zinc-900 rounded-lg">
            <icons.Layers className="w-6 h-6 text-zinc-400" />
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
              link={`/notes/${year}/${branch.title.toLowerCase()}`}
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
};

export default Page;
