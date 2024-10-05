import { google } from "googleapis";
import credentials from "@/constants/exam-prep-ddcaf-2eeb94437b6c.json";

export const getDriveFiles = async (folderPath: string) => {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: credentials.client_email,
        private_key: credentials.private_key,
      },
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    });

    const drive = google.drive({ version: "v3", auth });

    const folderId = await getFolderIdByPath(drive, folderPath);

    if (!folderId) {
      console.error(`No folder found for path: ${folderPath}`);
      return [];
    }

    const response = await drive.files.list({
      q: `'${folderId}' in parents`,
      fields: "files(id, name, mimeType, webViewLink)",
    });

    return response.data.files || [];
  } catch (error) {
    console.error("Error fetching files from Google Drive:", error);
    return [];
  }
};

export const getNotes = async (folderPath: string) => {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: credentials.client_email,
        private_key: credentials.private_key,
      },
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    });

    const drive = google.drive({ version: "v3", auth });

    const folderId = await getFolderIdByPath(drive, folderPath);

    if (!folderId) {
      console.error(`No folder found for path: ${folderPath}`);
      return [];
    }

    const response = await drive.files.list({
      q: `'${folderId}' in parents`,
      fields: "files(id, name, mimeType, webViewLink)",
    });

    return response.data.files || [];
  } catch (error) {
    console.error("Error fetching files from Google Drive:", error);
    return [];
  }
};

const getFolderIdByPath = async (drive: any, folderPath: string) => {
  const folderNames = folderPath.split("/");
  let parentId = "1nclsgRlzsq9-XfNxzDPz_hfmDxs29HbA";

  for (const folderName of folderNames) {
    const folderId = await getFolderIdByName(drive, parentId, folderName);
    if (!folderId) {
      console.error(`Folder '${folderName}' not found`);
      return null;
    }
    parentId = folderId;
  }

  return parentId;
};

const getFolderIdByName = async (
  drive: any,
  parentId: string,
  folderName: string
) => {
  try {

    const response = await drive.files.list({
      q: `'${parentId}' in parents and name='${folderName}' and mimeType='application/vnd.google-apps.folder'`,
      fields: "files(id, name)",
    });

    const folder = response.data.files?.[0]; 

    return folder ? folder.id : null;
  } catch (error) {
    console.error(`Error finding folder '${folderName}':`, error);
    return null;
  }
};