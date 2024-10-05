import { getNotes } from '@/lib/pages/api'
import React from 'react'
import { NotesProps } from '../page'

const page = ({ params }: NotesProps) => {
  const path = `notes/${params.year}/${params.branch}`

  const response = getNotes(path)

  return (
    <div>
      notes
    </div>
  )
}

export default page