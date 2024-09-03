import { notFound } from "next/navigation";
import SyllabusPage from "@/components/SyllabusPage";
import { google } from "googleapis";

type DriveFile = {
  id: string;
  name: string;
  webViewLink: string;
};

interface SyllabusPageProps {
  branch: string;
  files: DriveFile[];
}

const folderIdMapping: { [key: string]: string } = {
  cse: '18jlnJH-22zt7bHKLzqkV9mC2qPkDjsHX',
  it: '1TqqtO6RVJsLBFtGmGgF6HKXehQemfIBn',
  csd: '1mc98Y2Rcppt_dmmc7vwVKUCGbjA',
  csm: '1e4YB9XnKulvDwgPg4K5do034o8YFXQ4I',
  csc: '14ibQn0iQJNgd4om9MlEcpTKTDSfTrXoR',
  ece: '1wXrTJqK_-TNkKLAdRVuGT-ToWpl6n8bw',
  eee: '1DEZpLtakv3agfPIzOw0crEJDXnpcYB1s',
  civil: '1fsQWR_jD7fT37iwAuMaZzayrmp_ZWkR3',
  mech: '16F0WytEbGqEDNDhw_bFMzefKh9pfzPeA',
};

// This will be used to generate static params for the page
export async function generateStaticParams() {
  return [
    { branch: 'cse' },
    { branch: 'csc' },
    { branch: 'csm' },
    { branch: 'csd' },
    { branch: 'ece' },
    { branch: 'eee' },
    { branch: 'civil' },
    { branch: 'mech' },
    { branch: 'it' },
  ];
}
//
export default async function Page({ params }: { params: { branch: string } }) {
  const branch = params.branch;
  const files = await getSyllabusFiles(branch);

  return (
    <SyllabusPage branch={branch} files={files} />
  );
}

async function getSyllabusFiles(branch: string): Promise<DriveFile[]> {
  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(process.env.GOOGLE_CLOUD_CREDENTIALS || '{}'),
    scopes: ['https://www.googleapis.com/auth/drive'],
  });

  const drive = google.drive({ version: 'v3', auth });

  const folderId = folderIdMapping[branch];

  const res = await drive.files.list({
    q: `'${folderId}' in parents`,
    fields: 'files(id, name, webViewLink)',
  });
  console.log(res);
  

  return res.data.files?.map(file => ({
    id: file.id || '',
    name: file.name || '',
    webViewLink: file.webViewLink || '',
  })) || [];
}
