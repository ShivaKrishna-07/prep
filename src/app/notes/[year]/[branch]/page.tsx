import { getNotes } from '@/lib/pages/api'
import React from 'react'
import { NotesProps } from '../page'
import SubjectCard from '@/components/SubjectCard'

const page = async({ params }: NotesProps) => {
  const path = `Notes/${params.year}/${params.branch}`
  

  const folders = await getNotes(path);
  console.log(folders);
  

  return (
    <div>
      {folders.map((folder) => (
        <SubjectCard branch={params.branch} key={folder.id} folder={folder} />
      ))}
    </div>
  )
}

export default page