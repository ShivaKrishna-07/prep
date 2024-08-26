import React, { ReactNode } from 'react'
import { HiChartBar } from "react-icons/hi";
import { HiClipboard } from "react-icons/hi";
import { HiDocumentDuplicate } from "react-icons/hi";
import { HiBookmark } from "react-icons/hi";

interface Resources{
    title:string;
}

const icons = {
    Notes: HiBookmark,
    Syllabus: HiClipboard,
    Results: HiChartBar,
    PYQs: HiDocumentDuplicate
}
const Card = ({title}: Resources) => {

    const IconComponent = icons[title as keyof typeof icons];


  return (
    <div className='h-[200px] flex flex-col justify-center items-center border border-gray-900 w-[400px] gap-2 text-white cursor-pointer hover:bg-zinc-800 rounded-xl p-8'>
        <div className=''>
        <IconComponent className='text-white text-5xl bg-purple-500 rounded-lg p-2' />
        </div>
        <h4 className=''>
            {title}
        </h4>
    </div>
  )
}

export default Card