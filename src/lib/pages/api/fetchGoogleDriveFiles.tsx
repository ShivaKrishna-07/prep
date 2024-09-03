import { NextApiRequest, NextApiResponse } from 'next';
import { google, drive_v3 } from 'googleapis';

interface File {
  id: string;
  name: string;
  mimeType: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { folderPath } = req.body as { folderPath: string };

  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    });

    const drive = google.drive({ version: 'v3', auth });

    // Function to get folder ID from path
    const getFolderId = async (path: string): Promise<string> => {
      const parts = path.split('/');
      let parentId = 'root';

      for (const part of parts) {
        const response = await drive.files.list({
          q: `name='${part}' and mimeType='application/vnd.google-apps.folder' and '${parentId}' in parents`,
          fields: 'files(id, name)',
        });

        if (!response.data.files || response.data.files.length === 0) {
          throw new Error(`Folder not found: ${part}`);
        }

        parentId = response.data.files[0].id!;
      }

      return parentId;
    };

    const folderId = await getFolderId(folderPath);

    const response = await drive.files.list({
      q: `'${folderId}' in parents and mimeType!='application/vnd.google-apps.folder'`,
      fields: 'files(id, name, mimeType)',
    });

    const files: File[] = response.data.files as File[];
    res.status(200).json({ files });
  } catch (error) {
    console.error('Error fetching files:', error);
    res.status(500).json({ error: 'Failed to fetch files' });
  }
}