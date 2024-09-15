
import ShowFiles from "@/components/ShowFiles";
import { getDriveFiles } from "@/lib/pages/api";

export default async function Page({ params }: { params: { branch: string } }) {

  const response = await getDriveFiles(`Syllabus/${params.branch}`)
  // console.log("From branch: ", response);
  

  return (
    <ShowFiles files={response} />
  );
}

