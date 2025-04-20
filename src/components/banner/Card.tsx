import Link from "next/link";
import React, { ReactNode } from "react";
import { HiChartBar } from "react-icons/hi";
import { HiClipboard } from "react-icons/hi";
import { HiDocumentDuplicate } from "react-icons/hi";
import { HiBookmark } from "react-icons/hi";

interface Resources {
  title: string;
  link: string;
}

const icons = {
  Notes: HiBookmark,
  Syllabus: HiClipboard,
  Results: HiChartBar,
  PYQs: HiDocumentDuplicate,
};
const Card = ({ title, link }: Resources) => {
  const IconComponent = icons[title as keyof typeof icons];

  return (
    <Link href={link}>
      <div className="h-32 md:h-48 flex flex-col justify-center items-center border border-border w-[350px] md:w-[400px] gap-2 shadow-custom text-foreground cursor-pointer rounded-xl p-8">
        <div className="">
          <IconComponent className="text-5xl rounded-lg " />
        </div>
        <h4 className="font-medium text-muted" >{title}</h4>
      </div>
    </Link>
  ); 
};

export default Card;
