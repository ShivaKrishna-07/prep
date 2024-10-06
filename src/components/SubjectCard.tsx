
import { slugify } from "@/lib/utils";
import { drive_v3 } from "googleapis";
import Link from "next/link";

type SubjectCardProps = {
  folder: drive_v3.Schema$File;
  branch:string;
};

const SubjectCard: React.FC<SubjectCardProps> = ({ folder, branch }) => {

  const slugifiedName = slugify(folder.name);

  const path = branch == 'all-branches' ? `${branch}/${slugifiedName}`: `${slugifiedName}`

  return (
    <Link href={{ pathname: path, query: { folderId: folder.id } }} className="flex w-1/2 m-auto flex-col space-y-4 p-4">
      <div
        className="bg-gray-200 cursor-pointer p-4 rounded shadow-md"
      >
        <h2 className="text-xl font-bold">{folder.name || "Untitled"}</h2>
      </div>
    </Link>
  );
};

export default SubjectCard;
