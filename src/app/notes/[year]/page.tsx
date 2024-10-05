import { getNotes } from "@/app/api/gemini";
import BranchCard from "@/components/BranchCard";
import YearOne from "@/components/YearOne";
import React from "react";
import { drive_v3 } from "googleapis";

type Props = {
  folders: drive_v3.Schema$File[];
};

export interface NotesProps {
  params: {
    year: string;
    branch: string;
  };
  folders: drive_v3.Schema$File[];
}

const Page = async ({ params }: NotesProps) => {
  const year = params.year;
  const folderPath = `Notes/1st_year`;

  // Fetch folders from Google Drive
  const folders: drive_v3.Schema$File[] = await getNotes(folderPath);
  // console.log("Fetched folders:", folders);

  return (
    year === "1" ? (
      <YearOne folders={folders} />
    ) : (
      <div className="min-h-screen w-full">
        <h1 className="text-white text-center text-5xl font-bold py-5">
          Select your <span className="text-purple-500">Branch</span>
        </h1>
        <div>
          <BranchCard branch="CSE" link={`/notes/${year}/cse`} />
          <BranchCard branch="IT" link={`/notes/${year}/it`} />
          <BranchCard branch="CSD" link={`/notes/${year}/csd`} />
          <BranchCard branch="CSC" link={`/notes/${year}/csc`} />
          <BranchCard branch="CSM" link={`/notes/${year}/csm`} />
          <BranchCard branch="ECE" link={`/notes/${year}/ece`} />
          <BranchCard branch="EEE" link={`/notes/${year}/eee`} />
        </div>
      </div>
    )
  );
};

// Export the component as default
export default Page;
