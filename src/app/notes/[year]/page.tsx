"use client";

import BranchCard from "@/components/BranchCard";
import React from "react";

const page = ({ params }: { params: { year: string } }) => {

  return (
    <div className="min-h-screen w-full">
        <h1 className="text-center text-5xl font-bold py-5">Select your <span className="text-purple-500">Branch</span></h1>
      <div>
        <BranchCard branch="CSE" link={`/notes/${params.year}/cse`} />
        <BranchCard branch="IT" link={`/notes/${params.year}/it`} />
        <BranchCard branch="CSD" link={`/notes/${params.year}/csd`} />
        <BranchCard branch="CSC" link={`/notes/${params.year}/csc`} />
        <BranchCard branch="CSM" link={`/notes/${params.year}/csm`} />
        <BranchCard branch="ECE" link={`/notes/${params.year}/ece`} />
        <BranchCard branch="EEE" link={`/notes/${params.year}/eee`} />
      </div>
    </div>
  );
};

export default page;
