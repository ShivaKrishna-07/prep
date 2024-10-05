"use client";

import { useEffect, useState } from "react";

const YearOne = () => {
  const [Folders, setFolders] = useState();

  const path = `notes/1`;
  console.log("Hello", Folders);

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const response = await fetch(
          "/api?folderPath=Resources/Notes/1st_year"
        );
        const data = await response.json();
        console.log("Api data:", data);

        setFolders(data);
      } catch (error) {
        console.error("Error fetching folders:", error);
      }
    };

    fetchFolders();
  }, []);

  return <div>YearOne</div>;
};

export default YearOne;
