import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Pdf } from "@/components/files/ShowFiles";

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

export const filterPdfs = (pdfs: any, searchQuery: string) => {
  const query = searchQuery.toLowerCase();
  return pdfs.filter((pdf: Pdf) => 
    pdf.name.toLowerCase().includes(query)
  );
};