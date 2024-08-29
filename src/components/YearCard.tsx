import Link from 'next/link';
import React from 'react'

interface Year{
    year: string;
    link: string;
}

const YearCard = ({year, link}: Year) => {
  return (
    <Link href={link}>
        <div className='flex justify-items-start items-center w-[450px] m-auto h-[100px] my-2 border  rounded-lg cursor-pointer hover:text-purple-500 '>
            <p className='pl-4 text-[1.3rem]' >{year}st Year</p>
        </div>
    </Link>
  )
}

export default YearCard