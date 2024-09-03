"use client"

import React, { useState, useEffect } from 'react';

interface File {
  id: string;
  name: string;
  mimeType: string;
}

interface GoogleDriveFetcherProps {
  folderPath: string;
}

const GoogleDriveFetcher: React.FC<GoogleDriveFetcherProps> = ({ folderPath }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/fetchGoogleDriveFiles', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ folderPath }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch files');
        }

        const data: { files: File[] } = await response.json();
        setFiles(data.files);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [folderPath]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Files in {folderPath}</h2>
      <ul>
        {files.map((file) => (
          <li key={file.id}>{file.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default GoogleDriveFetcher;