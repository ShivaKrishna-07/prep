"use client";
import { drive_v3 } from "googleapis";
import SubjectCard from "./SubjectCard";

type Props = {
  folders: drive_v3.Schema$File[];
};

const YearOne = ({folders}:Props) => {

  const path = `notes/1`;

  return(
    <>
      {folders.map((folder) => (
        <SubjectCard branch="all-branches" key={folder.id} folder={folder} />
      ))}
    </>
  )
};

export default YearOne;
