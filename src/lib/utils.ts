import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Pdf } from "@/components/files/ShowFiles";

interface Branch{
  title: string;
}
interface FolderProps{
  name: string;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const slugify = (text: string | null | undefined) => {

  if (!text) {
    return '';
  }

  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+/, '') // Trim hyphens from start
    .replace(/-+$/, ''); // Trim hyphens from end
};

export function unslugify(slug: string): string {
  return slug
    .split('-') // Split on hyphens
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
    .join(' '); // Join back with space
}

export const filterPdfs = (pdfs: any, searchQuery: string) => {
  const query = searchQuery.toLowerCase();
  return pdfs.filter((pdf: Pdf) => 
    pdf.name.toLowerCase().includes(query)
  );
};

export const filterBranches = (branches: any, searchQuery: string) => {
  const query = searchQuery.toLowerCase();
  return branches.filter((branch: Branch) => 
    branch.title.toLowerCase().includes(query)
  );
};

export const filterFolders = (folders: any, searchQuery: string) => {
  const query = searchQuery.toLowerCase();
  return folders.filter((folder: FolderProps) => 
    folder.name.toLowerCase().includes(query)
  );
}

export const removePdfExtension = (fileName: string) => {
  return fileName.endsWith(".pdf") ? fileName.slice(0, -4) : fileName;
}