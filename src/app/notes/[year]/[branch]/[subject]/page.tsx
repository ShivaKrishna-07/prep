import { getFilesById } from "@/app/api/drive";
import ShowFiles from "@/components/files/ShowFiles";
import React from "react";

type PageProps = {
  searchParams: {
    folderId: string;
  };
};

const page = async ({ searchParams }: PageProps) => {
  const folderId = searchParams.folderId;
  const files = await getFilesById(folderId);

  return (
    <div className="text-white">
      <ShowFiles files={files} />
    </div>
  );
};

export default page;
