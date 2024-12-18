import { google, drive_v3 } from "googleapis";
const googleCloudCredentials = process.env.GOOGLE_CLOUD_CREDENTIALS;
const credentials = JSON.parse(googleCloudCredentials); // Parse the JSON string

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: credentials.client_email,
    private_key: credentials.private_key,
  },
  scopes: ["https://www.googleapis.com/auth/drive.readonly"],
});

const drive: drive_v3.Drive = google.drive({ version: "v3", auth });


const ROOT_FOLDER_ID = "1nclsgRlzsq9-XfNxzDPz_hfmDxs29HbA";

// Function to get the files in a folder by path
export const getDriveFiles = async (folderPath: string): Promise<drive_v3.Schema$File[]> => {
  try {
    const folderId = await getFolderIdByPath(folderPath);

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

// Function to get notes in a specific folder by path (similar to getDriveFiles)
export const getNotes = async (folderPath: string): Promise<drive_v3.Schema$File[]> => {
  return getDriveFolders(folderPath);
};

export const getDriveFolders = async (folderPath: string): Promise<drive_v3.Schema$File[]> => {
  try {
    const folderId = await getFolderIdByPath(folderPath);

    if (!folderId) {
      console.error(`No folder found for path: ${folderPath}`);
      return [];
    }

    const response = await drive.files.list({
      q: `'${folderId}' in parents and mimeType = 'application/vnd.google-apps.folder'`,
      fields: "files(id, name, mimeType, webViewLink)",
    });
    
    return response.data.files || [];
  } catch (error) {
    console.error("Error fetching folders from Google Drive:", error);
    return [];
  }
};

export const getNotesById = async (folderId: string) =>{
  try {
    if (!folderId) {
      console.error(`No folder found for path: ${folderId}`);
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
}

// Helper function to get folder ID by folder path
const getFolderIdByPath = async (folderPath: string): Promise<string | null> => {
  const folderNames = folderPath.split("/");
  let parentId = ROOT_FOLDER_ID;

  for (const folderName of folderNames) {
    const folderId = await getFolderIdByName(parentId, folderName);
    if (!folderId) {
      console.error(`Folder '${folderName}' not found`);
      return null;
    }
    parentId = folderId;
  }

  return parentId;
};

// Helper function to get folder ID by folder name
const getFolderIdByName = async (
  parentId: string,
  folderName: string
): Promise<string | null> => {
  try {
    const response = await drive.files.list({
      q: `'${parentId}' in parents and name='${folderName}' and mimeType='application/vnd.google-apps.folder'`,
      fields: "files(id, name)",
    });
    

    const folder = response.data.files?.[0];
    return folder ? folder.id || null : null;
  } catch (error) {
    console.error(`Error finding folder '${folderName}':`, error);
    return null;
  }
};
