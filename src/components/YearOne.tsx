"use client";
import { drive_v3 } from "googleapis";
import SubjectCard from "./SubjectCard";
import Header from "./files/Header";
import { useState } from "react";
import SearchBar from "./files/SearchBar";
import { filterFolders } from "@/lib/utils";

type Props = {
  folders: drive_v3.Schema$File[] ;
};

const YearOne = ({folders}:Props) => {
 
  const path = `notes/1`;
  const [searchQuery, setSearchQuery] = useState("");
  const filteredFolders = filterFolders(folders, searchQuery);
  return(
    <>
      <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-3xl mx-auto">
        <Header
          heading={"Select your Subject"}
          tag="subjects"
          total={folders.length}
        />
        <SearchBar placeholder="Search branch" searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <div className="flex flex-col gap-5">
          {filteredFolders.map((folder:any) => (
            <SubjectCard
              branch={"All Branches"}
              key={folder.id}
              folder={folder}
            />
          ))}
        </div>
      </div>
    </div>
    </>
  )
};

export default YearOne;
