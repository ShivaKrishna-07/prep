
import ShowFiles from "@/components/files/ShowFiles";
import { getFiles } from "@/app/api/drive";

export default async function Page({ params }: { params: { branch: string } }) {

  const response = await getFiles(`Syllabus/${params.branch}`)
  
  return (
    <ShowFiles files = {response} />
  );
}