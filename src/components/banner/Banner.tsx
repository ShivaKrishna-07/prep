import React from "react";
import Card from "./Card";

const Banner = () => {
  return (
    <div id="learn" className="min-h-screen p-10 pt-24">
      <h1 className="text-white text-4xl text-center font-extrabold">
        Our Resources
      </h1>

      <div className="flex justify-center m-auto gap-4 w-[80%] flex-wrap py-8">
        <Card title="Notes" link="/notes" />
        <Card title="Syllabus" link="/syllabus" />
        <Card title="PYQs" link="/pyqs" />
        <Card title="Results" link="results" />
      </div>
    </div>
  );
};

export default Banner;
