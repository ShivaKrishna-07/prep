import React from 'react'

interface FilesPageProps {
    files: File[];
  }

const ShowFiles = ({ files }: FilesPageProps) => {
  return (
    <div>
      <h1>Syllabus</h1>
      <ul>
        {files.length > 0 ? (
          files.map((file) => (
            <li key={file.id}>
              <a className='text-white' href={file.webViewLink} target="_blank" rel="noopener noreferrer">
                {file.name}
              </a>
            </li>
          ))
        ) : (
          <p>No files found.</p>
        )}
      </ul>
    </div>
  )
}

export default ShowFiles