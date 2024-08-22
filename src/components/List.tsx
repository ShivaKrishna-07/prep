"use client";

import { DocumentData } from "firebase/firestore";
import { useFirebase } from "@/context/Firebase";
import { useEffect, useState } from "react";

interface ListProps {
  file: DocumentData;
}

const List: React.FC<ListProps> = ({ file }) => {
  const firebase = useFirebase();
  const [pdfURL, setPdfURL] = useState<string>("");

  useEffect(() => {
    const fetchPdfURL = async () => {
      try {
        if (firebase && file.pdfURL) {
          const url = await firebase.getPdfURL(file.pdfURL);
          setPdfURL(url);
        }
      } catch (error) {
        console.error("Error fetching PDF URL:", error);
      }
    };

    fetchPdfURL();
  }, [file, firebase]);

  return (
    <li>
      <a href={pdfURL} target="_blank" rel="noopener noreferrer">
        {`Syllabus for ${file.branch} - ${file.pdfURL}`}
      </a>
    </li>
  );
};

export default List;
