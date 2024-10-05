// src/components/SubjectCard.tsx
import React from "react";
import { drive_v3 } from "googleapis";
import { slugify } from "@/lib/utils";

type SubjectCardProps = {
  folders: drive_v3.Schema$File[];
};

const SubjectCard: React.FC<SubjectCardProps> = ({ folders }) => {

  return (
    <div className="flex w-1/2 m-auto flex-col space-y-4 p-4">
      {folders.map((folder) => (
        <div
          onClick={() => handleSubmit(folder.name)}
          key={folder.id}
          className="bg-gray-200 cursor-pointer p-4 rounded shadow-md"
        >
          <h2 className="text-xl font-bold">{folder.name || "Untitled"}</h2> {/* Fallback if name is null */}
        </div>
      ))}
    </div>
  );
};

export default SubjectCard;
