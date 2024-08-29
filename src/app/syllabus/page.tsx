import BranchCard from '@/components/BranchCard'
import React from 'react'

export default function page({params}: {params: {year: string}}) {
  return (
    <div className='m-10'>
        <div>
        <BranchCard branch="CSE" link={`/syllabus/cse`} />
        <BranchCard branch="IT" link={`/syllabus/it`} />
        <BranchCard branch="CSD" link={`/syllabus/csd`} />
        <BranchCard branch="CSC" link={`/syllabus/csc`} />
        <BranchCard branch="CSM" link={`/syllabus/csm`} />
        <BranchCard branch="ECE" link={`/syllabus/ece`} />
        <BranchCard branch="EEE" link={`/syllabus/eee`} />
      </div>
    </div>
  )
}
