"use client";

import React, { useState } from "react";
import { filterPdfs } from "@/lib/utils";
import Header from "./Header";
import SearchBar from "./SearchBar";
import PdfCard from "./PdfCard";
import { useParams } from "next/navigation";
import { drive_v3 } from "googleapis";

type SchemaFile = drive_v3.Schema$File;

interface FilesPageProps {
  files: SchemaFile[];
}

interface Pdf {
  name: string;
  webViewLink: string;
}

const ShowFiles = ({ files }: FilesPageProps) => {
  const params = useParams() as { branch: string }; // Assert that branch exists

  const branch = params.branch;

  const [searchQuery, setSearchQuery] = useState("");

  const filteredPdfs = filterPdfs(files, searchQuery);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-3xl mx-auto">
        <Header branch={branch} totalFiles={files.length} />
        <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        <div className="space-y-4">
          {filteredPdfs.map((pdf:Pdf, index:number) => (
            <PdfCard key={index} {...pdf} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowFiles;
