
import ShowFiles from "@/components/ShowFiles";
import { getFiles } from "@/app/api/gemini";

export default async function Page({ params }: { params: { branch: string } }) {

  const response = await getFiles(`Syllabus/${params.branch}`)
  // console.log("From branch: ", response);
  
  return (
    <ShowFiles files = {response} />
  );
}

