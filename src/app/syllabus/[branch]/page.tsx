"use client";

import List from "@/components/List";
import { useFirebase } from "@/context/Firebase";
import { DocumentData } from "firebase/firestore";
import { useParams } from "next/navigation";
// import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function page() {
  const firebase = useFirebase();
  const params = useParams();
  const branch = Array.isArray(params.branch) ? params.branch[0] : params.branch;

  const [syllabusFiles, setSyllabusFiles] = useState<DocumentData[]>([]);

  useEffect(() => {
    const fetchSyllabusData = async () => {
      try {
        const doc = await firebase?.fetchSyllabus(branch);
        if (doc) {
          setSyllabusFiles(doc);
        } else {
          console.warn("No documents found");
        }
      } catch (error) {
        console.error("Error fetching syllabus:", error);
      }
    };

    fetchSyllabusData();
  }, [firebase]);

  return (
    <div>
      {syllabusFiles.length > 0 ? (
        <ul>
          {syllabusFiles.map((file, index) => (
            <List key={file.pdfURL} file={file} />
          ))}
        </ul>
      ) : (
        <p>No syllabus files available.</p>
      )}
    </div>
  );
}
