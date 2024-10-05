import { getFoldersInSyllabus } from "@/lib/pages/api";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const folderPath = req.query.folderPath as string;

  if (!folderPath) {
    return res.status(400).json({ error: "folderPath is required" });
  }

  const folders = await getFoldersInSyllabus(folderPath);
  return res.status(200).json(folders);
};
