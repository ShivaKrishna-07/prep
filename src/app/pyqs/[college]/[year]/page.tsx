import { getFolders } from "@/app/api/gemini";
import BranchCard from "@/components/BranchCard";
import YearOne from "@/components/YearOne";
import React from "react";
import { drive_v3 } from "googleapis";
import { branches } from "@/data/branch";
import * as icons from "lucide-react";
import Header from "@/components/files/Header";

type Props = {
  folders: drive_v3.Schema$File[];
};

export interface NotesProps {
  params: {
    year: string;
    branch: string;
    college:string;
  };
}

const Page = async ({ params }: NotesProps) => {
  const { year, college } = params;

  const folderPath = `PYQS/${college}/${year}`;
  const folders: drive_v3.Schema$File[] = await getFolders(folderPath);

  return year === "1st_year" ? (
    <YearOne folders={folders} />
  ) : (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-3xl mx-auto">
        <Header
          heading={"Select your Branch"}
          tag="branches"
          total={branches.length}
        />
        <div className="flex flex-col gap-5">
          {branches.map((branch) => {
            const IconComponent = icons[branch.icon as keyof typeof icons];
            return (
              <BranchCard
                link={`/pyqs/${college}/${year}/${branch.title.toLowerCase()}`}
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

export default Page;
