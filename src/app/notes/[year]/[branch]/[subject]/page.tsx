import { getNotesById } from '@/app/api/gemini';
import ShowFiles from '@/components/ShowFiles';
import React from 'react'

type PageProps = {
    searchParams: {
      folderId?: string;
    };
  };

const page = async({ searchParams }: PageProps) => {

    const folderId = searchParams.folderId;

    const files = await getNotesById(folderId);
    

  return (
    <div className='text-white' >
        <ShowFiles files={files} />
    </div>
  )
}


export default page