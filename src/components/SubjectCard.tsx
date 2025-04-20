import { slugify } from "@/lib/utils";
import { drive_v3 } from "googleapis";
import { ChevronRight, Notebook, NotebookPenIcon, NotepadTextIcon } from "lucide-react";
import Link from "next/link";

export type SubjectCardProps = {
  folder: drive_v3.Schema$File;
  branch: string;
};

const SubjectCard: React.FC<SubjectCardProps> = ({ folder, branch }) => {
  const slugifiedName = slugify(folder.name);

  const path =
    branch == "all-branches"
      ? `${branch}/${slugifiedName}`
      : `${slugifiedName}`;

  return (
    <Link href={{ pathname: path, query: { folderId: folder.id } }}>
      <div className="shadow-custom dark:bg-bg2 rounded-lg p-6  transition-all duration-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-bg2 dark:bg-zinc-800 border border-border rounded-lg  transition-colors">
              <NotebookPenIcon className={`w-6 h-6`} />
            </div>
            <div>
              <h3 className="text-sm md:text-xl font-semibold sm:text-2xl text-foreground mb-1">
                {folder.name}
              </h3>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-muted transform group-hover:text-foreground group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </Link>
  );
};

export default SubjectCard;
