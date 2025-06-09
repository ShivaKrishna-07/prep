"use client";

import React, { useEffect, useState } from "react";
import { filterPdfs, unslugify } from "@/lib/utils";
import Header from "./Header";
import SearchBar from "./SearchBar";
import PdfCard from "./PdfCard";
import { useParams, usePathname } from "next/navigation";
import { drive_v3 } from "googleapis";
import { FaYoutube } from "react-icons/fa";
import Link from "next/link";
import { youtubeLinks } from "@/data/youtube";

type SchemaFile = drive_v3.Schema$File;

interface FilesPageProps {
  files: SchemaFile[];
}
interface ParamsProps {
  branch: string;
  notes: string;
  subject: string;
}

export interface Pdf {
  name: string;
  webViewLink: string;
}

const ShowFiles = ({ files }: FilesPageProps) => {
  const params = useParams() as {
    branch: string;
    subject: string;
    year: string;
  };
  const pathname = usePathname();
  const isNotesPage = pathname.startsWith("/notes");
  const [YtLink, setYtLink] = useState("");
  const [YtChannel, setYtChannel] = useState("");

  const { subject, branch, year } = params;
  useEffect(() => {
    const subjectData = youtubeLinks[year]?.[subject];

    const finalLink = subjectData?.link?.trim()
      ? subjectData.link
      : "https://www.youtube.com";
    const finalChannel = subjectData?.channel?.trim()
      ? subjectData.channel
      : "Youtube Learning";
    setYtLink(finalLink);
    setYtChannel(finalChannel);
  }, [pathname, subject, year]);

  let heading = `${branch.toUpperCase()} Syllabus`;
  if (isNotesPage) {
    heading = `${unslugify(subject)} Notes`;
  }

  const [searchQuery, setSearchQuery] = useState("");

  const filteredPdfs = filterPdfs(files, searchQuery);
  console.log("Result", subject);

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-3xl mx-auto">
        <Header heading={heading} tag="files" total={filteredPdfs.length} />

        {/* YouTube Recommendation Card */}
        {isNotesPage && (
          <div className="dark:bg-bg2 rounded-xl p-4 flex items-center justify-between mt-4 mb-6 shadow-custom border border-border">
            <div className="flex items-center space-x-3">
              <FaYoutube color="red" size={30} />
              <div>
                <p className="text-sm text-muted">Recommended Channel</p>
                <p className="text-base font-medium">
                  {YtChannel}
                </p>
              </div>
            </div>
            <Link
              href={YtLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
            >
              Watch
            </Link>
          </div>
        )}

        <SearchBar
          placeholder="Search files..."
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <div className="space-y-4">
          {filteredPdfs.map((pdf: Pdf, index: number) => (
            <PdfCard key={index} {...pdf} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowFiles;
