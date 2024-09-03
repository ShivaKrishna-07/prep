import BranchCard from "@/components/BranchCard";
import React from "react";

export default function page({ params }: { params: { year: string } }) {
  return (
    <div className="mt-10 m-auto ">
      <div>
        <BranchCard branch="CSE" link={`/syllabus/cse`} />
        <BranchCard branch="IT" link={`/syllabus/it`} />
        <BranchCard branch="CSD" link={`/syllabus/csd`} />
        <BranchCard branch="CSC" link={`/syllabus/csc`} />
        <BranchCard branch="CSM" link={`/syllabus/csm`} />
        <BranchCard branch="ECE" link={`/syllabus/ece`} />
        <BranchCard branch="EEE" link={`/syllabus/eee`} />
        <BranchCard branch="CIVIL" link={`/syllabus/civil`} />
        <BranchCard branch="Mechanical" link={`/syllabus/mech`} />
      </div>
    </div>
  );
}
