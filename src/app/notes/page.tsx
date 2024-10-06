import YearCard from "@/components/YearCard";
import React from "react";

const Notes = () => {
  return (
    <div className="h-screen w-full">
      <h1 className="text-center text-5xl text-white font-bold py-5">Select your <span className="text-purple-500">Year</span></h1>
      <div>
        <YearCard year="1" link="/notes/1st_year" />
        <YearCard year="2" link="/notes/2nd_year" />
        <YearCard year="3" link="/notes/3rd_year" />
        <YearCard year="4" link="/notes/4th_year" />
      </div>
    </div>
  );
};

export default Notes;
